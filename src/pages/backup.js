import { db } from "../firebase/config";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc,
  serverTimestamp 
} from "firebase/firestore";
import { restoreCollection, logActivity } from "../firebase/db";

export function renderBackupPage() {
  return `
    <div style="max-width: 600px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 24px;">
      <!-- Export Backup Card -->
      <div class="card">
        <h4 class="card-title"><i class="ri-download-cloud-line" style="color: var(--primary);"></i> Ekspor Cadangan Data (Backup)</h4>
        <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-bottom: 20px; line-height: 1.5;">
          Ekspor seluruh data dari Firestore database (User, Warga, Kategori, Transaksi, Iuran, Pembayaran, dsb) menjadi satu berkas cadangan dengan format JSON. Simpan berkas ini di tempat yang aman.
        </p>
        <button id="btn-export-json" class="btn btn-primary" style="width: 100%; border-radius: var(--radius-md);">
          <i class="ri-file-download-line"></i> Unduh File Backup (.json)
        </button>
      </div>

      <!-- Import Restore Card -->
      <div class="card">
        <h4 class="card-title" style="color: var(--error);"><i class="ri-upload-cloud-line"></i> Pulihkan Data Cadangan (Restore)</h4>
        <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-bottom: 20px; line-height: 1.5;">
          Unggah berkas cadangan JSON yang telah diexport sebelumnya untuk menimpa/memulihkan data di database. 
          <strong style="color: var(--error);">Perhatian: Data yang ada akan ditimpa!</strong>
        </p>
        
        <div class="form-group" style="margin-bottom: 24px;">
          <input type="file" id="restore-json-input" class="form-control" accept=".json">
        </div>
        
        <button id="btn-restore-json" class="btn btn-danger" style="width: 100%; border-radius: var(--radius-md);">
          <i class="ri-history-line"></i> Jalankan Pemulihan Data
        </button>
      </div>
    </div>
  `;
}

export function initBackupPage() {
  const exportBtn = document.getElementById("btn-export-json");
  const restoreBtn = document.getElementById("btn-restore-json");
  const fileInput = document.getElementById("restore-json-input");

  // Export JSON
  exportBtn.addEventListener("click", async () => {
    Swal.fire({ title: 'Mengekspor data...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
    
    try {
      const collections = [
        "users", "warga", "kategori_transaksi", "transaksi", 
        "iuran", "iuran_warga", "pembayaran_iuran", "settings"
      ];
      
      const backupData = {};

      for (const colName of collections) {
        const snap = await getDocs(collection(db, colName));
        backupData[colName] = [];
        snap.forEach(docSnap => {
          const docData = docSnap.data();
          
          // Helper to serialize Firestore timestamps to standard format
          Object.keys(docData).forEach(key => {
            if (docData[key] && docData[key].seconds) {
              docData[key] = { seconds: docData[key].seconds };
            }
          });
          
          backupData[colName].push({
            id: docSnap.id,
            ...docData
          });
        });
      }

      // Convert to JSON and download
      const jsonString = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `backup_ekasrt_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await logActivity("backup", "Melakukan export backup database menjadi JSON");

      Swal.fire("Berhasil", "Berkas cadangan data berhasil diunduh.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal melakukan ekspor data.", "error");
    }
  });

  // Restore JSON
  restoreBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      Swal.fire("Peringatan", "Pilih berkas JSON cadangan terlebih dahulu.", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: 'Pulihkan Data?',
      text: 'Aksi ini akan menimpa koleksi data aktif dengan data dari berkas cadangan JSON Anda!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Ya, Pulihkan!'
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({ title: 'Memproses Pemulihan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const backupData = JSON.parse(evt.target.result);
        const keys = Object.keys(backupData);

        for (const colName of keys) {
          const docsArray = backupData[colName];
          if (Array.isArray(docsArray)) {
            await restoreCollection(colName, docsArray);
          }
        }

        Swal.fire("Selesai", "Pemulihan database kas berhasil dijalankan.", "success");
        fileInput.value = ""; // Reset
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal", "Gagal memproses berkas JSON atau restore database.", "error");
      }
    };
    reader.readAsText(file);
  });
}
