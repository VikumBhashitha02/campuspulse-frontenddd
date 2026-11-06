// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"] || "AIzaSyDrNpKQELqaGqn3id0-tCnuUW4AD4XE9Ew",
  authDomain: import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"] || "campuspulse-738eb.firebaseapp.com",
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"] || "campuspulse-738eb",
  storageBucket: import.meta.env["VITE_FIREBASE_STORAGE_BUCKET"] || "campuspulse-738eb.firebasestorage.app",
  messagingSenderId: import.meta.env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "145960477642",
  appId: import.meta.env["VITE_FIREBASE_APP_ID"] || "1:145960477642:web:7a9a4856d8643da0fbe533",
  measurementId: import.meta.env["VITE_FIREBASE_MEASUREMENT_ID"] || "G-S2G4Y0BYC1",
};

// Initialize Firebase
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Analytics (client-side only)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    /* Analytics not supported in current environment */
  });
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Trigger Firebase Google OAuth Popup and return user profile details
 */
export async function signInWithGoogleFirebase() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return {
    email: user.email || "",
    name: user.displayName || "Google User",
    avatarUrl: user.photoURL || null,
    googleId: user.uid,
  };
}

export default app;
