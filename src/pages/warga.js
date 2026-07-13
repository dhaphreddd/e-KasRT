import { db } from "../firebase/config";
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  writeBatch,
  serverTimestamp
} from "firebase/firestore";
import { logActivity } from "../firebase/db";

export function renderWargaPage(profile) {
  const isAdmin = profile.role === "admin";

  return `
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Data Warga</h3>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <!-- Export / Import Buttons -->
          <button id="btn-export-excel" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-file-excel-2-line"></i> Export Excel
          </button>
          <button id="btn-print-warga" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-printer-line"></i> Cetak / PDF
          </button>
          
          ${isAdmin ? `
            <button id="btn-import-excel" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
              <i class="ri-upload-2-line"></i> Import Excel
            </button>
            <button id="btn-add-warga" class="btn btn-primary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
              <i class="ri-user-add-line"></i> Tambah Warga
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Filters & Search -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        <div class="form-group" style="flex: 1; min-width: 200px; margin-bottom: 0;">
          <input type="text" id="search-warga" class="form-control" placeholder="Cari NIK, nama, atau alamat...">
        </div>
        <div class="form-group" style="width: 160px; margin-bottom: 0;">
          <select id="filter-status-tinggal" class="form-control">
            <option value="">Semua Tinggal</option>
            <option value="tetap">Tetap</option>
            <option value="kontrak">Kontrak</option>
            <option value="kos">Kos</option>
          </select>
        </div>
        <div class="form-group" style="width: 150px; margin-bottom: 0;">
          <select id="filter-status" class="form-control">
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
          </select>
        </div>
      </div>

      <!-- Table View -->
      <div class="table-responsive" id="print-area">
        <table class="table">
          <thead>
            <tr>
              <th>NIK</th>
              <th>Nama</th>
              <th>Status Tinggal</th>
              <th>No Kamar</th>
              <th>No HP</th>
              <th>Status</th>
              ${isAdmin ? `<th style="text-align: right;" class="no-print">Aksi</th>` : ''}
            </tr>
          </thead>
          <tbody id="warga-table-body">
            <tr>
              <td colspan="${isAdmin ? 7 : 6}" style="text-align: center; color: var(--on-surface-variant);">Memuat data warga...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Hidden Input File for Excel Import -->
    <input type="file" id="import-excel-file" accept=".xlsx, .xls" style="display: none;">

    <!-- Add/Edit Warga Modal -->
    ${isAdmin ? `
    <div id="warga-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-warga-title" style="font-weight: 700;">Tambah Warga</h3>
          <button id="modal-warga-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="warga-form">
          <input type="hidden" id="warga-id">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="warga-nik">NIK (16 Digit) <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <input type="text" id="warga-nik" class="form-control" maxlength="16">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-nama">Nama Lengkap</label>
              <input type="text" id="warga-nama" class="form-control" required placeholder="Contoh: Sugeng Rahayu">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-no-telp">Nomor HP <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <input type="text" id="warga-no-telp" class="form-control" placeholder="Contoh: 0812...">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-alamat">Alamat Lengkap <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <textarea id="warga-alamat" class="form-control" rows="2" placeholder="Alamat rumah asal/detail tinggal"></textarea>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" for="warga-status-tinggal">Status Tinggal <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
                <select id="warga-status-tinggal" class="form-control">
                  <option value="">Pilih...</option>
                  <option value="tetap">Tetap</option>
                  <option value="kontrak">Kontrak</option>
                  <option value="kos">Kos</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="warga-no-kamar">Nomor Kamar <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
                <input type="text" id="warga-no-kamar" class="form-control" placeholder="Contoh: A-10">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-keterangan">Keterangan Tinggal <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <input type="text" id="warga-keterangan" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label" for="warga-status">Status Keaktifan</label>
              <select id="warga-status" class="form-control" required>
                <option value="aktif">Aktif</option>
                <option value="tidak aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-warga" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
    ` : ''}
  `;
}

export async function initWargaPage(profile) {
  const isAdmin = profile.role === "admin";
  const tableBody = document.getElementById("warga-table-body");
  const searchInput = document.getElementById("search-warga");
  const filterTinggal = document.getElementById("filter-status-tinggal");
  const filterStatus = document.getElementById("filter-status");

  let allWarga = [];
  let openEditModal;
  let deleteWargaConfirm;

  // Load Warga List
  async function loadWarga() {
    tableBody.innerHTML = `<tr><td colspan="${isAdmin ? 7 : 6}" style="text-align: center;">Memuat data...</td></tr>`;
    try {
      const q = query(collection(db, "warga"), orderBy("nama"));
      const snap = await getDocs(q);
      allWarga = [];
      snap.forEach(doc => {
        allWarga.push({ id: doc.id, ...doc.data() });
      });
      renderTable();
    } catch (e) {
      console.error(e);
      tableBody.innerHTML = `<tr><td colspan="${isAdmin ? 7 : 6}" style="text-align: center; color: var(--error);">Gagal memuat data warga.</td></tr>`;
    }
  }

  function renderTable() {
    const searchVal = searchInput.value.toLowerCase().trim();
    const tinggalVal = filterTinggal.value;
    const statusVal = filterStatus.value;

    const filtered = allWarga.filter(w => {
      const matchSearch = w.nama.toLowerCase().includes(searchVal) || 
                          w.nik.includes(searchVal) || 
                          (w.alamat && w.alamat.toLowerCase().includes(searchVal));
      const matchTinggal = tinggalVal === "" || w.status_tinggal === tinggalVal;
      const matchStatus = statusVal === "" || w.status === statusVal;
      return matchSearch && matchTinggal && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="${isAdmin ? 7 : 6}" style="text-align: center; color: var(--on-surface-variant);">Tidak ada data warga ditemukan.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(w => `
      <tr>
        <td>${w.nik}</td>
        <td style="font-weight: 600;">${w.nama}</td>
        <td><span style="text-transform: capitalize;">${w.status_tinggal}</span></td>
        <td>${w.no_kamar || "-"}</td>
        <td>${w.no_telp || "-"}</td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${w.status === 'aktif' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${w.status === 'aktif' ? 'var(--success)' : 'var(--error)'};">
            ${w.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
          </span>
        </td>
        ${isAdmin ? `
        <td style="text-align: right;" class="no-print">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-secondary edit-warga-btn" data-id="${w.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-edit-line"></i> Edit
            </button>
            <button class="btn btn-danger delete-warga-btn" data-id="${w.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i> Hapus
            </button>
          </div>
        </td>
        ` : ''}
      </tr>
    `).join('');

    // Attach actions
    if (isAdmin) {
      document.querySelectorAll(".edit-warga-btn").forEach(btn => {
        btn.addEventListener("click", () => openEditModal(btn.dataset.id));
      });
      document.querySelectorAll(".delete-warga-btn").forEach(btn => {
        btn.addEventListener("click", () => deleteWargaConfirm(btn.dataset.id));
      });
    }
  }

  // Filter bindings
  searchInput.addEventListener("input", renderTable);
  filterTinggal.addEventListener("change", renderTable);
  filterStatus.addEventListener("change", renderTable);

  // Print function
  document.getElementById("btn-print-warga").addEventListener("click", () => {
    // Add print styles dynamically
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #print-area, #print-area * { visibility: visible; }
        #print-area { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  });

  // Export to Excel (using SheetJS)
  document.getElementById("btn-export-excel").addEventListener("click", () => {
    if (allWarga.length === 0) {
      Swal.fire("Info", "Tidak ada data warga untuk diekspor.", "info");
      return;
    }

    const data = allWarga.map(w => ({
      NIK: w.nik,
      Nama: w.nama,
      "Status Tinggal": w.status_tinggal,
      "No Kamar": w.no_kamar || "",
      "No HP": w.no_telp || "",
      Alamat: w.alamat || "",
      Status: w.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Warga");
    XLSX.writeFile(workbook, "Data_Warga_eKasRT.xlsx");
  });

  // Admin CRUD Modal operations
  if (isAdmin) {
    const modal = document.getElementById("warga-modal");
    const userForm = document.getElementById("warga-form");
    const addBtn = document.getElementById("btn-add-warga");
    const importBtn = document.getElementById("btn-import-excel");
    const importInput = document.getElementById("import-excel-file");

    // Add modal triggers
    addBtn.addEventListener("click", () => {
      document.getElementById("modal-warga-title").innerText = "Tambah Warga";
      document.getElementById("warga-id").value = "";
      document.getElementById("warga-nik").value = "";
      document.getElementById("warga-nama").value = "";
      document.getElementById("warga-no-telp").value = "";
      document.getElementById("warga-alamat").value = "";
      document.getElementById("warga-status-tinggal").value = "tetap";
      document.getElementById("warga-no-kamar").value = "";
      document.getElementById("warga-keterangan").value = "";
      document.getElementById("warga-status").value = "aktif";
      modal.classList.add("show");
    });

    const closeModal = () => modal.classList.remove("show");
    document.getElementById("modal-warga-close").addEventListener("click", closeModal);
    document.getElementById("btn-cancel-warga").addEventListener("click", closeModal);

    // Edit Warga
    openEditModal = function(id) {
      const w = allWarga.find(x => x.id === id);
      if (!w) return;

      document.getElementById("modal-warga-title").innerText = "Edit Warga";
      document.getElementById("warga-id").value = w.id;
      document.getElementById("warga-nik").value = w.nik;
      document.getElementById("warga-nama").value = w.nama;
      document.getElementById("warga-no-telp").value = w.no_telp || "";
      document.getElementById("warga-alamat").value = w.alamat || "";
      document.getElementById("warga-status-tinggal").value = w.status_tinggal || "tetap";
      document.getElementById("warga-no-kamar").value = w.no_kamar || "";
      document.getElementById("warga-keterangan").value = w.keterangan_tinggal || "";
      document.getElementById("warga-status").value = w.status || "aktif";

      modal.classList.add("show");
    }

    // Delete Warga Confirm
    deleteWargaConfirm = async function(id) {
      const w = allWarga.find(x => x.id === id);
      if (!w) return;

      const result = await Swal.fire({
        title: 'Hapus Data Warga?',
        text: `Apakah Anda yakin ingin menghapus data ${w.nama}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--error)',
        cancelButtonColor: 'var(--secondary)',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
        try {
          await deleteDoc(doc(db, "warga", id));
          await logActivity("delete", `Menghapus data warga ${w.nama}`);
          Swal.fire('Terhapus!', 'Data warga telah dihapus.', 'success');
          loadWarga();
        } catch (e) {
          console.error("Error deleting citizen:", e);
          Swal.fire('Gagal!', 'Gagal menghapus data warga. Detail: ' + (e.message || e), 'error');
        }
      }
    }



    // Form submit save/create
    userForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("warga-id").value;
      const nik = document.getElementById("warga-nik").value.trim();
      const nama = document.getElementById("warga-nama").value.trim();
      const noTelp = document.getElementById("warga-no-telp").value.trim();
      const alamat = document.getElementById("warga-alamat").value.trim();
      const statusTinggal = document.getElementById("warga-status-tinggal").value;
      const noKamar = document.getElementById("warga-no-kamar").value.trim();
      const keterangan = document.getElementById("warga-keterangan").value.trim();
      const status = document.getElementById("warga-status").value;

      if (nik && (nik.length !== 16 || isNaN(nik))) {
        Swal.fire("Peringatan", "NIK harus 16 digit angka.", "warning");
        return;
      }

      Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

      try {
        if (id) {
          // Edit Warga
          const wRef = doc(db, "warga", id);
          await updateDoc(wRef, {
            nik,
            nama,
            no_telp: noTelp,
            alamat,
            status_tinggal: statusTinggal,
            no_kamar: noKamar,
            keterangan_tinggal: keterangan,
            status,
            updated_at: serverTimestamp()
          });
          await logActivity("update", `Memperbarui data warga ${nama}`);
        } else {
          // Check NIK duplication locally
          if (nik) {
            const exists = allWarga.some(w => w.nik === nik);
            if (exists) {
              throw new Error("NIK sudah terdaftar sebelumnya.");
            }
          }

          // Add Warga
          await addDoc(collection(db, "warga"), {
            nik,
            nama,
            no_telp: noTelp,
            alamat,
            status_tinggal: statusTinggal,
            no_kamar: noKamar,
            keterangan_tinggal: keterangan,
            status,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
          });
          await logActivity("create", `Menambahkan data warga baru ${nama}`);
        }

        Swal.fire('Berhasil!', 'Data warga telah disimpan.', 'success');
        closeModal();
        loadWarga();
      } catch (err) {
        Swal.fire('Gagal!', err.message || 'Gagal menyimpan data.', 'error');
      }
    });

    // Import Excel Trigger
    importBtn.addEventListener("click", () => {
      importInput.click();
    });

    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          if (jsonData.length === 0) {
            Swal.fire("Info", "Berkas Excel kosong atau tidak cocok format.", "warning");
            return;
          }

          // Batch insert warga rows
          Swal.fire({ title: 'Memproses Import...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

          const batch = writeBatch(db);
          let importCount = 0;

          jsonData.forEach((row) => {
            const nik = String(row.NIK || "").trim();
            const nama = String(row.Nama || "").trim();
            if (nik && nama) {
              const newRef = doc(collection(db, "warga"));
              batch.set(newRef, {
                nik,
                nama,
                no_telp: String(row["No HP"] || "").trim(),
                alamat: String(row.Alamat || "").trim(),
                status_tinggal: String(row["Status Tinggal"] || "tetap").toLowerCase(),
                no_kamar: String(row["No Kamar"] || "").trim(),
                status: String(row.Status || "aktif").toLowerCase(),
                created_at: serverTimestamp(),
                updated_at: serverTimestamp()
              });
              importCount++;
            }
          });

          await batch.commit();
          await logActivity("create", `Mengimpor ${importCount} data warga dari berkas Excel`);
          Swal.fire("Sukses", `Berhasil mengimpor ${importCount} data warga.`, "success");
          loadWarga();
        } catch (error) {
          console.error(error);
          Swal.fire("Gagal", "Gagal membaca atau memproses berkas Excel.", "error");
        }
        importInput.value = ""; // Clear file selector
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // Initial load
  loadWarga();
}
