import { 
  auth, 
  db 
} from "./config";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc 
} from "firebase/firestore";

// Helper to check role and details of current logged-in user
export async function getUserProfile(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
  return null;
}

// Login function supporting both Email and Username fallback
export async function loginUser(identifier, password, rememberMe = false) {
  let email = identifier;

  // Check if identifier is a username (doesn't contain '@')
  if (!identifier.includes("@")) {
    const usernameClean = identifier.trim().toLowerCase();
    const usernameDoc = await getDoc(doc(db, "usernames", usernameClean));
    
    if (!usernameDoc.exists()) {
      throw new Error("Username tidak terdaftar.");
    }
    
    email = usernameDoc.data().email;
  }

  // Perform standard email sign in
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Get additional user profile details
  const profile = await getUserProfile(user.uid);
  
  if (profile && !profile.is_active) {
    await signOut(auth);
    throw new Error("Akun Anda telah dinonaktifkan.");
  }

  if (rememberMe) {
    localStorage.setItem("remember_me", "true");
  } else {
    localStorage.removeItem("remember_me");
  }

  return { user, profile };
}

// Logout function
export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem("remember_me");
}

// Password reset
export async function resetUserPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// Auto login / session listener
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      callback(user, profile);
    } else {
      callback(null, null);
    }
  });
}

// Change logged-in user password with current password verification
export async function updateCurrentUserPassword(currentPassword, newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error("Pengguna tidak terautentikasi.");
  
  // Re-authenticate user with their current password
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  
  // Perform password update
  await updatePassword(user, newPassword);
}
