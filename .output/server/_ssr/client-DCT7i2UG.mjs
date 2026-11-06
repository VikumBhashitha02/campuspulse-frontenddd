//#region node_modules/.nitro/vite/services/ssr/assets/client-DCT7i2UG.js
/**
* CampusPulse API client.
*
* All network access goes through this module. Service modules under
* `src/lib/api/*.ts` call `apiGet`/`apiSend`, unwrap the backend response
* envelope, and fall back to the mock adapter when no API is reachable.
*/
var API_BASE_URL = (typeof import.meta !== "undefined" && {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"NEXT_PUBLIC_API_URL": "http://localhost:4000/api/v1",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:4000/api/v1",
	"VITE_FIREBASE_API_KEY": "AIzaSyDrNpKQELqaGqn3id0-tCnuUW4AD4XE9Ew",
	"VITE_FIREBASE_APP_ID": "1:145960477642:web:7a9a4856d8643da0fbe533",
	"VITE_FIREBASE_AUTH_DOMAIN": "campuspulse-738eb.firebaseapp.com",
	"VITE_FIREBASE_MEASUREMENT_ID": "G-S2G4Y0BYC1",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "145960477642",
	"VITE_FIREBASE_PROJECT_ID": "campuspulse-738eb",
	"VITE_FIREBASE_STORAGE_BUCKET": "campuspulse-738eb.firebasestorage.app"
} ? {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"NEXT_PUBLIC_API_URL": "http://localhost:4000/api/v1",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:4000/api/v1",
	"VITE_FIREBASE_API_KEY": "AIzaSyDrNpKQELqaGqn3id0-tCnuUW4AD4XE9Ew",
	"VITE_FIREBASE_APP_ID": "1:145960477642:web:7a9a4856d8643da0fbe533",
	"VITE_FIREBASE_AUTH_DOMAIN": "campuspulse-738eb.firebaseapp.com",
	"VITE_FIREBASE_MEASUREMENT_ID": "G-S2G4Y0BYC1",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "145960477642",
	"VITE_FIREBASE_PROJECT_ID": "campuspulse-738eb",
	"VITE_FIREBASE_STORAGE_BUCKET": "campuspulse-738eb.firebasestorage.app"
}["VITE_API_URL"] : void 0) ?? (typeof import.meta !== "undefined" && {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"NEXT_PUBLIC_API_URL": "http://localhost:4000/api/v1",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:4000/api/v1",
	"VITE_FIREBASE_API_KEY": "AIzaSyDrNpKQELqaGqn3id0-tCnuUW4AD4XE9Ew",
	"VITE_FIREBASE_APP_ID": "1:145960477642:web:7a9a4856d8643da0fbe533",
	"VITE_FIREBASE_AUTH_DOMAIN": "campuspulse-738eb.firebaseapp.com",
	"VITE_FIREBASE_MEASUREMENT_ID": "G-S2G4Y0BYC1",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "145960477642",
	"VITE_FIREBASE_PROJECT_ID": "campuspulse-738eb",
	"VITE_FIREBASE_STORAGE_BUCKET": "campuspulse-738eb.firebasestorage.app"
} ? {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"NEXT_PUBLIC_API_URL": "http://localhost:4000/api/v1",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:4000/api/v1",
	"VITE_FIREBASE_API_KEY": "AIzaSyDrNpKQELqaGqn3id0-tCnuUW4AD4XE9Ew",
	"VITE_FIREBASE_APP_ID": "1:145960477642:web:7a9a4856d8643da0fbe533",
	"VITE_FIREBASE_AUTH_DOMAIN": "campuspulse-738eb.firebaseapp.com",
	"VITE_FIREBASE_MEASUREMENT_ID": "G-S2G4Y0BYC1",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "145960477642",
	"VITE_FIREBASE_PROJECT_ID": "campuspulse-738eb",
	"VITE_FIREBASE_STORAGE_BUCKET": "campuspulse-738eb.firebasestorage.app"
}["NEXT_PUBLIC_API_URL"] : void 0) ?? "http://localhost:4000/api/v1";
var TOKEN_KEY = "campuspulse.token";
function getToken() {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
	if (typeof window === "undefined") return;
	if (token) window.localStorage.setItem(TOKEN_KEY, token);
	else window.localStorage.removeItem(TOKEN_KEY);
}
var ApiError = class extends Error {
	status;
	details;
	constructor(message, status, details) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.details = details;
	}
};
async function request(path, init) {
	const token = getToken();
	const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
	let res;
	try {
		res = await fetch(url, {
			...init,
			headers: {
				"Content-Type": "application/json",
				...token ? { Authorization: `Bearer ${token}` } : {},
				...init?.headers ?? {}
			}
		});
	} catch (netErr) {
		throw new ApiError(`Unable to connect to the backend server at ${API_BASE_URL}. Please verify it is running.`, 0);
	}
	const payload = await res.json().catch(() => null);
	if (!res.ok) {
		let message = `Request failed (${res.status})`;
		let details = void 0;
		if (payload && typeof payload === "object") {
			const p = payload;
			if (p.errors?.["validation"] && Array.isArray(p.errors["validation"])) {
				message = p.errors["validation"].join("; ");
				details = p.errors;
			} else if (Array.isArray(p.message)) message = p.message.join("; ");
			else if (p.message) message = String(p.message);
		}
		if (res.status === 401) {
			setToken(null);
			if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("campuspulse:unauthorized"));
		}
		throw new ApiError(message, res.status, details);
	}
	if (payload && typeof payload === "object" && "data" in payload && payload.data !== void 0) return payload.data;
	return payload;
}
var apiGet = (path) => request(path);
var apiSend = (method, path, body) => request(path, body === void 0 ? { method } : {
	method,
	body: JSON.stringify(body)
});
async function apiUpload(path, file, fieldName = "file") {
	const token = getToken();
	const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
	const formData = new FormData();
	formData.append(fieldName, file);
	let res;
	try {
		res = await fetch(url, {
			method: "POST",
			body: formData,
			headers: { ...token ? { Authorization: `Bearer ${token}` } : {} }
		});
	} catch (netErr) {
		throw new ApiError(`Unable to connect to the backend server at ${API_BASE_URL}. Please verify it is running.`, 0);
	}
	const payload = await res.json().catch(() => null);
	if (!res.ok) {
		let message = `Upload failed (${res.status})`;
		let details = void 0;
		if (payload && typeof payload === "object") {
			const p = payload;
			if (p.errors?.["validation"] && Array.isArray(p.errors["validation"])) {
				message = p.errors["validation"].join("; ");
				details = p.errors;
			} else if (Array.isArray(p.message)) message = p.message.join("; ");
			else if (p.message) message = String(p.message);
		}
		if (res.status === 401) {
			setToken(null);
			if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("campuspulse:unauthorized"));
		}
		throw new ApiError(message, res.status, details);
	}
	if (payload && typeof payload === "object" && "data" in payload && payload.data !== void 0) return payload.data;
	return payload;
}
function resolveMediaUrl(url) {
	if (!url || typeof url !== "string") return void 0;
	const trimmed = url.trim();
	if (!trimmed) return void 0;
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return trimmed;
	const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
	return `${API_BASE_URL.replace(/\/api\/v1\/?$/, "").replace(/\/api\/?$/, "")}${cleanPath}`;
}
/** Simulates network latency for the mock adapter so loading states are real when offline. */
function mock(value, ms = 320) {
	return new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms));
}
async function downloadFile(path, fallbackFilename = "download") {
	const token = getToken();
	const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
	let res;
	try {
		res = await fetch(url, {
			method: "GET",
			headers: { ...token ? { Authorization: `Bearer ${token}` } : {} }
		});
	} catch (netErr) {
		throw new ApiError(`Unable to connect to the backend server at ${API_BASE_URL}. Please verify it is running.`, 0);
	}
	if (!res.ok) {
		const errorPayload = await res.json().catch(() => null);
		let message = `Export failed (${res.status})`;
		if (errorPayload && typeof errorPayload === "object") {
			if (errorPayload.message) message = String(errorPayload.message);
		}
		if (res.status === 401) {
			setToken(null);
			if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("campuspulse:unauthorized"));
		}
		throw new ApiError(message, res.status);
	}
	let filename = fallbackFilename;
	const disposition = res.headers.get("content-disposition");
	if (disposition) {
		const match = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?/i.exec(disposition);
		if (match && match[1]) filename = decodeURIComponent(match[1].trim());
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
//#endregion
export { getToken as a, setToken as c, downloadFile as i, apiSend as n, mock as o, apiUpload as r, resolveMediaUrl as s, apiGet as t };
