import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD4t6NvncbMLfXI_i7J1DHL3ERb8DCHSqs",
  authDomain: "e-kasrt.firebaseapp.com",
  projectId: "e-kasrt",
  storageBucket: "e-kasrt.firebasestorage.app",
  messagingSenderId: "537379480507",
  appId: "1:537379480507:web:fe3679f16d7e1a2c9a1a9e"
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
