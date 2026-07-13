import { db } from "../firebase/config";
import { 
  collection, 
  doc,
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot, 
  getDocs 
} from "firebase/firestore";
import { formatRupiah, formatDate } from "../utils/formatters";
import { Chart, registerables } from "chart.js";

// Register all Chart.js components
Chart.register(...registerables);

let unsubscribeDashboard = null;
let currentChart = null;

export function renderDashboardPage(profile) {
  const isWargaRole = profile.role === "warga";

  if (isWargaRole) {
    return renderWargaDashboard(profile);
  } else {
    return renderAdminDashboard(profile);
  }
}

// ----------------------------------------------------
// ADMIN & BENDAHARA & RT DASHBOARD
// ----------------------------------------------------
function renderAdminDashboard(profile) {
  const isReadOnly = profile.role === "rt";
  
  return `
    <!-- Top Summary Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; width: 100%;">
      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--primary);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: var(--primary-container); color: var(--primary); display: flex; align-items: center; justify-content: center;">
          <i class="ri-wallet-3-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Saldo Kas RT</p>
          <h3 id="dash-saldo" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">Rp 0</h3>
        </div>
      </div>
      
      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--success);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: rgba(34, 197, 94, 0.15); color: var(--success); display: flex; align-items: center; justify-content: center;">
          <i class="ri-arrow-left-down-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Pemasukan</p>
          <h3 id="dash-pemasukan" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">Rp 0</h3>
        </div>
      </div>

      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--error);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: rgba(239, 68, 68, 0.15); color: var(--error); display: flex; align-items: center; justify-content: center;">
          <i class="ri-arrow-right-up-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Pengeluaran</p>
          <h3 id="dash-pengeluaran" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">Rp 0</h3>
        </div>
      </div>

      <div class="card" style="display: flex; align-items: center; gap: 16px; border-left: 5px solid var(--warning);">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background-color: rgba(245, 158, 11, 0.15); color: var(--warning); display: flex; align-items: center; justify-content: center;">
          <i class="ri-group-line" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <p style="font-size: 0.8rem; color: var(--on-surface-variant); font-weight: 500;">Jumlah Warga</p>
          <h3 id="dash-warga" style="font-size: 1.3rem; font-weight: 700; margin-top: 4px;">0 Orang</h3>
        </div>
      </div>
    </div>

    <!-- Quick Shortcuts -->
    ${!isReadOnly ? `
    <div class="card" style="padding: 16px;">
      <p style="font-size: 0.85rem; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 12px;">Pintasan Cepat</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <a href="#/transaksi" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-add-line"></i> Catat Transaksi
        </a>
        <a href="#/monitoring" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-calendar-check-line"></i> Bayar Iuran
        </a>
        <a href="#/warga" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-user-add-line"></i> Tambah Warga
        </a>
        <a href="#/laporan" class="btn btn-secondary" style="border-radius: var(--radius-md); font-size: 0.8rem; padding: 8px 16px;">
          <i class="ri-file-chart-line"></i> Cetak Laporan
        </a>
      </div>
    </div>
    ` : ''}

    <!-- Chart & Recent Activities Row -->
    <div class="grid-2col-2-1">
      <!-- Chart Card -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h4 class="card-title" style="margin-bottom: 0;">Grafik Kas Bulanan</h4>
          <span id="chart-year-label" style="font-size: 0.85rem; font-weight: 600; color: var(--primary);">Tahun ${new Date().getFullYear()}</span>
        </div>
        <div style="position: relative; height: 300px; width: 100%;">
          <canvas id="cashflowChart"></canvas>
        </div>
      </div>

      <!-- Recent Transactions / Activities -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Last Transactions -->
        <div class="card" style="flex: 1; display: flex; flex-direction: column;">
          <h4 class="card-title">Transaksi Terakhir</h4>
          <div id="dash-recent-transactions" style="display: flex; flex-direction: column; gap: 12px; flex: 1; overflow-y: auto; max-height: 280px;">
            <p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center;">Memuat transaksi...</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// WARGA DASHBOARD
// ----------------------------------------------------
function renderWargaDashboard(profile) {
  if (!profile || !profile.warga_id) {
    return `
      <div class="card" style="width: 100%; text-align: center; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
        <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background-color: rgba(245, 158, 11, 0.15); color: var(--warning); display: flex; align-items: center; justify-content: center;">
          <i class="ri-error-warning-line" style="font-size: 2.5rem;"></i>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--on-background);">Akun Belum Dihubungkan</h3>
        <p style="color: var(--on-surface-variant); font-size: 0.9rem; max-width: 420px; line-height: 1.5; margin: 0;">
          Akun login Anda belum ditautkan dengan data profil warga oleh Administrator. Silakan hubungi RT untuk menghubungkan data Anda agar tagihan iuran dapat muncul di sini.
        </p>
      </div>
    `;
  }

  return `
    <div class="warga-grid">
      <!-- Profile Card -->
      <div class="card" style="display: flex; flex-direction: column; gap: 16px;">
        <div style="text-align: center; border-bottom: 1px solid var(--surface-variant); padding-bottom: 20px;">
          <div style="width: 80px; height: 80px; border-radius: var(--radius-full); background-color: var(--primary-container); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; margin-bottom: 12px;">
            ${profile.nama_lengkap.charAt(0).toUpperCase()}
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700;">${profile.nama_lengkap}</h3>
          <p style="font-size: 0.75rem; color: var(--primary); font-weight: 600; text-transform: uppercase; margin-top: 4px;">WARGA RT</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Nomor Kamar</span>
            <span id="warga-no-kamar" style="font-weight: 600;">-</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Status Tinggal</span>
            <span id="warga-status-tinggal" style="font-weight: 600; text-transform: capitalize;">-</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--on-surface-variant);">Alamat</span>
            <span id="warga-alamat" style="font-weight: 600; text-align: right; max-width: 150px;">-</span>
          </div>
        </div>
      </div>

      <!-- Financial & Bills summary -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Summary cards -->
        <div class="warga-summary-grid">
          <div class="card" style="border-left: 5px solid var(--error); padding: 16px 20px;">
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Tagihan Bulan Ini</p>
            <h3 id="warga-bills-active" style="font-size: 1.25rem; font-weight: 700; margin-top: 4px; color: var(--error);">Rp 0</h3>
          </div>
          <div class="card" style="border-left: 5px solid var(--success); padding: 16px 20px;">
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Total Pembayaran Anda</p>
            <h3 id="warga-bills-paid" style="font-size: 1.25rem; font-weight: 700; margin-top: 4px; color: var(--success);">Rp 0</h3>
          </div>
        </div>

        <!-- Active Bills Detail -->
        <div class="card">
          <h4 class="card-title">Daftar Tagihan Iuran Aktif</h4>
          <div id="warga-active-bills" style="display: flex; flex-direction: column; gap: 10px; max-height: 260px; overflow-y: auto;">
            <p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center;">Memuat tagihan...</p>
          </div>
        </div>

        <!-- Payments Progress / History -->
        <div class="card" style="flex: 1;">
          <h4 class="card-title">Riwayat Pembayaran Anda</h4>
          <div id="warga-recent-payments" style="display: flex; flex-direction: column; gap: 12px; max-height: 240px; overflow-y: auto;">
            <p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center;">Memuat riwayat pembayaran...</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// INITIALIZATION AND REALTIME LISTENERS
// ----------------------------------------------------
export function initDashboardPage(profile) {
  // Clean up any old listener
  if (unsubscribeDashboard) {
    unsubscribeDashboard();
    unsubscribeDashboard = null;
  }

  const isWargaRole = profile.role === "warga";

  if (isWargaRole) {
    initWargaDashboard(profile);
  } else {
    initAdminDashboard();
  }
}

function initAdminDashboard() {
  const currentYear = new Date().getFullYear();
  let wargaCount = 0;
  
  // Realtime Resident (Warga) Count
  const wRef = collection(db, "warga");
  const qWarga = query(wRef, where("status", "==", "aktif"));
  
  const unsubWargaCount = onSnapshot(qWarga, (snap) => {
    wargaCount = snap.size;
    const wargaEl = document.getElementById("dash-warga");
    if (wargaEl) wargaEl.innerText = `${wargaCount} Warga`;
  });

  // Realtime Transactions (to calculate balance & build graphs)
  const txRef = collection(db, "transaksi");
  const qTx = query(txRef, orderBy("tanggal", "desc"));

  const unsubTransactions = onSnapshot(qTx, (snap) => {
    let totalIncome = 0;
    let totalExpense = 0;
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpense = Array(12).fill(0);
    const recentTx = [];

    snap.forEach((doc) => {
      const tx = doc.data();
      const val = Number(tx.nominal);
      const isIncome = tx.jenis === "pemasukan";

      // Sum global
      if (isIncome) {
        totalIncome += val;
      } else {
        totalExpense += val;
      }

      // Monthly aggregate for current year
      if (tx.tanggal) {
        const txDate = tx.tanggal.toDate ? tx.tanggal.toDate() : new Date(tx.tanggal);
        if (txDate.getFullYear() === currentYear) {
          const month = txDate.getMonth();
          if (isIncome) {
            monthlyIncome[month] += val;
          } else {
            monthlyExpense[month] += val;
          }
        }
      }

      // Collect top 5 recent
      if (recentTx.length < 5) {
        recentTx.push({
          id: doc.id,
          ...tx
        });
      }
    });

    const currentBalance = totalIncome - totalExpense;

    // Update Text Elements
    const saldoEl = document.getElementById("dash-saldo");
    const pemEl = document.getElementById("dash-pemasukan");
    const pengEl = document.getElementById("dash-pengeluaran");

    if (saldoEl) saldoEl.innerText = formatRupiah(currentBalance);
    if (pemEl) pemEl.innerText = formatRupiah(totalIncome);
    if (pengEl) pengEl.innerText = formatRupiah(totalExpense);

    // Render Recent Transactions
    const recentEl = document.getElementById("dash-recent-transactions");
    if (recentEl) {
      if (recentTx.length === 0) {
        recentEl.innerHTML = `<p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center; margin-top: 16px;">Belum ada transaksi.</p>`;
      } else {
        recentEl.innerHTML = recentTx.map(tx => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: var(--radius-md); background-color: var(--background);">
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
              <div style="width: 32px; height: 32px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; background-color: ${tx.jenis === 'pemasukan' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${tx.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'};">
                <i class="${tx.jenis === 'pemasukan' ? 'ri-arrow-left-down-line' : 'ri-arrow-right-up-line'}"></i>
              </div>
              <div style="min-width: 0;">
                <p style="font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tx.keterangan || tx.kategori_nama}</p>
                <span style="font-size: 0.7rem; color: var(--on-surface-variant);">${formatDate(tx.tanggal)}</span>
              </div>
            </div>
            <p style="font-size: 0.85rem; font-weight: 700; color: ${tx.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'}; white-space: nowrap;">
              ${tx.jenis === 'pemasukan' ? '+' : '-'}${formatRupiah(tx.nominal)}
            </p>
          </div>
        `).join('');
      }
    }

    // Build/Update Chart
    buildChart(monthlyIncome, monthlyExpense);
  });

  // Combine Unsubscribes
  unsubscribeDashboard = () => {
    unsubWargaCount();
    unsubTransactions();
  };
}

function initWargaDashboard(profile) {
  if (!profile || !profile.warga_id) return;

  // Safe date helper to prevent sorting NaN crashes
  function getMs(val) {
    if (!val) return 0;
    if (typeof val.toDate === "function") return val.toDate().getTime();
    if (val.seconds) return val.seconds * 1000;
    return new Date(val).getTime() || 0;
  }
  
  // Realtime Warga Details
  const wargaRef = doc(db, "warga", profile.warga_id);
  const unsubWarga = onSnapshot(wargaRef, (docSnap) => {
    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const kamarEl = document.getElementById("warga-no-kamar");
        const tinggalEl = document.getElementById("warga-status-tinggal");
        const alamatEl = document.getElementById("warga-alamat");

        if (kamarEl) kamarEl.innerText = data.no_kamar || "-";
        if (tinggalEl) tinggalEl.innerText = data.status_tinggal || "-";
        if (alamatEl) alamatEl.innerText = data.alamat || "-";
      } else {
        console.warn("Warga document does not exist for ID:", profile.warga_id);
      }
    } catch (err) {
      console.error("Error rendering warga details:", err);
    }
  }, (error) => {
    console.error("onSnapshot warga profile error:", error);
  });

  // Realtime Payments of this resident
  const payRef = collection(db, "pembayaran_iuran");
  const qPay = query(payRef, where("warga_id", "==", profile.warga_id));

  const unsubPayments = onSnapshot(qPay, async (snap) => {
    try {
      let totalPaid = 0;
      const payments = [];
      
      snap.forEach((doc) => {
        const pay = doc.data();
        totalPaid += Number(pay.nominal);
        payments.push(pay);
      });

      // Sort payments client-side safely
      payments.sort((a, b) => getMs(b.created_at) - getMs(a.created_at));

      const totalPaidEl = document.getElementById("warga-bills-paid");
      if (totalPaidEl) totalPaidEl.innerText = formatRupiah(totalPaid);

      // Fetch active dues
      const duesRef = collection(db, "iuran");
      const qDues = query(duesRef, where("is_aktif", "==", true));
      const duesSnap = await getDocs(qDues);

      // Fetch custom rates
      const ratesRef = collection(db, "iuran_warga");
      const qRates = query(ratesRef, where("warga_id", "==", profile.warga_id));
      const ratesSnap = await getDocs(qRates);

      const customRates = {};
      ratesSnap.forEach(doc => {
        const r = doc.data();
        customRates[r.iuran_id] = r.nominal;
      });

      const activeDues = [];
      duesSnap.forEach(doc => {
        const d = doc.data();
        activeDues.push({
          id: doc.id,
          nama: d.nama,
          nominal: customRates[doc.id] !== undefined ? customRates[doc.id] : (d.nominal || 0),
          hari_jatuh_tempo: d.hari_jatuh_tempo || 1,
          created_at: d.created_at
        });
      });

      // Build list of all overdue unpaid bills across all months
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      const currentDay = now.getDate();
      const monthNames = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

      const allBillItems = [];
      let totalUnpaid = 0;

      activeDues.forEach(due => {
        // Determine start month: default to January of the current year,
        // or the creation month if the iuran was created in a prior year.
        let startMonth = 1;
        let startYear = currentYear;
        if (due.created_at) {
          const createdDate = typeof due.created_at.toDate === "function" 
            ? due.created_at.toDate() 
            : new Date(due.created_at.seconds ? due.created_at.seconds * 1000 : due.created_at);
          const cYear = createdDate.getFullYear();
          if (cYear < currentYear) {
            startYear = cYear;
            startMonth = createdDate.getMonth() + 1;
          }
        }

        // Iterate from start month/year to current month/year
        let y = startYear;
        let m = startMonth;
        while (y < currentYear || (y === currentYear && m <= currentMonth)) {
          // Check if this month's deadline has passed
          const isPastDeadline = (y < currentYear) || 
            (y === currentYear && m < currentMonth) || 
            (y === currentYear && m === currentMonth && currentDay >= due.hari_jatuh_tempo);

          if (isPastDeadline) {
            const hasPaid = payments.some(p => p.iuran_id === due.id && p.bulan === m && p.tahun === y);
            if (!hasPaid) {
              totalUnpaid += due.nominal;
              allBillItems.push({
                nama: due.nama,
                nominal: due.nominal,
                bulan: m,
                tahun: y,
                hasPaid: false
              });
            }
          }

          // Next month
          m++;
          if (m > 12) { m = 1; y++; }
        }
      });

      // Sort: newest unpaid first
      allBillItems.sort((a, b) => (b.tahun * 100 + b.bulan) - (a.tahun * 100 + a.bulan));

      const activeUnpaidEl = document.getElementById("warga-bills-active");
      if (activeUnpaidEl) activeUnpaidEl.innerText = formatRupiah(totalUnpaid);

      // Render active bills detail list
      const billsEl = document.getElementById("warga-active-bills");
      if (billsEl) {
        if (allBillItems.length === 0) {
          billsEl.innerHTML = `<p style="color: var(--success); font-size: 0.85rem; text-align: center; margin-top: 16px;"><i class="ri-check-double-line"></i> Semua tagihan sudah lunas. Tidak ada tunggakan.</p>`;
        } else {
          billsEl.innerHTML = allBillItems.map(bill => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: var(--radius-md); background-color: var(--background); border-left: 4px solid var(--error);">
              <div>
                <p style="font-size: 0.85rem; font-weight: 600;">${bill.nama}</p>
                <span style="font-size: 0.75rem; color: var(--on-surface-variant);">${monthNames[bill.bulan]} ${bill.tahun}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <p style="font-size: 0.85rem; font-weight: 700; color: var(--on-background);">${formatRupiah(bill.nominal)}</p>
                <span style="padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: bold; background-color: rgba(239, 68, 68, 0.15); color: var(--error);">
                  Belum Bayar
                </span>
              </div>
            </div>
          `).join('');
        }
      }

      // Render payment history list
      const historyEl = document.getElementById("warga-recent-payments");
      if (historyEl) {
        if (payments.length === 0) {
          historyEl.innerHTML = `<p style="color: var(--on-surface-variant); font-size: 0.85rem; text-align: center; margin-top: 16px;">Belum ada riwayat pembayaran.</p>`;
        } else {
          // Map iuran names for history display
          const iuranNames = {};
          duesSnap.forEach(doc => { iuranNames[doc.id] = doc.data().nama; });

          historyEl.innerHTML = payments.map(pay => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: var(--radius-md); background-color: var(--background);">
              <div>
                <p style="font-size: 0.85rem; font-weight: 600;">${iuranNames[pay.iuran_id] || 'Iuran'}</p>
                <span style="font-size: 0.75rem; color: var(--on-surface-variant);">${monthNames[pay.bulan]} ${pay.tahun}</span>
              </div>
              <p style="font-size: 0.85rem; font-weight: 700; color: var(--success);">${formatRupiah(pay.nominal)}</p>
            </div>
          `).join('');
        }
      }
    } catch (err) {
      console.error("Warga dashboard payments processing error:", err);
      const historyEl = document.getElementById("warga-recent-payments");
      if (historyEl) {
        historyEl.innerHTML = `<p style="color: var(--error); font-size: 0.85rem; text-align: center; margin-top: 16px;">Gagal memproses data: ${err.message}</p>`;
      }
    }
  }, (error) => {
    console.error("onSnapshot payments error:", error);
    const historyEl = document.getElementById("warga-recent-payments");
    if (historyEl) {
      historyEl.innerHTML = `<p style="color: var(--error); font-size: 0.85rem; text-align: center; margin-top: 16px;">Error database: ${error.message}</p>`;
    }
  });

  unsubscribeDashboard = () => {
    unsubWarga();
    unsubPayments();
  };
}

function buildChart(incomeData, expenseData) {
  const ctx = document.getElementById('cashflowChart');
  if (!ctx) return;

  if (currentChart) {
    currentChart.destroy();
  }

  currentChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      datasets: [
        {
          label: 'Pemasukan',
          data: incomeData,
          backgroundColor: '#22c55e',
          borderRadius: 4
        },
        {
          label: 'Pengeluaran',
          data: expenseData,
          backgroundColor: '#ef4444',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'Rp ' + value.toLocaleString('id-ID');
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
