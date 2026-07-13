# e-kasRT - Sistem Kas Keuangan & Iuran Warga (Firebase + PWA)

Aplikasi Web SPA (Single Page Application) modern untuk mengelola kas keuangan RT, monitoring iuran bulanan warga, dan pencatatan transaksi kas secara realtime. Dibangun menggunakan arsitektur serverless modern.

## 🚀 Fitur Utama

- **Realtime Dashboard**: Informasi saldo, pemasukan, pengeluaran, jumlah warga, dan chart arus kas bulanan secara live.
- **PWA (Progressive Web App)**: Caching offline, service worker, serta opsi *Add to Home Screen*.
- **Role-Based Access**: 4 Level role (Admin, Bendahara, Ketua RT, Warga) dengan Firestore Security Rules yang aman.
- **Monitoring Iuran**: Grid matriks 12 bulan interaktif untuk memantau pembayaran warga (Sudah bayar, Belum bayar, Tidak wajib).
- **Import/Export Data**: Integrasi impor/ekspor data warga dengan Excel (SheetJS), pencetakan PDF, dan export/import seluruh database format JSON.
- **Upload Bukti**: Integrasi Firebase Storage untuk menyimpan unggahan bukti pembayaran/pengeluaran kas.

---

## 📂 Struktur Project

```
D:\Code\e-kasrt-firebase\
├── .github/workflows/
│   └── firebase-deploy.yml     # GitHub Actions Auto Deploy
├── public/
│   ├── manifest.json               # Web App Manifest
│   ├── service-worker.js           # SW untuk caching offline
│   └── assets/                     # Logo dan Ikon PWA
├── src/
│   ├── firebase/
│   │   ├── config.js               # Inisialisasi SDK Firebase
│   │   ├── auth.js                 # Wrapper Autentikasi
│   │   └── db.js                   # Transaksi & Query Firestore
│   ├── components/                 # Reusable Layout components
│   ├── pages/                      # Modul Halaman
│   ├── styles/                     # Tema Material Design 3
│   ├── utils/                      # Helper & Export wrapper
│   └── main.js                     # Bootstrap Router SPA
├── firestore.rules                 # Aturan keamanan database
├── firestore.indexes.json          # File konfigurasi indexing
├── firebase.json                   # Konfigurasi deployment
└── README.md
```

---

## 🛠️ Langkah Instalasi & Konfigurasi

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 16 atau terbaru).

### 2. Kloning / Unduh Proyek
Salin proyek ini ke folder lokal Anda:
```bash
cd D:\Code\e-kasrt-firebase
npm install
```

### 3. Konfigurasi Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/).
2. Buat Project baru bernama `e-kasrt`.
3. Aktifkan layanan berikut:
   - **Authentication**: Aktifkan Email/Password provider.
   - **Cloud Firestore**: Buat database dalam mode test/production.
   - **Firebase Storage**: Aktifkan media storage bucket.
   - **Firebase Hosting**: Siapkan hosting proyek.
4. Buat Web App di dalam project Firebase tersebut, dan salin kredensial API.

### 4. Setup File `.env`
Buat file `.env` di root project (`D:\Code\e-kasrt-firebase\.env`) dan masukkan data kredensial Firebase Anda:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=e-kasrt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=e-kasrt
VITE_FIREBASE_STORAGE_BUCKET=e-kasrt.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234:web:abcd

# Konfigurasi Seed Admin Awal
SEED_ADMIN_EMAIL=admin@ekasrt.local
SEED_ADMIN_PASSWORD=Admin12345
```

### 5. Seeding Data Awal
Untuk membuat akun Admin pertama dan data master/kategori default ke Firestore, jalankan perintah:
```bash
node scripts/seed.js
```
*Catatan: Gunakan credential `admin@ekasrt.local` / `Admin12345` (atau ganti sesuai `.env`) untuk masuk pertama kali.*

### 6. Menjalankan Server Lokal (Dev Mode)
Jalankan aplikasi di localhost dengan perintah:
```bash
npm run dev
```
Aplikasi akan aktif di URL bawaan Vite, biasanya `http://localhost:5173`.

---

## 🚀 Deployment

### A. Deployment Manual ke Firebase Hosting
Gunakan Firebase CLI untuk deploy rule Firestore dan Hosting secara langsung:
```bash
# Login ke Firebase account
npx firebase login

# Deploy rules, indexes dan assets
npm run build
npx firebase deploy
```

### B. Deployment Otomatis via GitHub Actions
GitHub Action `.github/workflows/firebase-deploy.yml` telah dikonfigurasi untuk auto-deploy setiap ada push/commit ke branch `main`.

Langkah konfigurasi:
1. Hubungkan folder ini ke repository GitHub baru.
2. Tambahkan **Repository Secrets** di menu pengaturan GitHub Anda:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `FIREBASE_SERVICE_ACCOUNT` (didapat dari menu Project Settings -> Service Accounts di Firebase Console).
3. Commit & Push perubahan ke branch `main`. Deployment akan berjalan otomatis.
