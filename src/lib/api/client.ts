/**
 * CampusPulse API client.
 *
 * All network access goes through this module. Service modules under
 * `src/lib/api/*.ts` call `apiGet`/`apiSend`, unwrap the backend response
 * envelope, and fall back to the mock adapter when no API is reachable.
 */

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env["VITE_API_URL"] as string | undefined) : undefined) ??
  (typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env["NEXT_PUBLIC_API_URL"] as string | undefined) : undefined) ??
  "http://localhost:4000/api/v1";

export const API_ENABLED = true;

const TOKEN_KEY = "campuspulse.token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  details?: Record<string, string[]> | undefined;

  constructor(message: string, status: number, details?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/** Backend response envelope: { success, data, message, errors }. */
interface Envelope<T> {
  success?: boolean;
  data?: T;
  message?: string | string[];
  error?: string;
  errors?: Record<string, string[]>;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
    });
  } catch (netErr) {
    throw new ApiError(
      `Unable to connect to the backend server at ${API_BASE_URL}. Please verify it is running.`,
      0,
    );
  }

  const payload = (await res.json().catch(() => null)) as Envelope<T> | T | null;

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    let details: Record<string, string[]> | undefined = undefined;

    if (payload && typeof payload === "object") {
      const p = payload as Envelope<T>;
      if (p.errors?.["validation"] && Array.isArray(p.errors["validation"])) {
        message = p.errors["validation"].join("; ");
        details = p.errors;
      } else if (Array.isArray(p.message)) {
        message = p.message.join("; ");
      } else if (p.message) {
        message = String(p.message);
      }
    }

    if (res.status === 401) {
      setToken(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("campuspulse:unauthorized"));
      }
    }

    throw new ApiError(message, res.status, details);
  }

  if (payload && typeof payload === "object" && "data" in payload && (payload as Envelope<T>).data !== undefined) {
    return (payload as Envelope<T>).data as T;
  }
  return payload as T;
}

export const apiGet = <T>(path: string) => request<T>(path);

export const apiSend = <T>(
  method: "POST" | "PATCH" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
) =>
  request<T>(path, body === undefined ? { method } : { method, body: JSON.stringify(body) });

export async function apiUpload<T = { url: string; filename: string }>(
  path: string,
  file: File,
  fieldName = "file",
): Promise<T> {
  const token = getToken();
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const formData = new FormData();
  formData.append(fieldName, file);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (netErr) {
    throw new ApiError(
      `Unable to connect to the backend server at ${API_BASE_URL}. Please verify it is running.`,
      0,
    );
  }

  const payload = (await res.json().catch(() => null)) as Envelope<T> | T | null;

  if (!res.ok) {
    let message = `Upload failed (${res.status})`;
    let details: Record<string, string[]> | undefined = undefined;

    if (payload && typeof payload === "object") {
      const p = payload as Envelope<T>;
      if (p.errors?.["validation"] && Array.isArray(p.errors["validation"])) {
        message = p.errors["validation"].join("; ");
        details = p.errors;
      } else if (Array.isArray(p.message)) {
        message = p.message.join("; ");
      } else if (p.message) {
        message = String(p.message);
      }
    }

    if (res.status === 401) {
      setToken(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("campuspulse:unauthorized"));
      }
    }

    throw new ApiError(message, res.status, details);
  }

  if (payload && typeof payload === "object" && "data" in payload && (payload as Envelope<T>).data !== undefined) {
    return (payload as Envelope<T>).data as T;
  }
  return payload as T;
}

export function resolveMediaUrl(url?: string | null): string | undefined {
  if (!url || typeof url !== "string") return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const baseOrigin = API_BASE_URL.replace(/\/api\/v1\/?$/, "").replace(/\/api\/?$/, "");
  return `${baseOrigin}${cleanPath}`;
}

/** Simulates network latency for the mock adapter so loading states are real when offline. */
export function mock<T>(value: T, ms = 320): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms));
}

export async function downloadFile(path: string, fallbackFilename = "download"): Promise<string> {
  const token = getToken();
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (netErr) {
    throw new ApiError(
      `Unable to connect to the backend server at ${API_BASE_URL}. Please verify it is running.`,
      0,
    );
  }

  if (!res.ok) {
    const errorPayload = await res.json().catch(() => null);
    let message = `Export failed (${res.status})`;
    if (errorPayload && typeof errorPayload === "object") {
      if (errorPayload.message) message = String(errorPayload.message);
    }
    if (res.status === 401) {
      setToken(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("campuspulse:unauthorized"));
      }
    }
    throw new ApiError(message, res.status);
  }

  let filename = fallbackFilename;
  const disposition = res.headers.get("content-disposition");
  if (disposition) {
    const match = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?/i.exec(disposition);
    if (match && match[1]) {
      filename = decodeURIComponent(match[1].trim());
    }
  }

  const blob = await res.blob();
  if (typeof window !== "undefined") {
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  }

  return filename;
}

