import { i as __toESM } from "../_runtime.mjs";
import { a as getToken, c as setToken, n as apiSend, t as apiGet } from "./client-DCT7i2UG.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BjpYPorg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
var USER_KEY = "campuspulse.user";
var initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
function mapBackendUser(u) {
	const roles = u.roles || [];
	let role = "STUDENT";
	if (roles.includes("ADMIN") || roles.includes("SUPER_ADMIN")) role = "ADMIN";
	else if (roles.includes("ORGANIZER")) role = "ORGANIZER";
	const memberships = (u.memberships || []).map((m) => ({
		id: m.id,
		organizationId: m.organizationId,
		organizationName: m.organizationName || m.organization?.name || "",
		organizationSlug: m.organizationSlug || m.organization?.slug || "",
		role: m.role,
		title: m.title ?? null,
		logoUrl: (m.logoUrl || m.organization?.logoUrl) ?? null,
		isVerified: (m.isVerified || m.organization?.isVerified) ?? false
	}));
	if (memberships.length === 0 && Array.isArray(u.organizationMembers)) for (const om of u.organizationMembers) memberships.push({
		id: om.id,
		organizationId: om.organizationId,
		organizationName: om.organization?.name || "",
		organizationSlug: om.organization?.slug || "",
		role: om.role,
		title: om.title ?? null,
		logoUrl: om.organization?.logoUrl ?? null,
		isVerified: om.organization?.isVerified ?? false
	});
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
		memberships
	};
}
function AuthProvider({ children }) {
	const queryClient = useQueryClient();
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const persist = (0, import_react.useCallback)((next) => {
		setUser(next);
		if (typeof window === "undefined") return;
		if (next) window.localStorage.setItem(USER_KEY, JSON.stringify(next));
		else window.localStorage.removeItem(USER_KEY);
	}, []);
	const refreshUser = (0, import_react.useCallback)(async () => {
		if (!getToken()) {
			persist(null);
			return null;
		}
		try {
			const mapped = mapBackendUser(await apiGet("/auth/me"));
			persist(mapped);
			return mapped;
		} catch {
			setToken(null);
			persist(null);
			return null;
		}
	}, [persist]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(USER_KEY);
			if (raw) setUser(JSON.parse(raw));
		} catch {}
		if (getToken()) refreshUser().finally(() => setLoading(false));
		else setLoading(false);
		const handleUnauthorized = () => {
			persist(null);
			queryClient.clear();
		};
		window.addEventListener("campuspulse:unauthorized", handleUnauthorized);
		return () => {
			window.removeEventListener("campuspulse:unauthorized", handleUnauthorized);
		};
	}, [
		persist,
		refreshUser,
		queryClient
	]);
	const login = (0, import_react.useCallback)(async (email, password) => {
		const res = await apiSend("POST", "/auth/login", {
			email: email.trim().toLowerCase(),
			password
		});
		queryClient.clear();
		setToken(res.accessToken);
		try {
			const fullUser = await refreshUser();
			if (fullUser) return fullUser;
		} catch {}
		const mapped = mapBackendUser(res.user);
		persist(mapped);
		return mapped;
	}, [
		persist,
		refreshUser,
		queryClient
	]);
	const register = (0, import_react.useCallback)(async ({ name, email, password, universityId }) => {
		const res = await apiSend("POST", "/auth/register", {
			name: name.trim(),
			email: email.trim().toLowerCase(),
			password,
			role: "STUDENT",
			universityId
		});
		queryClient.clear();
		setToken(res.accessToken);
		try {
			const fullUser = await refreshUser();
			if (fullUser) return fullUser;
		} catch {}
		const mapped = mapBackendUser(res.user);
		persist(mapped);
		return mapped;
	}, [
		persist,
		refreshUser,
		queryClient
	]);
	const loginWithGoogle = (0, import_react.useCallback)(async (payload) => {
		const res = await apiSend("POST", "/auth/google", payload);
		queryClient.clear();
		setToken(res.accessToken);
		try {
			const fullUser = await refreshUser();
			if (fullUser) return fullUser;
		} catch {}
		const mapped = mapBackendUser(res.user);
		persist(mapped);
		return mapped;
	}, [
		persist,
		refreshUser,
		queryClient
	]);
	const requestOrganizerVerification = (0, import_react.useCallback)(async ({ name, email, password, universityId }) => {
		return apiSend("POST", "/auth/organizer/request-verification", {
			name: name.trim(),
			email: email.trim().toLowerCase(),
			password,
			universityId
		});
	}, []);
	const verifyOrganizerEmail = (0, import_react.useCallback)(async ({ email, code, name, password, universityId }) => {
		const res = await apiSend("POST", "/auth/organizer/verify-email", {
			email: email.trim().toLowerCase(),
			code: code.trim(),
			name: name?.trim(),
			password,
			universityId
		});
		queryClient.clear();
		setToken(res.accessToken);
		try {
			const fullUser = await refreshUser();
			if (fullUser) return fullUser;
		} catch {}
		const mapped = mapBackendUser(res.user);
		persist(mapped);
		return mapped;
	}, [
		persist,
		refreshUser,
		queryClient
	]);
	const resendOrganizerVerification = (0, import_react.useCallback)(async (email) => {
		return apiSend("POST", "/auth/organizer/resend-verification", { email: email.trim().toLowerCase() });
	}, []);
	const checkDomain = (0, import_react.useCallback)(async (email) => {
		return apiSend("POST", "/auth/check-domain", { email: email.trim().toLowerCase() });
	}, []);
	const logout = (0, import_react.useCallback)(() => {
		setToken(null);
		persist(null);
		queryClient.clear();
	}, [persist, queryClient]);
	const setRole = (0, import_react.useCallback)((role) => {
		if (!user) return;
		persist({
			...user,
			role
		});
	}, [user, persist]);
	const value = (0, import_react.useMemo)(() => ({
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
		refreshUser
	}), [
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
		refreshUser
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
