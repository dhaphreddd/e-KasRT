import { db } from "../firebase/config";
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { formatRupiah } from "../utils/formatters";
import { logActivity } from "../firebase/db";

export function renderIuranPage() {
  return `
    <div class="grid-2col-1-1">
      <!-- Left side: Master Dues Settings -->
      <div class="card" style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 class="card-title" style="margin-bottom: 0;">Master Iuran Bulanan</h4>
          <button id="btn-add-iuran" class="btn btn-primary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-add-line"></i> Tambah
          </button>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Iuran</th>
                <th>Tempo</th>
                <th>Status</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody id="iuran-table-body">
              <tr>
                <td colspan="4" style="text-align: center;">Memuat data iuran...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right side: Custom Rates (Tarif Warga) -->
      <div class="card" style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 class="card-title" style="margin-bottom: 0;">Tarif Iuran Warga</h4>
          <button id="btn-add-tarif" class="btn btn-primary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-add-line"></i> Atur Tarif
          </button>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Warga</th>
                <th>Iuran</th>
                <th>Nominal</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody id="tarif-table-body">
              <tr>
                <td colspan="4" style="text-align: center;">Memuat data tarif warga...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Master Iuran Modal -->
    <div id="iuran-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-iuran-title" style="font-weight: 700;">Tambah Iuran</h3>
          <button id="modal-iuran-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="iuran-form">
          <input type="hidden" id="iuran-id">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="iuran-nama">Nama Iuran</label>
              <input type="text" id="iuran-nama" class="form-control" required placeholder="Contoh: Iuran Kebersihan">
            </div>
            <div class="form-group">
              <label class="form-label" for="iuran-kategori">Hubungkan ke Kategori Pemasukan</label>
              <select id="iuran-kategori" class="form-control" required>
                <option value="">Pilih Kategori...</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="iuran-jatuh-tempo">Hari Jatuh Tempo Bulanan</label>
              <input type="number" id="iuran-jatuh-tempo" class="form-control" min="1" max="31" value="10" required>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="iuran-aktif" checked style="width: 16px; height: 16px;">
              <label for="iuran-aktif" class="form-label" style="margin-bottom: 0; cursor: pointer;">Status Aktif</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-iuran" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tarif Kustom Modal -->
    <div id="tarif-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-tarif-title" style="font-weight: 700;">Atur Tarif Iuran Warga</h3>
          <button id="modal-tarif-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="tarif-form">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="tarif-warga-id">Nama Warga (Aktif)</label>
              <select id="tarif-warga-id" class="form-control" required>
                <option value="">Pilih Warga...</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="tarif-iuran-id">Jenis Iuran</label>
              <select id="tarif-iuran-id" class="form-control" required>
                <option value="">Pilih Iuran...</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="tarif-nominal">Nominal Iuran (Rp)</label>
              <input type="number" id="tarif-nominal" class="form-control" min="0" required placeholder="Contoh: 50000">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-tarif" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export async function initIuranPage() {
  const iuranTableBody = document.getElementById("iuran-table-body");
  const tarifTableBody = document.getElementById("tarif-table-body");
  
  // Modals & Forms
  const iuranModal = document.getElementById("iuran-modal");
  const iuranForm = document.getElementById("iuran-form");
  const addIuranBtn = document.getElementById("btn-add-iuran");
  
  const tarifModal = document.getElementById("tarif-modal");
  const tarifForm = document.getElementById("tarif-form");
  const addTarifBtn = document.getElementById("btn-add-tarif");

  let allIurans = [];
  let allTarifs = [];
  let allWarga = [];
  let categories = [];

  // Fetch Kategori Pemasukan list for dropdown
  async function loadCategories() {
    const q = query(collection(db, "kategori_transaksi"), where("jenis", "==", "pemasukan"));
    const snap = await getDocs(q);
    categories = [];
    let html = `<option value="">Pilih Kategori...</option>`;
    snap.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
      html += `<option value="${doc.id}">${doc.data().nama}</option>`;
    });
    document.getElementById("iuran-kategori").innerHTML = html;
  }

  // Fetch Warga list for dropdown
  async function loadWargaOptions() {
    try {
      const q = query(collection(db, "warga"), where("status", "==", "aktif"));
      const snap = await getDocs(q);
      allWarga = [];
      snap.forEach(doc => {
        allWarga.push({ id: doc.id, ...doc.data() });
      });
      allWarga.sort((a, b) => (a.nama || "").localeCompare(b.nama || ""));

      let html = `<option value="">Pilih Warga...</option>`;
      allWarga.forEach(item => {
        html += `<option value="${item.id}">${item.nama}</option>`;
      });
      document.getElementById("tarif-warga-id").innerHTML = html;
    } catch (err) {
      console.error("Error loading warga options:", err);
    }
  }

  // Load master iurans
  async function loadIurans() {
    iuranTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Memuat data...</td></tr>`;
    try {
      const snap = await getDocs(collection(db, "iuran"));
      allIurans = [];
      let selectHtml = `<option value="">Pilih Iuran...</option>`;
      
      snap.forEach(doc => {
        const item = { id: doc.id, ...doc.data() };
        allIurans.push(item);
        if (item.is_aktif) {
          selectHtml += `<option value="${item.id}">${item.nama}</option>`;
        }
      });
      document.getElementById("tarif-iuran-id").innerHTML = selectHtml;
      renderIuranTable();
    } catch (e) {
      console.error(e);
      iuranTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--error);">Gagal memuat iuran.</td></tr>`;
    }
  }

  function renderIuranTable() {
    if (allIurans.length === 0) {
      iuranTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--on-surface-variant);">Belum ada iuran terdaftar.</td></tr>`;
      return;
    }

    iuranTableBody.innerHTML = allIurans.map(i => `
      <tr>
        <td style="font-weight: 600;">${i.nama}</td>
        <td>Tgl ${i.hari_jatuh_tempo}</td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${i.is_aktif ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${i.is_aktif ? 'var(--success)' : 'var(--error)'};">
            ${i.is_aktif ? 'Aktif' : 'Nonaktif'}
          </span>
        </td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-secondary toggle-iuran-btn" data-id="${i.id}" title="Toggle Aktif/Nonaktif" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-refresh-line"></i>
            </button>
            <button class="btn btn-danger delete-iuran-btn" data-id="${i.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Bind triggers
    document.querySelectorAll(".toggle-iuran-btn").forEach(btn => {
      btn.addEventListener("click", () => toggleIuran(btn.dataset.id));
    });
    document.querySelectorAll(".delete-iuran-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteIuranConfirm(btn.dataset.id));
    });
  }

  // Load custom rates (tarif warga)
  async function loadTarifs() {
    tarifTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Memuat data...</td></tr>`;
    try {
      const snap = await getDocs(collection(db, "iuran_warga"));
      allTarifs = [];
      snap.forEach(doc => {
        allTarifs.push({ id: doc.id, ...doc.data() });
      });
      renderTarifTable();
    } catch (e) {
      console.error(e);
      tarifTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--error);">Gagal memuat tarif warga.</td></tr>`;
    }
  }

  function renderTarifTable() {
    if (allTarifs.length === 0) {
      tarifTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--on-surface-variant);">Belum ada tarif kustom diatur.</td></tr>`;
      return;
    }

    tarifTableBody.innerHTML = allTarifs.map(t => {
      const wargaObj = allWarga.find(w => w.id === t.warga_id) || { nama: "Tidak Diketahui" };
      const iuranObj = allIurans.find(i => i.id === t.iuran_id) || { nama: "Tidak Diketahui" };
      return `
        <tr>
          <td style="font-weight: 600;">${wargaObj.nama}</td>
          <td>${iuranObj.nama}</td>
          <td style="font-weight: 600; color: var(--primary);">${formatRupiah(t.nominal)}</td>
          <td style="text-align: right;">
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button class="btn btn-secondary edit-tarif-btn" data-id="${t.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                <i class="ri-edit-line"></i> Edit
              </button>
              <button class="btn btn-danger delete-tarif-btn" data-id="${t.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                <i class="ri-delete-bin-line"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll(".edit-tarif-btn").forEach(btn => {
      btn.addEventListener("click", () => openEditTarifModal(btn.dataset.id));
    });
    document.querySelectorAll(".delete-tarif-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteTarifConfirm(btn.dataset.id));
    });
  }

  // Master Iuran CRUD functions
  async function toggleIuran(id) {
    const iuran = allIurans.find(x => x.id === id);
    if (!iuran) return;
    
    try {
      await updateDoc(doc(db, "iuran", id), {
        is_aktif: !iuran.is_aktif
      });
      await logActivity("update", `Mengubah status keaktifan iuran ${iuran.nama}`);
      loadIurans();
    } catch (e) {
      Swal.fire("Gagal", "Gagal mengubah status iuran.", "error");
    }
  }

  async function deleteIuranConfirm(id) {
    const iuran = allIurans.find(x => x.id === id);
    if (!iuran) return;

    const result = await Swal.fire({
      title: 'Hapus Iuran?',
      text: `Apakah Anda yakin ingin menghapus iuran "${iuran.nama}"? Ini akan menghapus data history terkait.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      cancelButtonColor: 'var(--secondary)',
      confirmButtonText: 'Ya, Hapus!'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "iuran", id));
        await logActivity("delete", `Menghapus master iuran ${iuran.nama}`);
        Swal.fire("Berhasil", "Iuran telah terhapus.", "success");
        loadIurans();
      } catch (e) {
        Swal.fire("Gagal", "Gagal menghapus iuran.", "error");
      }
    }
  }

  // Master Dues submit
  iuranForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nama = document.getElementById("iuran-nama").value.trim();
    const kategoriId = document.getElementById("iuran-kategori").value;
    const tempo = Number(document.getElementById("iuran-jatuh-tempo").value);
    const aktif = document.getElementById("iuran-aktif").checked;

    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
      await addDoc(collection(db, "iuran"), {
        nama,
        kategori_id: kategoriId,
        hari_jatuh_tempo: tempo,
        is_aktif: aktif,
        created_at: serverTimestamp()
      });
      await logActivity("create", `Membuat master iuran baru ${nama}`);
      Swal.fire("Sukses", "Master iuran berhasil ditambahkan.", "success");
      iuranModal.classList.remove("show");
      loadIurans();
    } catch (e) {
      Swal.fire("Gagal", "Gagal menambahkan iuran.", "error");
    }
  });

  // Tarif Kustom submit
  tarifForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const wargaId = document.getElementById("tarif-warga-id").value;
    const iuranId = document.getElementById("tarif-iuran-id").value;
    const nominal = Number(document.getElementById("tarif-nominal").value);

    if (nominal < 0) {
      Swal.fire("Peringatan", "Nominal tarif tidak boleh minus atau kurang dari 0.", "warning");
      return;
    }

    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
      const docId = `${wargaId}_${iuranId}`;
      await setDoc(doc(db, "iuran_warga", docId), {
        warga_id: wargaId,
        iuran_id: iuranId,
        nominal,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });
      
      const wargaObj = allWarga.find(w => w.id === wargaId) || { nama: "" };
      const iuranObj = allIurans.find(i => i.id === iuranId) || { nama: "" };
      await logActivity("create", `Mengatur tarif kustom ${iuranObj.nama} warga ${wargaObj.nama} menjadi ${formatRupiah(nominal)}`);

      Swal.fire("Sukses", "Tarif warga berhasil diatur.", "success");
      tarifModal.classList.remove("remove");
      tarifModal.classList.remove("show");
      loadTarifs();
    } catch (e) {
      Swal.fire("Gagal", "Gagal menyimpan tarif warga.", "error");
    }
  });

  async function deleteTarifConfirm(id) {
    const result = await Swal.fire({
      title: 'Hapus Tarif?',
      text: 'Apakah Anda yakin ingin menghapus tarif kustom warga ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "iuran_warga", id));
        await logActivity("delete", `Menghapus tarif kustom iuran untuk id ${id}`);
        Swal.fire("Terhapus", "Tarif kustom telah dihapus.", "success");
        loadTarifs();
      } catch (e) {
        Swal.fire("Gagal", "Gagal menghapus tarif.", "error");
      }
    }
  }

  function openEditTarifModal(id) {
    const tarif = allTarifs.find(t => t.id === id);
    if (!tarif) return;

    document.getElementById("modal-tarif-title").innerText = "Edit Tarif Iuran Warga";
    document.getElementById("tarif-warga-id").value = tarif.warga_id;
    document.getElementById("tarif-warga-id").disabled = true; // disable select during edit to prevent key modification
    document.getElementById("tarif-iuran-id").value = tarif.iuran_id;
    document.getElementById("tarif-iuran-id").disabled = true; // disable select during edit
    document.getElementById("tarif-nominal").value = tarif.nominal;
    
    tarifModal.classList.add("show");
  }

  // Modal display toggles
  addIuranBtn.addEventListener("click", () => {
    iuranForm.reset();
    document.getElementById("iuran-id").value = "";
    iuranModal.classList.add("show");
  });
  document.getElementById("modal-iuran-close").addEventListener("click", () => iuranModal.classList.remove("show"));
  document.getElementById("btn-cancel-iuran").addEventListener("click", () => iuranModal.classList.remove("show"));

  addTarifBtn.addEventListener("click", () => {
    tarifForm.reset();
    document.getElementById("modal-tarif-title").innerText = "Atur Tarif Iuran Warga";
    document.getElementById("tarif-warga-id").disabled = false;
    document.getElementById("tarif-iuran-id").disabled = false;
    tarifModal.classList.add("show");
  });
  document.getElementById("modal-tarif-close").addEventListener("click", () => tarifModal.classList.remove("show"));
  document.getElementById("btn-cancel-tarif").addEventListener("click", () => tarifModal.classList.remove("show"));

  // Init loads
  await loadCategories();
  await loadWargaOptions();
  await loadIurans();
  await loadTarifs();
}
