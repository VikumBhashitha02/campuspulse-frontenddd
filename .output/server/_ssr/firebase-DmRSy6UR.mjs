import { c as getApps, l as initializeApp, n as isSupported, s as getApp, t as getAnalytics } from "../_libs/@firebase/analytics+[...].mjs";
import { n as getAuth, r as signInWithPopup, t as GoogleAuthProvider } from "../_libs/firebase__auth+tslib.mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-DmRSy6UR.js
var firebaseConfig = {
	apiKey: {
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
	}["VITE_FIREBASE_API_KEY"] || "AIzaSyDrNpKQELqaGqn3id0-tCnuUW4AD4XE9Ew",
	authDomain: {
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
	}["VITE_FIREBASE_AUTH_DOMAIN"] || "campuspulse-738eb.firebaseapp.com",
	projectId: {
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
	}["VITE_FIREBASE_PROJECT_ID"] || "campuspulse-738eb",
	storageBucket: {
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
	}["VITE_FIREBASE_STORAGE_BUCKET"] || "campuspulse-738eb.firebasestorage.app",
	messagingSenderId: {
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
	}["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "145960477642",
	appId: {
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
	}["VITE_FIREBASE_APP_ID"] || "1:145960477642:web:7a9a4856d8643da0fbe533",
	measurementId: {
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
	}["VITE_FIREBASE_MEASUREMENT_ID"] || "G-S2G4Y0BYC1"
};
var app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
if (typeof window !== "undefined") isSupported().then((supported) => {
	if (supported) getAnalytics(app);
}).catch(() => {});
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
/**
* Trigger Firebase Google OAuth Popup and return user profile details
*/
async function signInWithGoogleFirebase() {
	const user = (await signInWithPopup(auth, googleProvider)).user;
	return {
		email: user.email || "",
		name: user.displayName || "Google User",
		avatarUrl: user.photoURL || null,
		googleId: user.uid
	};
}
//#endregion
export { signInWithGoogleFirebase };
