import { db } from "../firebase/config";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy,
  where,
  limit
} from "firebase/firestore";
import { formatRupiah, formatDate } from "../utils/formatters";
import { getSettings } from "../firebase/db";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function renderLaporanPage() {
  return `
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Laporan Kas Keuangan</h3>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="btn-print-laporan" class="btn btn-secondary" style="padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem;">
            <i class="ri-printer-line"></i> Cetak PDF
          </button>
        </div>
      </div>

      <!-- Filters Form -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-bulan">Bulan</label>
          <select id="lap-bulan" class="form-control">
            <option value="">Semua Bulan</option>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-tahun">Tahun</label>
          <select id="lap-tahun" class="form-control">
            <!-- Dynamically populated -->
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-jenis">Jenis</label>
          <select id="lap-jenis" class="form-control">
            <option value="">Semua Jenis</option>
            <option value="pemasukan">Pemasukan (Masuk)</option>
            <option value="pengeluaran">Pengeluaran (Keluar)</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="lap-kategori">Kategori</label>
          <select id="lap-kategori" class="form-control">
            <option value="">Semua Kategori</option>
          </select>
        </div>
      </div>

      <!-- Summary Info Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--secondary-container); text-align: center;">
          <p style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600;">Pemasukan Terpilih</p>
          <h4 id="lap-sum-income" style="font-size: 1.15rem; font-weight: 700; color: var(--success); margin-top: 4px;">Rp 0</h4>
        </div>
        <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--secondary-container); text-align: center;">
          <p style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600;">Pengeluaran Terpilih</p>
          <h4 id="lap-sum-expense" style="font-size: 1.15rem; font-weight: 700; color: var(--error); margin-top: 4px;">Rp 0</h4>
        </div>
        <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--secondary-container); text-align: center;">
          <p style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600;">Saldo Periode</p>
          <h4 id="lap-sum-balance" style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-top: 4px;">Rp 0</h4>
        </div>
      </div>

      <!-- Report Print/Display Table -->
      <div class="table-responsive" id="report-print-area">
        <!-- Document Print Header (Only visible during print) -->
        <div class="print-header-only" style="display: none; text-align: center; margin-bottom: 24px; border-bottom: 2px solid #000; padding-bottom: 12px;">
          <h2 style="margin: 0; font-size: 1.6rem; font-weight: 700;">LAPORAN KEUANGAN KAS RT</h2>
          <p id="print-subheader" style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555;"></p>
        </div>

        <!-- Chart Visualization (Visible in both screen and PDF) -->
        <div id="report-chart-card" class="card" style="margin-bottom: 24px; padding: 20px; border: 1px solid var(--surface-variant); width: 100%;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--on-surface); margin-bottom: 16px; font-family: 'Poppins', sans-serif;">Grafik Perbandingan Arus Kas</h4>
          <div style="position: relative; height: 260px; width: 100%;">
            <canvas id="reportChart"></canvas>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Warga Terkait</th>
              <th>Jenis</th>
              <th style="text-align: right;">Nominal</th>
            </tr>
          </thead>
          <tbody id="laporan-table-body">
            <tr>
              <td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Memuat laporan kas...</td>
            </tr>
          </tbody>
        </table>

        <!-- Document Print Signatures (Only visible during print) -->
        <div class="print-footer-only" id="print-signatures-block" style="display: none; margin-top: 48px; justify-content: space-between; font-size: 0.95rem; font-family: 'Poppins', sans-serif;">
          <div style="text-align: center; width: 220px; display: flex; flex-direction: column; align-items: center;">
            <p style="margin: 0;">Mengetahui,</p>
            <p style="font-weight: 700; margin: 4px 0 0 0;">Ketua RT</p>
            <div style="height: 64px;"></div>
            <p style="text-decoration: underline; font-weight: 700; margin: 0;" id="print-signature-rt">-</p>
          </div>
          <div style="text-align: center; width: 220px; display: flex; flex-direction: column; align-items: center;">
            <p style="margin: 0;">&nbsp;</p>
            <p style="font-weight: 700; margin: 4px 0 0 0;">Bendahara RT</p>
            <div style="height: 64px;"></div>
            <p style="text-decoration: underline; font-weight: 700; margin: 0;" id="print-signature-bendahara">-</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function initLaporanPage() {
  const tableBody = document.getElementById("laporan-table-body");
  
  const filterBulan = document.getElementById("lap-bulan");
  const filterTahun = document.getElementById("lap-tahun");
  const filterJenis = document.getElementById("lap-jenis");
  const filterKategori = document.getElementById("lap-kategori");

  let allTransactions = [];
  let categories = [];

  // Fetch Kategori Transaksi list
  async function loadCategories() {
    const snap = await getDocs(query(collection(db, "kategori_transaksi"), orderBy("nama")));
    categories = [];
    let html = `<option value="">Semua Kategori</option>`;
    snap.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
      html += `<option value="${doc.id}">${doc.data().nama}</option>`;
    });
    filterKategori.innerHTML = html;
  }

  // Load cash transactions
  async function loadTransactions() {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Memuat transaksi...</td></tr>`;
    try {
      const snap = await getDocs(query(collection(db, "transaksi"), orderBy("tanggal", "asc")));
      allTransactions = [];
      const yearsSet = new Set();
      yearsSet.add(new Date().getFullYear()); // Always include current year as default
      snap.forEach(doc => {
        const tx = doc.data();
        allTransactions.push({ id: doc.id, ...tx });
        if (tx.tanggal) {
          const d = tx.tanggal.toDate ? tx.tanggal.toDate() : new Date(tx.tanggal);
          yearsSet.add(d.getFullYear());
        }
      });

      // Populate year options dynamically based on actual database years
      const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
      let yearsHtml = `<option value="">Semua Tahun</option>`;
      const curYear = new Date().getFullYear();
      sortedYears.forEach(y => {
        yearsHtml += `<option value="${y}" ${y === curYear ? 'selected' : ''}>${y}</option>`;
      });
      filterTahun.innerHTML = yearsHtml;

      renderReport();
    } catch (e) {
      console.error(e);
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--error);">Gagal memuat data laporan keuangan.</td></tr>`;
    }
  }

  // Filter and display report data
  function renderReport() {
    const bVal = filterBulan.value !== "" ? Number(filterBulan.value) : null;
    const tVal = filterTahun.value !== "" ? Number(filterTahun.value) : null;
    const jVal = filterJenis.value;
    const kVal = filterKategori.value;

    const filtered = allTransactions.filter(tx => {
      if (!tx.tanggal) return false;
      const date = tx.tanggal.toDate ? tx.tanggal.toDate() : new Date(tx.tanggal);
      
      const matchMonth = bVal === null || (date.getMonth() + 1) === bVal;
      const matchYear = tVal === null || date.getFullYear() === tVal;
      const matchJenis = jVal === "" || tx.jenis === jVal;
      const matchKategori = kVal === "" || tx.kategori_id === kVal;

      return matchMonth && matchYear && matchJenis && matchKategori;
    });

    let totalIncome = 0;
    let totalExpense = 0;

    filtered.forEach(tx => {
      if (tx.jenis === "pemasukan") {
        totalIncome += Number(tx.nominal);
      } else {
        totalExpense += Number(tx.nominal);
      }
    });

    // Update summaries
    document.getElementById("lap-sum-income").innerText = formatRupiah(totalIncome);
    document.getElementById("lap-sum-expense").innerText = formatRupiah(totalExpense);
    document.getElementById("lap-sum-balance").innerText = formatRupiah(totalIncome - totalExpense);

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Tidak ada data kas ditemukan untuk filter terpilih.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(tx => `
      <tr>
        <td>${formatDate(tx.tanggal)}</td>
        <td style="font-weight: 600;">${tx.kategori_nama}</td>
        <td>${tx.keterangan || "-"}</td>
        <td>${tx.warga_nama_terkait || "-"}</td>
        <td>
          <span style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: ${tx.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'};">
            ${tx.jenis}
          </span>
        </td>
        <td style="text-align: right; font-weight: 700; color: ${tx.jenis === 'pemasukan' ? 'var(--success)' : 'var(--error)'};">
          ${formatRupiah(tx.nominal)}
        </td>
      </tr>
    `).join('') + `
      <tr style="background-color: var(--secondary-container); font-weight: bold;">
        <td colspan="5" style="text-align: right; font-size: 0.95rem;">TOTAL PEMASUKAN:</td>
        <td style="text-align: right; color: var(--success); font-size: 0.95rem;">${formatRupiah(totalIncome)}</td>
      </tr>
      <tr style="background-color: var(--secondary-container); font-weight: bold;">
        <td colspan="5" style="text-align: right; font-size: 0.95rem;">TOTAL PENGELUARAN:</td>
        <td style="text-align: right; color: var(--error); font-size: 0.95rem;">${formatRupiah(totalExpense)}</td>
      </tr>
      <tr style="background-color: var(--primary-container); color: var(--on-primary-container); font-weight: 700;">
        <td colspan="5" style="text-align: right; font-size: 1rem;">SALDO AKHIR PERIODE:</td>
        <td style="text-align: right; font-size: 1rem;">${formatRupiah(totalIncome - totalExpense)}</td>
      </tr>
    `;

    renderLaporanChart(filtered, tVal, bVal);
  }

  // Bind filter events
  filterBulan.addEventListener("change", renderReport);
  filterTahun.addEventListener("change", renderReport);
  filterJenis.addEventListener("change", renderReport);
  filterKategori.addEventListener("change", renderReport);

  // Print PDF trigger
  document.getElementById("btn-print-laporan").addEventListener("click", async () => {
    Swal.fire({ title: 'Menyiapkan PDF...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
      // 1. Fetch Ketua RT name from settings
      const settings = await getSettings();
      const ketuaName = settings.ketua || "Ketua RT";
      document.getElementById("print-signature-rt").innerText = ketuaName;

      // 2. Fetch Bendahara name from users database
      let bendaharaName = "Bendahara RT";
      try {
        const usersRef = collection(db, "users");
        const qBendahara = query(usersRef, where("role", "==", "bendahara"), limit(1));
        const bendaharaSnap = await getDocs(qBendahara);
        if (!bendaharaSnap.empty) {
          bendaharaName = bendaharaSnap.docs[0].data().nama_lengkap;
        }
      } catch (err) {
        console.warn("Failed to fetch bendahara user name:", err);
      }
      document.getElementById("print-signature-bendahara").innerText = bendaharaName;

      const monthName = filterBulan.value !== "" ? filterBulan.options[filterBulan.selectedIndex].text : "Semua Bulan";
      const yearName = filterTahun.value !== "" ? filterTahun.value : "Semua Tahun";
      document.getElementById("print-subheader").innerText = `Periode: ${monthName} ${yearName} (${settings.nama_rt || "RT"})`;

      Swal.close();

      // Add Print specific styles
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          /* 1. Reset body and backgrounds for printing */
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: 'Poppins', 'Segoe UI', Arial, sans-serif !important;
          }
          
          /* 2. Hide UI control elements completely */
          .sidebar, 
          .topbar, 
          .bottom-nav, 
          .theme-switch, 
          .card-title,
          .form-group, 
          #btn-export-laporan-excel, 
          #btn-print-laporan,
          button,
          .btn,
          header {
            display: none !important;
          }

          /* 3. Make main report containers span full page width */
          .app-container {
            display: block !important;
            min-height: auto !important;
          }

          .main-content {
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
          }

          .card {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            background: transparent !important;
          }

          /* 4. Table printing styles */
          .table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 24px !important;
            color: #000000 !important;
          }
          .table th, .table td {
            border: 1px solid #000000 !important;
            padding: 8px 10px !important;
            font-size: 0.8rem !important;
            color: #000000 !important;
          }
          .table th {
            background-color: #f1f5f9 !important;
            font-weight: 700 !important;
          }

          /* 5. Show print-only elements */
          .print-header-only {
            display: block !important;
            margin-bottom: 24px !important;
          }
          .print-footer-only {
            display: flex !important;
            margin-top: 40px !important;
          }
        }
      `;
      document.head.appendChild(style);
      window.print();
      document.head.removeChild(style);
    } catch (e) {
      Swal.fire("Gagal", "Gagal memproses cetak PDF: " + e.message, "error");
    }
  });



  let reportChartInstance = null;

  function renderLaporanChart(filteredTransactions, yearSelected, monthSelected) {
    const ctx = document.getElementById("reportChart");
    if (!ctx) return;

    if (reportChartInstance) {
      reportChartInstance.destroy();
    }

    let labels = [];
    let incomeData = [];
    let expenseData = [];

    if (monthSelected === null) {
      // Show 12 months comparison
      labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
      incomeData = Array(12).fill(0);
      expenseData = Array(12).fill(0);

      filteredTransactions.forEach(tx => {
        if (!tx.tanggal) return;
        const date = tx.tanggal.toDate ? tx.tanggal.toDate() : new Date(tx.tanggal);
        const m = date.getMonth();
        if (tx.jenis === "pemasukan") {
          incomeData[m] += Number(tx.nominal);
        } else {
          expenseData[m] += Number(tx.nominal);
        }
      });
    } else {
      // Show single month comparison
      const monthNames = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      labels = [monthNames[monthSelected]];
      let income = 0;
      let expense = 0;
      filteredTransactions.forEach(tx => {
        if (tx.jenis === "pemasukan") income += Number(tx.nominal);
        else expense += Number(tx.nominal);
      });
      incomeData = [income];
      expenseData = [expense];
    }

    reportChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pemasukan',
            data: incomeData,
            backgroundColor: '#22c55e',
            borderRadius: 6
          },
          {
            label: 'Pengeluaran',
            data: expenseData,
            backgroundColor: '#ef4444',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { family: 'Poppins', size: 11 }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: 'Poppins', size: 10 }
            }
          },
          x: {
            ticks: {
              font: { family: 'Poppins', size: 10 }
            }
          }
        }
      }
    });
  }

  // Initial load calls
  await loadCategories();
  await loadTransactions();
}
