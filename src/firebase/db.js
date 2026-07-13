import { 
  db, 
  auth 
} from "./config";
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  runTransaction,
  serverTimestamp,
  writeBatch
} from "firebase/firestore";

// Helper to log user activities
export async function logActivity(action, description) {
  const currentUser = auth.currentUser;
  if (!currentUser) return;
  
  try {
    const userProfile = await getDoc(doc(db, "users", currentUser.uid));
    const username = userProfile.exists() ? userProfile.data().username : "unknown";
    
    await addDoc(collection(db, "activity_logs"), {
      user_id: currentUser.uid,
      username: username,
      action: action,
      description: description,
      created_at: serverTimestamp()
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}

// ----------------------------------------------------
// FIRESTORE TRANSACTIONS FOR PAYMENT & ROLLBACK
// ----------------------------------------------------

// Record Dues Payment (using Firestore Transaction)
export async function recordPayment(wargaId, iuranId, bulan, tahun, nominal, kategoriId, iuranNama, wargaNama) {
  const docId = `${wargaId}_${iuranId}_${bulan}_${tahun}`;
  const paymentRef = doc(db, "pembayaran_iuran", docId);
  const transaksiRef = doc(collection(db, "transaksi")); // Auto ID for transaction

  const currentUser = auth.currentUser;
  const userProfileDoc = await getDoc(doc(db, "users", currentUser.uid));
  const userProfile = userProfileDoc.exists() ? userProfileDoc.data() : { nama_lengkap: "System" };

  const namaBulan = [
    "", "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ][bulan];

  await runTransaction(db, async (transaction) => {
    // Check if payment already exists
    const paymentSnap = await transaction.get(paymentRef);
    if (paymentSnap.exists()) {
      throw new Error("Iuran untuk bulan ini sudah dibayar.");
    }

    // 1. Create cash transaction record
    transaction.set(transaksiRef, {
      tanggal: serverTimestamp(),
      kategori_id: kategoriId,
      kategori_nama: iuranNama,
      jenis: "pemasukan",
      nominal: Number(nominal),
      keterangan: `Iuran ${iuranNama} - ${namaBulan} ${tahun} - ${wargaNama}`,
      warga_id_terkait: wargaId,
      warga_nama_terkait: wargaNama,
      user_id_penginput: currentUser.uid,
      user_nama_penginput: userProfile.nama_lengkap,
      created_at: serverTimestamp()
    });

    // 2. Create pembayaran iuran record
    transaction.set(paymentRef, {
      warga_id: wargaId,
      iuran_id: iuranId,
      bulan: Number(bulan),
      tahun: Number(tahun),
      nominal: Number(nominal),
      transaksi_id: transaksiRef.id,
      created_at: serverTimestamp()
    });
  });

  // Log the activity
  await logActivity("pay", `Mencatat pembayaran iuran ${iuranNama} (${namaBulan} ${tahun}) warga ${wargaNama}`);
}

// Cancel Dues Payment / Rollback (using Firestore Transaction)
export async function cancelPayment(paymentDocId) {
  const paymentRef = doc(db, "pembayaran_iuran", paymentDocId);

  await runTransaction(db, async (transaction) => {
    const paymentSnap = await transaction.get(paymentRef);
    if (!paymentSnap.exists()) {
      throw new Error("Data pembayaran tidak ditemukan.");
    }

    const paymentData = paymentSnap.data();
    const transaksiId = paymentData.transaksi_id;

    // Delete pembayaran record
    transaction.delete(paymentRef);

    // Delete associated cash transaction
    if (transaksiId) {
      const transaksiRef = doc(db, "transaksi", transaksiId);
      transaction.delete(transaksiRef);
    }
  });

  await logActivity("cancel", `Membatalkan pembayaran iuran untuk id pembayaran ${paymentDocId}`);
}

// ----------------------------------------------------
// SETTINGS
// ----------------------------------------------------
export async function getSettings() {
  const docRef = doc(db, "settings", "rt_config");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {
    nama_rt: "RT 01",
    alamat: "Jl. Merdeka No. 1",
    ketua: "Budi Santoso",
    no_rekening: "123-456-789",
    kontak: "081234567890",
    logo_url: ""
  };
}

export async function updateSettings(data) {
  const docRef = doc(db, "settings", "rt_config");
  await setDoc(docRef, { ...data, updated_at: serverTimestamp() }, { merge: true });
  await logActivity("update", "Memperbarui pengaturan RT");
}

// ----------------------------------------------------
// DATABASE RESTORE / IMPORT helper
// ----------------------------------------------------
export async function restoreCollection(collectionName, documentsArray) {
  const batch = writeBatch(db);
  documentsArray.forEach((docData) => {
    const docRef = doc(collection(db, collectionName), docData.id);
    const cleanedData = { ...docData };
    delete cleanedData.id;
    
    // Convert timestamps back to Firebase Timestamps if key matches format
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] && cleanedData[key].seconds) {
        cleanedData[key] = new Date(cleanedData[key].seconds * 1000);
      }
    });

    batch.set(docRef, cleanedData);
  });
  await batch.commit();
  await logActivity("restore", `Melakukan restore collection ${collectionName}`);
}
