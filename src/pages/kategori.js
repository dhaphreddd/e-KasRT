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
  serverTimestamp
} from "firebase/firestore";
import { logActivity } from "../firebase/db";

export function renderKategoriPage() {
  return `
    <div class="grid-2col-1-2">
      <!-- Form Input -->
      <div class="card" style="height: fit-content;">
        <h4 class="card-title" id="form-kategori-title">Tambah Kategori</h4>
        <form id="kategori-form">
          <input type="hidden" id="kategori-id">
          <div class="form-group">
            <label class="form-label" for="kategori-nama">Nama Kategori</label>
            <input type="text" id="kategori-nama" class="form-control" placeholder="Contoh: Iuran Sampah" required>
          </div>
          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label" for="kategori-jenis">Jenis Transaksi</label>
            <select id="kategori-jenis" class="form-control" required>
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
          <div style="display: flex; gap: 12px;">
            <button type="button" id="btn-reset-kategori" class="btn btn-secondary" style="flex: 1; display: none;">Batal</button>
            <button type="submit" class="btn btn-primary" style="flex: 2;">Simpan</button>
          </div>
        </form>
      </div>

      <!-- Categories Table List -->
      <div class="card">
        <h4 class="card-title">Daftar Kategori</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Kategori</th>
                <th>Jenis</th>
                <th style="text-align: right;">Aksi</th>
              </tr>
            </thead>
            <tbody id="kategori-table-body">
              <tr>
                <td colspan="3" style="text-align: center; color: var(--on-surface-variant);">Memuat data kategori...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function initKategoriPage() {
  const tableBody = document.getElementById("kategori-table-body");
  const form = document.getElementById("kategori-form");
  const idInput = document.getElementById("kategori-id");
  const namaInput = document.getElementById("kategori-nama");
  const jenisSelect = document.getElementById("kategori-jenis");
  const resetBtn = document.getElementById("btn-reset-kategori");
  const formTitle = document.getElementById("form-kategori-title");

  let allKategori = [];

  async function loadKategori() {
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Memuat data...</td></tr>`;
    try {
      const q = query(collection(db, "kategori_transaksi"), orderBy("nama"));
      const snap = await getDocs(q);
      allKategori = [];
      snap.forEach(doc => {
        allKategori.push({ id: doc.id, ...doc.data() });
      });
      renderTable();
    } catch (e) {
      console.error(e);
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--error);">Gagal memuat kategori.</td></tr>`;
    }
  }

  function renderTable() {
    if (allKategori.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--on-surface-variant);">Belum ada kategori terdaftar.</td></tr>`;
      return;
    }

    tableBody.innerHTML = allKategori.map(k => `
      <tr>
        <td style="font-weight: 600;">${k.nama}</td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${k.jenis === 'pemasukan' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${k.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'}; text-transform: capitalize;">
            ${k.jenis}
          </span>
        </td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-secondary edit-kategori-btn" data-id="${k.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-edit-line"></i>
            </button>
            <button class="btn btn-danger delete-kategori-btn" data-id="${k.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Bind edit/delete triggers
    document.querySelectorAll(".edit-kategori-btn").forEach(btn => {
      btn.addEventListener("click", () => populateForm(btn.dataset.id));
    });
    document.querySelectorAll(".delete-kategori-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteConfirm(btn.dataset.id));
    });
  }

  function populateForm(id) {
    const k = allKategori.find(x => x.id === id);
    if (!k) return;

    formTitle.innerText = "Edit Kategori";
    idInput.value = k.id;
    namaInput.value = k.nama;
    jenisSelect.value = k.jenis;
    resetBtn.style.display = "inline-flex";
  }

  function resetForm() {
    formTitle.innerText = "Tambah Kategori";
    idInput.value = "";
    namaInput.value = "";
    jenisSelect.value = "pemasukan";
    resetBtn.style.display = "none";
  }

  resetBtn.addEventListener("click", resetForm);

  async function deleteConfirm(id) {
    const k = allKategori.find(x => x.id === id);
    if (!k) return;

    const result = await Swal.fire({
      title: 'Hapus Kategori?',
      text: `Apakah Anda yakin ingin menghapus kategori "${k.nama}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      cancelButtonColor: 'var(--secondary)',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "kategori_transaksi", id));
        await logActivity("delete", `Menghapus kategori transaksi ${k.nama}`);
        Swal.fire('Terhapus!', 'Kategori telah dihapus.', 'success');
        loadKategori();
      } catch (e) {
        Swal.fire('Gagal!', 'Gagal menghapus kategori.', 'error');
      }
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = idInput.value;
    const nama = namaInput.value.trim();
    const jenis = jenisSelect.value;

    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
      if (id) {
        await updateDoc(doc(db, "kategori_transaksi", id), {
          nama,
          jenis
        });
        await logActivity("update", `Memperbarui kategori transaksi ${nama}`);
      } else {
        await addDoc(collection(db, "kategori_transaksi"), {
          nama,
          jenis,
          created_at: serverTimestamp()
        });
        await logActivity("create", `Menambahkan kategori transaksi baru ${nama}`);
      }

      Swal.fire('Berhasil!', 'Kategori transaksi disimpan.', 'success');
      resetForm();
      loadKategori();
    } catch (err) {
      Swal.fire('Gagal!', 'Terjadi kesalahan saat menyimpan.', 'error');
    }
  });

  loadKategori();
}
