import { db } from "../firebase/config";
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { formatRupiah, formatDate, formatDateInput } from "../utils/formatters";
import { logActivity } from "../firebase/db";

export function renderTransaksiPage(profile) {
  const isAdminOrBendahara = ["admin", "bendahara"].includes(profile.role);

  return `
    <div class="${isAdminOrBendahara ? 'grid-2col-1-2' : ''}" style="width: 100%; gap: 24px; ${!isAdminOrBendahara ? 'display: block;' : ''}">
      <!-- Left Column: Add Transaction (Admin & Bendahara only) -->
      ${isAdminOrBendahara ? `
      <div class="card" style="height: fit-content;">
        <h4 class="card-title">Catat Transaksi Kas</h4>
        <form id="transaksi-form">
          <div class="form-group">
            <label class="form-label" for="tx-tanggal">Tanggal Transaksi</label>
            <input type="date" id="tx-tanggal" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-jenis">Jenis Kas</label>
            <select id="tx-jenis" class="form-control" required>
              <option value="pemasukan">Pemasukan (Masuk)</option>
              <option value="pengeluaran">Pengeluaran (Keluar)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-kategori">Kategori</label>
            <select id="tx-kategori" class="form-control" required>
              <option value="">Pilih Kategori...</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-nominal">Nominal (Rp)</label>
            <input type="number" id="tx-nominal" class="form-control" min="0" required placeholder="Contoh: 150000">
          </div>
          <div class="form-group">
            <label class="form-label" for="tx-keterangan">Keterangan</label>
            <input type="text" id="tx-keterangan" class="form-control" placeholder="Tulis rincian transaksi...">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Simpan Transaksi</button>
        </form>
      </div>
      ` : ''}

      <!-- Right Column: Transactions List History -->
      <div class="card">
        <h4 class="card-title">Riwayat Transaksi Kas</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Keterangan / Kategori</th>
                <th>Jenis</th>
                <th>Nominal</th>
                ${isAdminOrBendahara ? `<th style="text-align: right;">Aksi</th>` : ''}
              </tr>
            </thead>
            <tbody id="transaksi-table-body">
              <tr>
                <td colspan="${isAdminOrBendahara ? 5 : 4}" style="text-align: center;">Memuat transaksi...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function initTransaksiPage(profile) {
  const tableBody = document.getElementById("transaksi-table-body");
  const isAdminOrBendahara = ["admin", "bendahara"].includes(profile.role);

  let transactionsList = [];
  let categories = [];

  // Populate dynamic category selector
  async function loadCategories() {
    if (!isAdminOrBendahara) return;
    const snap = await getDocs(query(collection(db, "kategori_transaksi"), orderBy("nama")));
    categories = [];
    snap.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    
    updateCategoryOptions();
  }

  function updateCategoryOptions() {
    const jenis = document.getElementById("tx-jenis").value;
    const select = document.getElementById("tx-kategori");
    if (!select) return;

    const filtered = categories.filter(c => c.jenis === jenis);
    let html = `<option value="">Pilih Kategori...</option>`;
    filtered.forEach(c => {
      html += `<option value="${c.id}">${c.nama}</option>`;
    });
    select.innerHTML = html;
  }

  // Load transactions
  async function loadTransactions() {
    tableBody.innerHTML = `<tr><td colspan="${isAdminOrBendahara ? 6 : 5}" style="text-align: center;">Memuat transaksi...</td></tr>`;
    try {
      const snap = await getDocs(query(collection(db, "transaksi"), orderBy("tanggal", "desc")));
      transactionsList = [];
      snap.forEach(doc => {
        transactionsList.push({ id: doc.id, ...doc.data() });
      });
      renderTable();
    } catch (e) {
      console.error(e);
      tableBody.innerHTML = `<tr><td colspan="${isAdminOrBendahara ? 6 : 5}" style="text-align: center; color: var(--error);">Gagal memuat transaksi.</td></tr>`;
    }
  }

  function renderTable() {
    if (transactionsList.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="${isAdminOrBendahara ? 6 : 5}" style="text-align: center; color: var(--on-surface-variant);">Belum ada transaksi dicatat.</td></tr>`;
      return;
    }

    tableBody.innerHTML = transactionsList.map(tx => `
      <tr>
        <td>${formatDate(tx.tanggal)}</td>
        <td>
          <p style="font-weight: 600; margin: 0;">${tx.keterangan || "-"}</p>
          <span style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 500;">Kategori: ${tx.kategori_nama}</span>
        </td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${tx.jenis === 'pemasukan' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${tx.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'}; text-transform: capitalize;">
            ${tx.jenis}
          </span>
        </td>
        <td style="font-weight: 700; color: ${tx.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'};">
          ${tx.jenis === 'pemasukan' ? '+' : '-'}${formatRupiah(tx.nominal)}
        </td>
        ${isAdminOrBendahara ? `
          <td style="text-align: right;">
            <button class="btn btn-danger delete-tx-btn" data-id="${tx.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        ` : ''}
      </tr>
    `).join('');

    if (isAdminOrBendahara) {
      document.querySelectorAll(".delete-tx-btn").forEach(btn => {
        btn.addEventListener("click", () => deleteConfirm(btn.dataset.id));
      });
    }
  }

  async function deleteConfirm(id) {
    const tx = transactionsList.find(x => x.id === id);
    if (!tx) return;

    const confirm = await Swal.fire({
      title: 'Hapus Transaksi?',
      text: `Apakah Anda yakin ingin menghapus transaksi "${tx.keterangan || tx.kategori_nama}"? Ini akan mengurangi saldo kas.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)'
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDoc(doc(db, "transaksi", id));
        await logActivity("delete", `Menghapus transaksi kas: ${tx.keterangan || tx.kategori_nama}`);
        Swal.fire("Terhapus", "Transaksi kas berhasil dihapus.", "success");
        loadTransactions();
      } catch (e) {
        Swal.fire("Gagal", "Gagal menghapus transaksi.", "error");
      }
    }
  }

  // Handle Form submit (Add new transaction)
  if (isAdminOrBendahara) {
    const form = document.getElementById("transaksi-form");
    const dateInput = document.getElementById("tx-tanggal");
    const jenisSelect = document.getElementById("tx-jenis");

    // Set default date input value to today
    dateInput.value = formatDateInput(new Date());

    // Category options change based on Pemasukan / Pengeluaran selection
    jenisSelect.addEventListener("change", updateCategoryOptions);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const tanggalVal = new Date(dateInput.value);
      const jenis = jenisSelect.value;
      const kategoriId = document.getElementById("tx-kategori").value;
      const nominal = Number(document.getElementById("tx-nominal").value);
      const keterangan = document.getElementById("tx-keterangan").value.trim();

      if (nominal < 0) {
        Swal.fire("Peringatan", "Nominal transaksi tidak boleh minus atau kurang dari 0.", "warning");
        return;
      }

      const categoryName = categories.find(c => c.id === kategoriId)?.nama || "";

      Swal.fire({ title: 'Menyimpan Transaksi...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

      try {
        // Save transaction doc
        await addDoc(collection(db, "transaksi"), {
          tanggal: tanggalVal,
          kategori_id: kategoriId,
          kategori_nama: categoryName,
          jenis,
          nominal,
          keterangan,
          user_id_penginput: profile.uid || "",
          user_nama_penginput: profile.nama_lengkap || "System",
          created_at: serverTimestamp()
        });

        await logActivity("create", `Mencatat transaksi kas baru: ${keterangan || categoryName} (${jenis})`);

        Swal.fire("Sukses", "Transaksi kas berhasil disimpan.", "success");
        form.reset();
        dateInput.value = formatDateInput(new Date());
        updateCategoryOptions();
        loadTransactions();
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal", "Gagal menyimpan transaksi.", "error");
      }
    });
  }

  // Initial load calls
  await loadCategories();
  await loadTransactions();
}
