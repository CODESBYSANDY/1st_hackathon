// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { ApiClient } from './api/client';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD3iDIdz9I-rZGG0_d7tY7JKLa6NcAxJPs",
  authDomain: "placementpreparation-c7798.firebaseapp.com",
  projectId: "placementpreparation-c7798",
  storageBucket: "placementpreparation-c7798.firebasestorage.app",
  messagingSenderId: "820781756165",
  appId: "1:820781756165:web:d802ccae5c81007a8b116c",
  measurementId: "G-9HX8T3N2M1"
};

// Initialize Firebase App as Singleton
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Initialize Analytics conditionally (only in supported browser environments)
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional in local dev
  });
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");
googleProvider.setCustomParameters({
  prompt: "select_account"
});

/**
 * Format raw Firebase User into NETRA Student Profile
 */
export const formatFirebaseUser = (firebaseUser) => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Student",
    email: firebaseUser.email || "student@netra.learn",
    avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
    emailVerified: firebaseUser.emailVerified || false,
    provider: firebaseUser.providerData?.[0]?.providerId || "firebase",
    lastLoginAt: new Date().toISOString()
  };
};

/**
 * Get and store Firebase ID token for backend API calls.
 */
export const refreshAndStoreToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(/* forceRefresh */ false);
      ApiClient.setAuthToken(token);
      return token;
    } catch (e) {
      console.warn('[NETRA] Failed to get Firebase ID token:', e.message);
      return null;
    }
  }
  return null;
};

/**
 * Sign In With Google via Popup
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const student = formatFirebaseUser(result.user);

    // Store Firebase ID token for backend API calls
    const token = await result.user.getIdToken();
    ApiClient.setAuthToken(token);

    if (student) {
      localStorage.setItem("netra_auth_user", JSON.stringify(student));
    }
    return { success: true, user: student };
  } catch (error) {
    console.error("Firebase Google Auth error:", error);
    return { 
      success: false, 
      error: error.message, 
      code: error.code 
    };
  }
};

/**
 * Guest / Demo Sign In Fallback
 * (Ensures local developers can enter even if localhost domain is not added to Firebase Console)
 */
export const loginAsDemoUser = async (role = "Full Stack Web Engineer") => {
  const demoStudent = {
    uid: "demo-stu-" + Math.random().toString(36).substring(2, 9),
    name: "Alex Rivera",
    email: "alex.rivera@campus.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    emailVerified: true,
    provider: "demo-guest",
    lastLoginAt: new Date().toISOString()
  };
  // Demo user won't have a real Firebase token — clear it
  ApiClient.setAuthToken(null);
  localStorage.setItem("netra_auth_user", JSON.stringify(demoStudent));
  return { success: true, user: demoStudent };
};

/**
 * Sign Out from Firebase
 */
export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn("SignOut warning:", error);
  } finally {
    localStorage.removeItem("netra_auth_user");
    localStorage.removeItem("netra_student_state");
    localStorage.removeItem("netra_domain");
    ApiClient.setAuthToken(null);
  }
};

/**
 * Get cached user from localStorage
 */
export const getSavedAuthUser = () => {
  try {
    const raw = localStorage.getItem("netra_auth_user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Auth state listener — also refreshes the Firebase ID token
 */
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const student = formatFirebaseUser(firebaseUser);
      // Keep token fresh
      try {
        const token = await firebaseUser.getIdToken();
        ApiClient.setAuthToken(token);
      } catch (e) {
        console.warn('[NETRA] Token refresh failed:', e.message);
      }
      localStorage.setItem("netra_auth_user", JSON.stringify(student));
      callback(student);
    } else {
      // Check if we have a demo/guest session
      const saved = getSavedAuthUser();
      if (saved && saved.provider === "demo-guest") {
        callback(saved);
      } else {
        localStorage.removeItem("netra_auth_user");
        ApiClient.setAuthToken(null);
        callback(null);
      }
    }
  });
};
