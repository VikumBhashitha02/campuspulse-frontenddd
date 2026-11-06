import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiGet, apiSend, setToken, getToken } from "./api/client";
import type { Role, OrganizationMembership, OrganizerVerificationStatus, DomainCheckResult } from "./types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  avatarUrl?: string | null;
  universityId?: string | null;
  universityEmailVerified?: boolean;
  organizerVerificationStatus?: OrganizerVerificationStatus;
  university?: {
    id: string;
    name: string;
    slug: string;
    code: string;
    logoUrl?: string | null;
  } | null;
  memberships?: OrganizationMembership[];
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, role?: Role | undefined) => Promise<AuthUser>;
  register: (input: { name: string; email: string; password: string; role?: Role | undefined; universityId?: string | undefined }) => Promise<AuthUser>;
  loginWithGoogle: (payload: { email: string; name?: string | undefined; googleId?: string | undefined; avatarUrl?: string | undefined }) => Promise<AuthUser>;
  requestOrganizerVerification: (input: { name: string; email: string; password: string; universityId?: string | undefined }) => Promise<{ success: boolean; message: string; email: string; university?: any }>;
  verifyOrganizerEmail: (input: { email: string; code: string; name?: string | undefined; password?: string | undefined; universityId?: string | undefined }) => Promise<AuthUser>;
  resendOrganizerVerification: (email: string) => Promise<{ success: boolean; message: string; cooldownSeconds?: number }>;
  checkDomain: (email: string) => Promise<DomainCheckResult>;
  logout: () => void;
  setRole: (role: Role) => void;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthState | null>(null);
const USER_KEY = "campuspulse.user";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

function mapBackendUser(u: {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  roles?: string[];
  universityId?: string | null;
  universityEmailVerified?: boolean;
  organizerVerificationStatus?: OrganizerVerificationStatus;
  university?: {
    id: string;
    name: string;
    slug: string;
    code: string;
    logoUrl?: string | null;
  } | null;
  memberships?: OrganizationMembership[];
  organizationMembers?: any[];
}): AuthUser {
  const roles = u.roles || [];
  let role: Role = "STUDENT";
  if (roles.includes("ADMIN") || roles.includes("SUPER_ADMIN")) role = "ADMIN";
  else if (roles.includes("ORGANIZER")) role = "ORGANIZER";

  const memberships: OrganizationMembership[] = (u.memberships || []).map((m: any) => ({
    id: m.id,
    organizationId: m.organizationId,
    organizationName: m.organizationName || m.organization?.name || "",
    organizationSlug: m.organizationSlug || m.organization?.slug || "",
    role: m.role,
    title: m.title ?? null,
    logoUrl: (m.logoUrl || m.organization?.logoUrl) ?? null,
    isVerified: (m.isVerified || m.organization?.isVerified) ?? false,
  }));

  if (memberships.length === 0 && Array.isArray(u.organizationMembers)) {
    for (const om of u.organizationMembers) {
      memberships.push({
        id: om.id,
        organizationId: om.organizationId,
        organizationName: om.organization?.name || "",
        organizationSlug: om.organization?.slug || "",
        role: om.role,
        title: om.title ?? null,
        logoUrl: om.organization?.logoUrl ?? null,
        isVerified: om.organization?.isVerified ?? false,
      });
    }
  }

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role,
    avatarUrl: u.avatarUrl ?? null,
    initials: initials(u.name || "User"),
    universityId: u.universityId ?? null,
    universityEmailVerified: u.universityEmailVerified ?? (role === "ORGANIZER" || role === "ADMIN"),
    organizerVerificationStatus: u.organizerVerificationStatus ?? (role === "ORGANIZER" ? "VERIFIED" : "NOT_REQUIRED"),
    university: u.university ?? null,
    memberships,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next) window.localStorage.setItem(USER_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(USER_KEY);
  }, []);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    const token = getToken();
    if (!token) {
      persist(null);
      return null;
    }

    try {
      const me = await apiGet<{
        id: string;
        email: string;
        name: string;
        avatarUrl?: string | null;
        roles: string[];
        universityId?: string | null;
        universityEmailVerified?: boolean;
        organizerVerificationStatus?: OrganizerVerificationStatus;
        university?: {
          id: string;
          name: string;
          slug: string;
          code: string;
          logoUrl?: string | null;
        } | null;
      }>("/auth/me");
      const mapped = mapBackendUser(me);
      persist(mapped);
      return mapped;
    } catch {
      setToken(null);
      persist(null);
      return null;
    }
  }, [persist]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) {
        setUser(JSON.parse(raw) as AuthUser);
      }
    } catch {
      /* ignore storage parse failure */
    }

    // If token exists, sync latest profile & permissions from backend
    if (getToken()) {
      void refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    const handleUnauthorized = () => {
      persist(null);
      queryClient.clear();
    };
    window.addEventListener("campuspulse:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("campuspulse:unauthorized", handleUnauthorized);
    };
  }, [persist, refreshUser, queryClient]);

  const login = useCallback<AuthState["login"]>(
    async (email, password) => {
      const res = await apiSend<{
        accessToken: string;
        user: {
          id: string;
          email: string;
          name: string;
          avatarUrl?: string | null;
          roles: string[];
          universityId?: string | null;
          universityEmailVerified?: boolean;
          organizerVerificationStatus?: OrganizerVerificationStatus;
        };
      }>("POST", "/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      queryClient.clear();
      setToken(res.accessToken);
      try {
        const fullUser = await refreshUser();
        if (fullUser) return fullUser;
      } catch {
        /* fallback to login payload */
      }
      const mapped = mapBackendUser(res.user);
      persist(mapped);
      return mapped;
    },
    [persist, refreshUser, queryClient],
  );

  const register = useCallback<AuthState["register"]>(
    async ({ name, email, password, universityId }) => {
      const res = await apiSend<{
        accessToken: string;
        user: {
          id: string;
          email: string;
          name: string;
          avatarUrl?: string | null;
          roles: string[];
          universityId?: string | null;
          universityEmailVerified?: boolean;
          organizerVerificationStatus?: OrganizerVerificationStatus;
        };
      }>("POST", "/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: "STUDENT",
        universityId,
      });

      queryClient.clear();
      setToken(res.accessToken);
      try {
        const fullUser = await refreshUser();
        if (fullUser) return fullUser;
      } catch {
        /* fallback to register payload */
      }
      const mapped = mapBackendUser(res.user);
      persist(mapped);
      return mapped;
    },
    [persist, refreshUser, queryClient],
  );

  const loginWithGoogle = useCallback<AuthState["loginWithGoogle"]>(
    async (payload) => {
      const res = await apiSend<{
        accessToken: string;
        user: {
          id: string;
          email: string;
          name: string;
          avatarUrl?: string | null;
          roles: string[];
          universityId?: string | null;
          universityEmailVerified?: boolean;
          organizerVerificationStatus?: OrganizerVerificationStatus;
        };
      }>("POST", "/auth/google", payload);

      queryClient.clear();
      setToken(res.accessToken);
      try {
        const fullUser = await refreshUser();
        if (fullUser) return fullUser;
      } catch {
        /* fallback */
      }
      const mapped = mapBackendUser(res.user);
      persist(mapped);
      return mapped;
    },
    [persist, refreshUser, queryClient],
  );

  const requestOrganizerVerification = useCallback<AuthState["requestOrganizerVerification"]>(
    async ({ name, email, password, universityId }) => {
      return apiSend<{ success: boolean; message: string; email: string; university?: any }>(
        "POST",
        "/auth/organizer/request-verification",
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          universityId,
        },
      );
    },
    [],
  );

  const verifyOrganizerEmail = useCallback<AuthState["verifyOrganizerEmail"]>(
    async ({ email, code, name, password, universityId }) => {
      const res = await apiSend<{
        accessToken: string;
        user: {
          id: string;
          email: string;
          name: string;
          avatarUrl?: string | null;
          roles: string[];
          universityId?: string | null;
          universityEmailVerified?: boolean;
          organizerVerificationStatus?: OrganizerVerificationStatus;
        };
      }>("POST", "/auth/organizer/verify-email", {
        email: email.trim().toLowerCase(),
        code: code.trim(),
        name: name?.trim(),
        password,
        universityId,
      });

      queryClient.clear();
      setToken(res.accessToken);
      try {
        const fullUser = await refreshUser();
        if (fullUser) return fullUser;
      } catch {
        /* fallback */
      }
      const mapped = mapBackendUser(res.user);
      persist(mapped);
      return mapped;
    },
    [persist, refreshUser, queryClient],
  );

  const resendOrganizerVerification = useCallback<AuthState["resendOrganizerVerification"]>(
    async (email) => {
      return apiSend<{ success: boolean; message: string; cooldownSeconds?: number }>(
        "POST",
        "/auth/organizer/resend-verification",
        {
          email: email.trim().toLowerCase(),
        },
      );
    },
    [],
  );

  const checkDomain = useCallback<AuthState["checkDomain"]>(async (email) => {
    return apiSend<DomainCheckResult>("POST", "/auth/check-domain", {
      email: email.trim().toLowerCase(),
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    persist(null);
    queryClient.clear();
  }, [persist, queryClient]);

  const setRole = useCallback(
    (role: Role) => {
      if (!user) return;
      persist({ ...user, role });
    },
    [user, persist],
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      loginWithGoogle,
      requestOrganizerVerification,
      verifyOrganizerEmail,
      resendOrganizerVerification,
      checkDomain,
      logout,
      setRole,
      refreshUser,
    }),
    [
      user,
      loading,
      login,
      register,
      loginWithGoogle,
      requestOrganizerVerification,
      verifyOrganizerEmail,
      resendOrganizerVerification,
      checkDomain,
      logout,
      setRole,
      refreshUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

