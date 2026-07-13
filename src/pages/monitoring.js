import { db } from "../firebase/config";
import { 
  collection, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from "firebase/firestore";
import { recordPayment, cancelPayment } from "../firebase/db";
import { formatRupiah } from "../utils/formatters";

let unsubMonitoring = null;

export function renderMonitoringPage(profile) {
  const isAdminOrBendahara = ["admin", "bendahara"].includes(profile.role);

  return `
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Monitoring Iuran Bulanan</h3>
        
        <!-- Filter Year and Dues Type -->
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div class="form-group" style="width: 220px; margin-bottom: 0;">
            <select id="mon-iuran-id" class="form-control">
              <option value="">Pilih Jenis Iuran...</option>
            </select>
          </div>
          <div class="form-group" style="width: 120px; margin-bottom: 0;">
            <select id="mon-tahun" class="form-control">
              <!-- Dynamically populated -->
            </select>
          </div>
        </div>
      </div>

      <!-- Color Legend Info -->
      <div style="display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; font-size: 0.8rem; font-weight: 500;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge status-paid"><i class="ri-check-line"></i></span>
          <span>Sudah Bayar</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge status-unpaid"><i class="ri-close-line"></i></span>
          <span>Belum Bayar</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="status-badge status-exempt"><i class="ri-subtract-line"></i></span>
          <span>Tidak Wajib (Tarif Belum Diatur)</span>
        </div>
      </div>

      <!-- 12-Month Matrix Grid Layout -->
      <div class="monitoring-grid-container">
        <!-- Names Column -->
        <div class="grid-names">
          <div class="grid-name-header">Nama Warga</div>
          <div id="grid-warga-names-list" class="grid-rows">
            <!-- Populated via Javascript -->
          </div>
        </div>
        
        <!-- Scrollable Months Grid -->
        <div class="grid-scroll-area">
          <div class="grid-months-header">
            <div class="grid-month-header-cell">Jan</div>
            <div class="grid-month-header-cell">Feb</div>
            <div class="grid-month-header-cell">Mar</div>
            <div class="grid-month-header-cell">Apr</div>
            <div class="grid-month-header-cell">Mei</div>
            <div class="grid-month-header-cell">Jun</div>
            <div class="grid-month-header-cell">Jul</div>
            <div class="grid-month-header-cell">Ags</div>
            <div class="grid-month-header-cell">Sep</div>
            <div class="grid-month-header-cell">Okt</div>
            <div class="grid-month-header-cell">Nov</div>
            <div class="grid-month-header-cell">Des</div>
          </div>
          <div id="grid-months-cells-rows" class="grid-rows">
            <!-- Populated via Javascript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Matrix Cell Action Modal -->
    <div id="mon-action-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 style="font-weight: 700;">Detail Pembayaran</h3>
          <button id="modal-mon-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Warga</span>
            <strong id="mon-modal-warga-name">-</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Jenis Iuran</span>
            <strong id="mon-modal-iuran-name">-</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Periode</span>
            <strong id="mon-modal-period">-</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--surface-variant); padding-bottom: 12px;">
            <span style="color: var(--on-surface-variant);">Nominal Tarif</span>
            <strong id="mon-modal-nominal" style="color: var(--primary); font-size: 1.05rem;">-</strong>
          </div>
          
          <!-- Payment Info Status -->
          <div id="mon-modal-status-info" style="display: none;">
            <div style="display: flex; justify-content: space-between; margin-top: 8px;">
              <span style="color: var(--on-surface-variant);">Status</span>
              <span style="color: var(--success); font-weight: bold;"><i class="ri-checkbox-circle-fill"></i> Sudah Dibayar</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 8px;">
              <span style="color: var(--on-surface-variant);">Tanggal Bayar</span>
              <span id="mon-modal-pay-date" style="font-weight: 500;">-</span>
            </div>
          </div>
        </div>
        <div class="modal-footer" id="mon-modal-footer-actions">
          <!-- Dynamically populated action buttons -->
        </div>
      </div>
    </div>
  `;
}

export async function initMonitoringPage(profile) {
  const iuranSelect = document.getElementById("mon-iuran-id");
  const tahunSelect = document.getElementById("mon-tahun");
  const namesContainer = document.getElementById("grid-warga-names-list");
  const cellsContainer = document.getElementById("grid-months-cells-rows");
  const modal = document.getElementById("mon-action-modal");
  const closeModalBtn = document.getElementById("modal-mon-close");

  const isAdminOrBendahara = ["admin", "bendahara"].includes(profile.role);

  let wargasList = [];
  let iuransList = [];
  let customRates = {}; // key: wargaId_iuranId -> nominal
  let activeIuranId = "";
  let activeTahun = new Date().getFullYear();

  closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));

  // Fetch static resources: Dues type, Warga list, Custom rates
  async function loadResources() {
    // 1. Fetch Dues
    const dSnap = await getDocs(query(collection(db, "iuran"), orderBy("nama")));
    iuransList = [];
    let dHtml = `<option value="">Pilih Jenis Iuran...</option>`;
    dSnap.forEach(doc => {
      const d = doc.data();
      iuransList.push({ id: doc.id, ...d });
      if (d.is_aktif) {
        dHtml += `<option value="${doc.id}">${d.nama}</option>`;
      }
    });
    iuranSelect.innerHTML = dHtml;
    
    // Select first due by default
    const activeDue = iuransList.find(x => x.is_aktif);
    if (activeDue) {
      iuranSelect.value = activeDue.id;
      activeIuranId = activeDue.id;
    }

    // 2. Fetch Citizens (Warga)
    const wSnap = await getDocs(query(collection(db, "warga"), where("status", "==", "aktif")));
    wargasList = [];
    wSnap.forEach(doc => {
      wargasList.push({ id: doc.id, ...doc.data() });
    });
    wargasList.sort((a, b) => (a.nama || "").localeCompare(b.nama || ""));

    // 3. Fetch Custom Dues Rates
    const rSnap = await getDocs(collection(db, "iuran_warga"));
    customRates = {};
    rSnap.forEach(doc => {
      const r = doc.data();
      customRates[`${r.warga_id}_${r.iuran_id}`] = r.nominal;
    });

    // 4. Fetch unique years from payments database to make years filter fully dynamic
    const pSnap = await getDocs(collection(db, "pembayaran_iuran"));
    const yearsSet = new Set();
    yearsSet.add(new Date().getFullYear()); // Always include current year
    pSnap.forEach(doc => {
      const p = doc.data();
      if (p.tahun) {
        yearsSet.add(Number(p.tahun));
      }
    });
    const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
    let yearsHtml = "";
    sortedYears.forEach(y => {
      yearsHtml += `<option value="${y}" ${y === activeTahun ? 'selected' : ''}>${y}</option>`;
    });
    tahunSelect.innerHTML = yearsHtml;

    setupRealtimePaymentsListener();
  }

  // Set up real-time listener for pembayaran_iuran
  function setupRealtimePaymentsListener() {
    if (unsubMonitoring) {
      unsubMonitoring();
      unsubMonitoring = null;
    }

    if (!activeIuranId) {
      namesContainer.innerHTML = "";
      cellsContainer.innerHTML = "";
      return;
    }

    const payRef = collection(db, "pembayaran_iuran");
    const q = query(
      payRef, 
      where("iuran_id", "==", activeIuranId), 
      where("tahun", "==", Number(activeTahun))
    );

    unsubMonitoring = onSnapshot(q, (snapshot) => {
      const paymentsMap = {}; // key: wargaId_month
      snapshot.forEach(doc => {
        const p = doc.data();
        paymentsMap[`${p.warga_id}_${p.bulan}`] = { id: doc.id, ...p };
      });
      renderGrid(paymentsMap);
    }, (error) => {
      console.error("Realtime payments error:", error);
    });
  }

  // Render Grid rows
  function renderGrid(paymentsMap) {
    // 1. Render names list
    namesContainer.innerHTML = wargasList.map(w => `
      <div class="grid-name-cell" title="${w.nama}">${w.nama}</div>
    `).join('');

    // 2. Render cells matrix
    let cellsRowsHtml = "";
    wargasList.forEach(w => {
      let rowHtml = `<div class="grid-row">`;
      
      const rate = customRates[`${w.id}_${activeIuranId}`]; // custom nominal
      const hasCustomRate = rate !== undefined;

      // 12 months loop
      for (let m = 1; m <= 12; m++) {
        const payment = paymentsMap[`${w.id}_${m}`];
        const isPaid = !!payment;
        
        let cellClass = "status-exempt";
        let cellIcon = "ri-subtract-line";

        if (isPaid) {
          cellClass = "status-paid";
          cellIcon = "ri-check-line";
        } else if (hasCustomRate) {
          cellClass = "status-unpaid";
          cellIcon = "ri-close-line";
        }

        rowHtml += `
          <div class="grid-cell select-cell-btn" 
               data-warga-id="${w.id}" 
               data-warga-nama="${w.nama}"
               data-bulan="${m}" 
               data-paid="${isPaid}"
               data-payment-id="${isPaid ? payment.id : ''}"
               data-pay-date="${isPaid && payment.created_at ? new Date(payment.created_at.seconds * 1000).toLocaleDateString('id-ID') : ''}"
               data-rate-nominal="${hasCustomRate ? rate : '0'}">
            <span class="status-badge ${cellClass}">
              <i class="${cellIcon}"></i>
            </span>
          </div>
        `;
      }

      rowHtml += `</div>`;
      cellsRowsHtml += rowHtml;
    });

    cellsContainer.innerHTML = cellsRowsHtml;

    // Attach click listeners to cells
    document.querySelectorAll(".select-cell-btn").forEach(cell => {
      cell.addEventListener("click", () => openCellActionModal(cell));
    });
  }

  function openCellActionModal(cell) {
    const wargaId = cell.dataset.wargaId;
    const wargaNama = cell.dataset.wargaNama;
    const bulan = Number(cell.dataset.bulan);
    const isPaid = cell.dataset.paid === "true";
    const paymentId = cell.dataset.paymentId;
    const payDate = cell.dataset.payDate;
    const rateNominal = Number(cell.dataset.rateNominal);

    const monthNames = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const iuranName = iuransList.find(x => x.id === activeIuranId)?.nama || "Iuran";

    document.getElementById("mon-modal-warga-name").innerText = wargaNama;
    document.getElementById("mon-modal-iuran-name").innerText = iuranName;
    document.getElementById("mon-modal-period").innerText = `${monthNames[bulan]} ${activeTahun}`;
    
    const rateEl = document.getElementById("mon-modal-nominal");
    const statusInfo = document.getElementById("mon-modal-status-info");
    const payDateEl = document.getElementById("mon-modal-pay-date");
    const footerActions = document.getElementById("mon-modal-footer-actions");

    if (rateNominal > 0) {
      rateEl.innerText = formatRupiah(rateNominal);
    } else {
      rateEl.innerText = "Belum Diatur (Bukan Wajib Iuran)";
    }

    if (isPaid) {
      statusInfo.style.display = "block";
      payDateEl.innerText = payDate;

      if (isAdminOrBendahara) {
        footerActions.innerHTML = `
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')">Batal</button>
          <button type="button" id="btn-cancel-pay" class="btn btn-danger">
            <i class="ri-delete-bin-line"></i> Batalkan Pembayaran
          </button>
        `;
      } else {
        footerActions.innerHTML = `
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')" style="width: 100%;">Tutup</button>
        `;
      }
    } else {
      statusInfo.style.display = "none";

      if (rateNominal === 0) {
        footerActions.innerHTML = `
          <p style="font-size: 0.8rem; color: var(--error); font-weight: 500; text-align: center; width: 100%;">
            Tarif warga belum diatur. Silakan atur tarif kustom di menu "Master & Tarif Iuran" terlebih dahulu.
          </p>
        `;
      } else if (isAdminOrBendahara) {
        footerActions.innerHTML = `
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')">Batal</button>
          <button type="button" id="btn-submit-pay" class="btn btn-primary">
            <i class="ri-wallet-3-line"></i> Bayar Sekarang
          </button>
        `;
      } else {
        footerActions.innerHTML = `
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('mon-action-modal').classList.remove('show')" style="width: 100%;">Tutup</button>
        `;
      }
    }

    modal.classList.add("show");

    // Click triggers
    const cancelPayBtn = document.getElementById("btn-cancel-pay");
    if (cancelPayBtn) {
      cancelPayBtn.addEventListener("click", async () => {
        modal.classList.remove("show");
        const confirm = await Swal.fire({
          title: 'Batalkan Pembayaran?',
          text: `Pembayaran iuran ${wargaNama} akan dibatalkan, dan transaksi kas terkait akan dihapus.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'var(--error)'
        });

        if (confirm.isConfirmed) {
          Swal.fire({ title: 'Membatalkan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
          try {
            await cancelPayment(paymentId);
            Swal.fire("Berhasil", "Pembayaran telah dibatalkan & kas di-rollback.", "success");
          } catch (e) {
            Swal.fire("Gagal", e.message || "Gagal membatalkan pembayaran.", "error");
          }
        }
      });
    }

    const submitPayBtn = document.getElementById("btn-submit-pay");
    if (submitPayBtn) {
      submitPayBtn.addEventListener("click", async () => {
        modal.classList.remove("show");
        Swal.fire({ title: 'Mencatat Pembayaran...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
        try {
          const matchedDue = iuransList.find(x => x.id === activeIuranId);
          await recordPayment(
            wargaId, 
            activeIuranId, 
            bulan, 
            activeTahun, 
            rateNominal, 
            matchedDue.kategori_id,
            matchedDue.nama, 
            wargaNama
          );
          Swal.fire("Sukses", `Pembayaran iuran ${wargaNama} telah dicatat.`, "success");
        } catch (e) {
          Swal.fire("Gagal", e.message || "Gagal mencatat pembayaran.", "error");
        }
      });
    }
  }

  // Filter triggers
  iuranSelect.addEventListener("change", (e) => {
    activeIuranId = e.target.value;
    setupRealtimePaymentsListener();
  });

  tahunSelect.addEventListener("change", (e) => {
    activeTahun = e.target.value;
    setupRealtimePaymentsListener();
  });

  // Load resources
  await loadResources();
}
