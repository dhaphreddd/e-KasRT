const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Callable Function to reset user password to "123456"
exports.resetUserPasswordToDefault = functions.https.onCall(async (data, context) => {
  // 1. Ensure caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Hanya pengguna terautentikasi yang dapat memanggil fungsi ini."
    );
  }

  const callerUid = context.auth.uid;

  try {
    // 2. Fetch caller's profile to verify if they are an admin
    const callerDoc = await admin.firestore().collection("users").doc(callerUid).get();
    if (!callerDoc.exists || callerDoc.data().role !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Hanya pengguna dengan role ADMIN yang dapat menyetujui reset password."
      );
    }

    const targetEmail = data.email;
    if (!targetEmail) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Email target wajib disediakan."
      );
    }

    // 3. Verify target role to block resetting Admin accounts
    const usersRef = admin.firestore().collection("users");
    const userQuery = await usersRef.where("email", "==", targetEmail).get();
    if (!userQuery.empty) {
      const targetUser = userQuery.docs[0].data();
      if (targetUser.role === "admin") {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Kata sandi akun dengan role ADMIN tidak dapat di-reset melalui metode ini."
        );
      }
    }

    // 4. Find user by email in Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(targetEmail);

    // 4. Update password to '123456'
    await admin.auth().updateUser(userRecord.uid, {
      password: "123456"
    });

    return { success: true, message: `Password untuk user ${targetEmail} berhasil di-reset menjadi 123456.` };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new functions.https.HttpsError(
      "internal",
      error.message || "Terjadi kesalahan internal saat mereset password."
    );
  }
});
