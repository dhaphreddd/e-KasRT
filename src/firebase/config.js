import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-key-for-now",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ekasrt-local.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ekasrt-local",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ekasrt-local.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234:web:abcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Offline Cache Persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
  } else if (err.code == 'unimplemented') {
    console.warn("The current browser does not support all of the features required to enable persistence.");
  }
});

// Setup FCM (Push Notification)
let messaging = null;
try {
  messaging = getMessaging(app);
} catch (error) {
  console.warn("Firebase Messaging is not supported or permission is blocked in this browser.", error);
}

// Setup Functions
const functions = getFunctions(app);

export { app, auth, db, messaging, getToken, onMessage, functions, httpsCallable };
export default app;
