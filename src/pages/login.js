import { loginUser } from "../firebase/auth";
import { db } from "../firebase/config";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

export function renderLoginPage() {
  return `
    <div style="min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; background-color: var(--background); padding: 16px;">
      <div class="card" style="width: 100%; max-width: 420px; padding: 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
        
        <!-- Logo and Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-lg); background-color: var(--primary-container); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="ri-wallet-3-fill" style="font-size: 2rem;"></i>
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--on-background);">Masuk Ke e-kasRT</h2>
          <p style="font-size: 0.85rem; color: var(--on-surface-variant); margin-top: 4px;">Sistem Informasi Kas & Iuran Warga</p>
        </div>

        <!-- Login Form -->
        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-username">Email atau Username</label>
            <input type="text" id="login-username" class="form-control" placeholder="Masukkan email atau username" required>
          </div>
          
          <div class="form-group" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <label class="form-label" for="login-password">Kata Sandi</label>
              <a href="#" id="forgot-password-link" style="font-size: 0.8rem; color: var(--primary); text-decoration: none; font-weight: 500;">Lupa Sandi?</a>
            </div>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
            <input type="checkbox" id="remember-me" style="width: 16px; height: 16px; accent-color: var(--primary);">
            <label for="remember-me" style="font-size: 0.85rem; color: var(--on-surface-variant); cursor: pointer; user-select: none;">Ingat Saya</label>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; border-radius: var(--radius-md);">
            <i class="ri-login-box-line"></i> Masuk
          </button>
        </form>

        <!-- Forgot Password Form (Hidden by default) -->
        <form id="forgot-form" style="display: none;">
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">Lupa Kata Sandi?</h3>
            <p style="font-size: 0.8rem; color: var(--on-surface-variant);">Masukkan email terdaftar Anda untuk mengajukan permohonan reset sandi menjadi <b>123456</b> kepada Administrator RT.</p>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" for="forgot-email">Alamat Email</label>
            <input type="email" id="forgot-email" class="form-control" placeholder="name@domain.com" required>
          </div>

          <div style="display: flex; gap: 12px;">
            <button type="button" id="back-to-login" class="btn btn-secondary" style="flex: 1; border-radius: var(--radius-md);">Kembali</button>
            <button type="submit" class="btn btn-primary" style="flex: 1; border-radius: var(--radius-md);">Kirim</button>
          </div>
        </form>

      </div>
    </div>
  `;
}

export function initLoginPage() {
  const loginForm = document.getElementById("login-form");
  const forgotForm = document.getElementById("forgot-form");
  const forgotLink = document.getElementById("forgot-password-link");
  const backBtn = document.getElementById("back-to-login");

  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      forgotForm.style.display = "block";
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      forgotForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }

  // Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const identifier = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;
      const rememberMe = document.getElementById("remember-me").checked;

      // Show loader
      Swal.fire({
        title: 'Memproses...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      try {
        await loginUser(identifier, password, rememberMe);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Masuk',
          text: 'Selamat datang kembali di e-kasRT!',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.hash = "#/dashboard";
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Masuk',
          text: error.message || 'Email/username atau kata sandi salah.'
        });
      }
    });
  }

  // Handle Forgot Password Submission
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("forgot-email").value.trim().toLowerCase();

      Swal.fire({
        title: 'Memproses pengajuan...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      try {
        // Save request directly to reset_password_requests collection
        // (Admin/server-side functions will check if email exists to avoid exposing user list to guest users)
        await addDoc(collection(db, "reset_password_requests"), {
          email: email,
          nama_lengkap: "Pengaju Reset", // Default label for guest
          username: "guest",
          status: "pending",
          created_at: serverTimestamp()
        });

        Swal.fire({
          icon: 'success',
          title: 'Pengajuan Terkirim',
          text: 'Permintaan reset sandi telah diajukan ke Admin. Silakan hubungi RT untuk menyetujui reset sandi Anda menjadi 123456.',
          confirmButtonColor: 'var(--primary)'
        }).then(() => {
          forgotForm.style.display = "none";
          loginForm.style.display = "block";
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Mengajukan',
          text: error.message || 'Terjadi kesalahan saat mengajukan reset sandi.'
        });
      }
    });
  }
}
