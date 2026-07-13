import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, writeBatch } from "firebase/firestore";
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

console.log("Menghubungkan ke Firebase Project:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function runSeed() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@ekasrt.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin12345";
  const adminUsername = "admin";

  console.log(`Mencoba membuat user admin dengan email: ${adminEmail}`);

  try {
    // 1. Create auth user
    const credentials = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    const uid = credentials.user.uid;
    console.log("Sesi Auth Admin dibuat. UID:", uid);

    // 2. Create users/admin document
    await setDoc(doc(db, "users", uid), {
      username: adminUsername,
      email: adminEmail,
      nama_lengkap: "Administrator RT",
      role: "admin",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    });
    console.log("Dokumen user admin disimpan di Firestore.");

    // 3. Create default settings
    await setDoc(doc(db, "settings", "rt_config"), {
      nama_rt: "RT 01 / RW 12",
      alamat: "Perumahan Indah Permai Blok C, Kel. Jaya Baru",
      ketua: "Budi Santoso",
      no_rekening: "Mandiri 123-00-998877-6",
      kontak: "08123456789",
      logo_url: "",
      updated_at: new Date()
    });
    console.log("Dokumen setting RT disimpan di Firestore.");

    // 4. Batch write default categories
    const categoriesBatch = writeBatch(db);
    
    const categories = [
      { id: "kat_iuran_kebersihan", nama: "Iuran Kebersihan Bulanan", jenis: "pemasukan" },
      { id: "kat_iuran_keamanan", nama: "Iuran Keamanan Bulanan", jenis: "pemasukan" },
      { id: "kat_donasi", nama: "Donasi Warga / Kegiatan", jenis: "pemasukan" },
      { id: "kat_operasional", nama: "Pengeluaran Operasional RT", jenis: "pengeluaran" },
      { id: "kat_sosial", nama: "Dana Sosial Warga Sakit/Duka", jenis: "pengeluaran" }
    ];

    categories.forEach(cat => {
      const ref = doc(db, "kategori_transaksi", cat.id);
      categoriesBatch.set(ref, {
        nama: cat.nama,
        jenis: cat.jenis,
        created_at: new Date()
      });
    });
    await categoriesBatch.commit();
    console.log("Kategori transaksi default disimpan.");

    // 5. Batch write default dues (master iuran)
    const duesBatch = writeBatch(db);
    const dues = [
      { id: "iuran_kebersihan", nama: "Iuran Kebersihan", kategori_id: "kat_iuran_kebersihan", hari_jatuh_tempo: 10, is_aktif: true },
      { id: "iuran_keamanan", nama: "Iuran Keamanan", kategori_id: "kat_iuran_keamanan", hari_jatuh_tempo: 10, is_aktif: true }
    ];

    dues.forEach(due => {
      const ref = doc(db, "iuran", due.id);
      duesBatch.set(ref, {
        nama: due.nama,
        kategori_id: due.kategori_id,
        hari_jatuh_tempo: due.hari_jatuh_tempo,
        is_aktif: due.is_aktif,
        created_at: new Date()
      });
    });
    await duesBatch.commit();
    console.log("Master iuran default disimpan.");

    console.log("--- SEEDING DATABASE SELESAI ---");
    process.exit(0);
  } catch (error) {
    console.error("Gagal melakukan seeding:", error);
    process.exit(1);
  }
}

runSeed();
