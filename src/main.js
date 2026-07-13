import { subscribeToAuth, logoutUser, updateCurrentUserPassword } from "./firebase/auth";
import { getSettings } from "./firebase/db";
import "./styles/variables.css";
import "./styles/main.css";

// Layout components
import { renderNavbar } from "./components/navbar";
import { renderSidebar } from "./components/sidebar";
import { renderBottomNav } from "./components/bottom-nav";

// Page modules
import { renderLoginPage, initLoginPage } from "./pages/login";
import { renderDashboardPage, initDashboardPage } from "./pages/dashboard";
import { renderUsersPage, initUsersPage } from "./pages/users";
import { renderWargaPage, initWargaPage } from "./pages/warga";
import { renderKategoriPage, initKategoriPage } from "./pages/kategori";
import { renderTransaksiPage, initTransaksiPage } from "./pages/transaksi";
import { renderIuranPage, initIuranPage } from "./pages/iuran";
import { renderMonitoringPage, initMonitoringPage } from "./pages/monitoring";
import { renderLaporanPage, initLaporanPage } from "./pages/laporan";
import { renderPengaturanPage, initPengaturanPage } from "./pages/pengaturan";
import { renderBackupPage, initBackupPage } from "./pages/backup";

// Route registry containing views, initializers, roles, and header titles
const routes = {
  login: { render: renderLoginPage, init: initLoginPage, title: "Masuk", requireAuth: false },
  dashboard: { render: renderDashboardPage, init: initDashboardPage, title: "Dashboard", requireAuth: true, roles: ["admin", "bendahara", "rt", "warga"] },
  users: { render: renderUsersPage, init: initUsersPage, title: "User Management", requireAuth: true, roles: ["admin"] },
  warga: { render: renderWargaPage, init: initWargaPage, title: "Data Warga", requireAuth: true, roles: ["admin", "bendahara", "rt"] },
  kategori: { render: renderKategoriPage, init: initKategoriPage, title: "Kategori Transaksi", requireAuth: true, roles: ["admin", "bendahara"] },
  transaksi: { render: renderTransaksiPage, init: initTransaksiPage, title: "Transaksi Kas Keuangan", requireAuth: true, roles: ["admin", "bendahara", "rt"] },
  iuran: { render: renderIuranPage, init: initIuranPage, title: "Pengaturan Master & Tarif Iuran", requireAuth: true, roles: ["admin", "bendahara"] },
  monitoring: { render: renderMonitoringPage, init: initMonitoringPage, title: "Monitoring Iuran Warga", requireAuth: true, roles: ["admin", "bendahara", "rt"] },
  laporan: { render: renderLaporanPage, init: initLaporanPage, title: "Laporan Keuangan Kas", requireAuth: true, roles: ["admin", "bendahara", "rt"] },
  pengaturan: { render: renderPengaturanPage, init: initPengaturanPage, title: "Pengaturan Profil RT", requireAuth: true, roles: ["admin"] },
  backup: { render: renderBackupPage, init: initBackupPage, title: "Cadangan & Pemulihan Database", requireAuth: true, roles: ["admin"] }
};

let currentUser = null;
let currentUserProfile = null;
let currentSettings = null;

// Router dispatcher
async function handleRouting() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  // Extract hash route
  let path = window.location.hash.substring(2); // Remove '#/'
  if (!path) path = "dashboard"; // Default route

  const route = routes[path];

  // If page doesn't exist, redirect to dashboard
  if (!route) {
    window.location.hash = "#/dashboard";
    return;
  }

  // Auth Protection checks
  if (route.requireAuth && !currentUser) {
    window.location.hash = "#/login";
    return;
  }

  if (path === "login" && currentUser) {
    window.location.hash = "#/dashboard";
    return;
  }

  // Role Protection check
  if (route.requireAuth && route.roles && !route.roles.includes(currentUserProfile?.role)) {
    Swal.fire("Akses Ditolak", "Anda tidak memiliki wewenang untuk melihat menu ini.", "warning");
    window.location.hash = "#/dashboard";
    return;
  }

  // Fetch RT settings config if not loaded
  if (currentUser && !currentSettings) {
    currentSettings = await getSettings();
  }

  // Handle Bottom Nav visibility and rendering
  const bottomNavEl = document.getElementById("app-bottom-nav");
  if (bottomNavEl) {
    if (route.requireAuth) {
      bottomNavEl.innerHTML = renderBottomNav(currentUserProfile?.role, path);
    } else {
      bottomNavEl.innerHTML = "";
    }
  }

  // Render Layout
  if (!route.requireAuth) {
    appContainer.innerHTML = route.render();
  } else {
    appContainer.innerHTML = `
      <!-- Mobile Sidebar Backdrop Overlay -->
      <div class="sidebar-backdrop" id="sidebar-backdrop"></div>

      <!-- Desktop Sidebar -->
      <aside class="sidebar" id="app-sidebar">
        ${renderSidebar(currentUserProfile?.role, path)}
      </aside>

      <!-- Main Layout Structure -->
      <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
        <header class="topbar">
          ${renderNavbar(route.title, currentUserProfile)}
        </header>
        <main class="main-content">
          ${route.render(currentUserProfile)}
        </main>
      </div>
    `;

    // Register mobile layout sidebar togglers
    const toggleSidebarBtn = document.getElementById("toggle-sidebar-mobile");
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");

    if (toggleSidebarBtn && sidebar && backdrop) {
      toggleSidebarBtn.style.display = "block";
      
      const toggleFn = () => {
        sidebar.classList.toggle("show");
        backdrop.classList.toggle("show");
      };
      
      const closeFn = () => {
        sidebar.classList.remove("show");
        backdrop.classList.remove("show");
      };

      toggleSidebarBtn.addEventListener("click", toggleFn);
      backdrop.addEventListener("click", closeFn);

      // Automatically close sidebar when clicking menu items
      sidebar.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", closeFn);
      });
    }

    // Bind logout button
    const logoutBtn = document.getElementById("sidebar-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        const confirm = await Swal.fire({
          title: 'Keluar Aplikasi?',
          text: 'Anda akan mengakhiri sesi masuk aktif Anda.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: 'var(--primary)'
        });
        if (confirm.isConfirmed) {
          await logoutUser();
          window.location.hash = "#/login";
        }
      });
    }

    // Bind change password button
    const btnChangePass = document.getElementById("btn-change-password-nav");
    if (btnChangePass) {
      btnChangePass.addEventListener("click", () => {
        Swal.fire({
          title: 'Ganti Kata Sandi',
          html: `
            <input type="password" id="swal-current-password" class="swal2-input" placeholder="Kata sandi saat ini" style="font-family: inherit; font-size: 0.95rem;">
            <input type="password" id="swal-new-password" class="swal2-input" placeholder="Kata sandi baru (min. 6 karakter)" style="font-family: inherit; font-size: 0.95rem;">
            <input type="password" id="swal-confirm-password" class="swal2-input" placeholder="Konfirmasi kata sandi baru" style="font-family: inherit; font-size: 0.95rem;">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Simpan',
          confirmButtonColor: 'var(--primary)',
          cancelButtonText: 'Batal',
          preConfirm: () => {
            const current = document.getElementById('swal-current-password').value;
            const pass = document.getElementById('swal-new-password').value;
            const confirm = document.getElementById('swal-confirm-password').value;
            
            if (!current) {
              Swal.showValidationMessage('Kata sandi saat ini wajib diisi!');
              return false;
            }
            if (!pass || pass.length < 6) {
              Swal.showValidationMessage('Kata sandi baru minimal 6 karakter!');
              return false;
            }
            if (pass === current) {
              Swal.showValidationMessage('Kata sandi baru tidak boleh sama dengan sandi lama!');
              return false;
            }
            if (pass !== confirm) {
              Swal.showValidationMessage('Konfirmasi kata sandi tidak cocok!');
              return false;
            }
            return { current, pass };
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
            try {
              await updateCurrentUserPassword(result.value.current, result.value.pass);
              Swal.fire('Berhasil!', 'Kata sandi Anda telah berhasil diubah.', 'success');
            } catch (e) {
              console.error(e);
              let errorMsg = 'Gagal mengubah kata sandi.';
              if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
                errorMsg = 'Kata sandi saat ini salah!';
              } else if (e.message) {
                errorMsg = e.message;
              }
              Swal.fire('Gagal!', errorMsg, 'error');
            }
          }
        });
      });
    }
  }

  // Setup Theme Switcher state and listener
  initThemeSwitcher();

  // Initialize page-specific scripts
  if (route.init) {
    route.init(currentUserProfile);
  }
}

// Theme toggler state tracker
function initThemeSwitcher() {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;

  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", currentTheme);
  btn.innerHTML = `<i class="${currentTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}"></i>`;

  btn.addEventListener("click", () => {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    btn.innerHTML = `<i class="${nextTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}"></i>`;
  });
}

// Router Event Listeners
window.addEventListener("hashchange", handleRouting);

// Subscribe to Auth state to bootstrap the SPA
subscribeToAuth((user, profile) => {
  currentUser = user;
  currentUserProfile = profile;
  handleRouting();
});

// PWA: Register Service Worker
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered successfully!', reg.scope))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
