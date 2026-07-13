import { db, functions, httpsCallable } from "../firebase/config";
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { logActivity } from "../firebase/db";

// Recreate config for secondary app user creation client-side
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-key-for-now",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ekasrt-local.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ekasrt-local",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ekasrt-local.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234:web:abcd"
};

// Initialize secondary app
let secondaryAuth;
try {
  const secondaryApp = initializeApp(firebaseConfig, "UserCreatorApp");
  secondaryAuth = getAuth(secondaryApp);
} catch (error) {
  // If already initialized
}

export function renderUsersPage() {
  return `
    <div class="card" style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <h3 class="card-title" style="margin-bottom: 0;">Pengguna Sistem</h3>
        <button id="btn-add-user" class="btn btn-primary">
          <i class="ri-user-add-line"></i> Tambah Pengguna
        </button>
      </div>

      <!-- Filters & Search -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        <div class="form-group" style="flex: 1; min-width: 200px; margin-bottom: 0;">
          <input type="text" id="search-users" class="form-control" placeholder="Cari nama atau username...">
        </div>
        <div class="form-group" style="width: 150px; margin-bottom: 0;">
          <select id="filter-role" class="form-control">
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="bendahara">Bendahara</option>
            <option value="rt">Ketua RT</option>
            <option value="warga">Warga</option>
          </select>
        </div>
      </div>

      <!-- Table View -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nama Lengkap</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody id="users-table-body">
            <tr>
              <td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Memuat data pengguna...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Password Reset Requests Card -->
    <div class="card" style="width: 100%; margin-top: 24px;">
      <h3 class="card-title" style="margin-bottom: 20px;"><i class="ri-key-line" style="color: var(--primary);"></i> Pengajuan Reset Password</h3>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody id="reset-requests-table-body">
            <tr>
              <td colspan="5" style="text-align: center; color: var(--on-surface-variant);">Memuat data pengajuan...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div id="user-modal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-user-title" style="font-weight: 700;">Tambah Pengguna</h3>
          <button id="modal-user-close" class="btn btn-secondary" style="padding: 6px 12px; border-radius: var(--radius-full);">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <form id="user-form">
          <input type="hidden" id="user-id">
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="user-nama">Nama Lengkap</label>
              <input type="text" id="user-nama" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="user-username">Username</label>
              <input type="text" id="user-username" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="user-email">Email</label>
              <input type="email" id="user-email" class="form-control" required>
            </div>
            <div class="form-group" id="pass-field-group">
              <label class="form-label" for="user-password">Kata Sandi</label>
              <input type="password" id="user-password" class="form-control" minlength="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="user-role">Role</label>
              <select id="user-role" class="form-control" required>
                <option value="admin">Admin</option>
                <option value="bendahara">Bendahara</option>
                <option value="rt">Ketua RT</option>
                <option value="warga">Warga</option>
              </select>
            </div>
            <!-- Warga Link Dropdown -->
            <div class="form-group" id="warga-link-group" style="display: none;">
              <label class="form-label" for="user-warga-id">Hubungkan dengan Data Warga <span style="font-weight: normal; font-size: 0.75rem; color: var(--on-surface-variant);">(Opsional)</span></label>
              <select id="user-warga-id" class="form-control">
                <option value="">Pilih Warga...</option>
              </select>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="user-active" checked style="width: 16px; height: 16px;">
              <label for="user-active" class="form-label" style="margin-bottom: 0; cursor: pointer;">Akun Aktif</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-cancel-user" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export async function initUsersPage() {
  const tableBody = document.getElementById("users-table-body");
  const addBtn = document.getElementById("btn-add-user");
  const modal = document.getElementById("user-modal");
  const modalClose = document.getElementById("modal-user-close");
  const cancelBtn = document.getElementById("btn-cancel-user");
  const userForm = document.getElementById("user-form");
  const userRoleSelect = document.getElementById("user-role");
  const wargaLinkGroup = document.getElementById("warga-link-group");
  const userWargaSelect = document.getElementById("user-warga-id");
  const searchInput = document.getElementById("search-users");
  const filterRole = document.getElementById("filter-role");

  let allUsers = [];

  // Toggle Data Warga link dropdown based on role selected
  userRoleSelect.addEventListener("change", () => {
    if (userRoleSelect.value === "warga") {
      wargaLinkGroup.style.display = "block";
    } else {
      wargaLinkGroup.style.display = "none";
    }
  });

  // Load Warga selection list
  async function loadWargaOptions() {
    try {
      const wargaRef = collection(db, "warga");
      const snap = await getDocs(query(wargaRef, where("status", "==", "aktif")));
      const list = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      list.sort((a, b) => (a.nama || "").localeCompare(b.nama || ""));

      let html = `<option value="">Pilih Warga...</option>`;
      list.forEach(item => {
        html += `<option value="${item.id}">${item.nama}</option>`;
      });
      userWargaSelect.innerHTML = html;
    } catch (err) {
      console.error("Error loading warga options:", err);
    }
  }
  loadWargaOptions();

  // Load Users List
  async function loadUsers() {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Memuat data...</td></tr>`;
    try {
      const q = query(collection(db, "users"), orderBy("nama_lengkap"));
      const snap = await getDocs(q);
      allUsers = [];
      snap.forEach(doc => {
        allUsers.push({ id: doc.id, ...doc.data() });
      });
      renderTable();
    } catch (e) {
      console.error(e);
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--error);">Gagal memuat data pengguna.</td></tr>`;
    }
  }

  function renderTable() {
    const searchVal = searchInput.value.toLowerCase().trim();
    const roleVal = filterRole.value;

    const filtered = allUsers.filter(u => {
      const matchSearch = u.nama_lengkap.toLowerCase().includes(searchVal) || u.username.toLowerCase().includes(searchVal);
      const matchRole = roleVal === "" || u.role === roleVal;
      return matchSearch && matchRole;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--on-surface-variant);">Tidak ada data pengguna ditemukan.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(u => `
      <tr>
        <td style="font-weight: 600;">${u.nama_lengkap}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td><span style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">${u.role}</span></td>
        <td>
          <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${u.is_active ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${u.is_active ? 'var(--success)' : 'var(--error)'};">
            ${u.is_active ? 'Aktif' : 'Nonaktif'}
          </span>
        </td>
        <td style="text-align: right; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="btn btn-secondary edit-user-btn" data-id="${u.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-edit-line"></i> Edit
          </button>
          <button class="btn btn-danger delete-user-btn" data-id="${u.id}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
            <i class="ri-delete-bin-line"></i> Hapus
          </button>
        </td>
      </tr>
    `).join('');

    // Attach actions
    document.querySelectorAll(".edit-user-btn").forEach(btn => {
      btn.addEventListener("click", () => openEditModal(btn.dataset.id));
    });
    document.querySelectorAll(".delete-user-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteUserConfirm(btn.dataset.id));
    });
  }

  // Bind Filters
  searchInput.addEventListener("input", renderTable);
  filterRole.addEventListener("change", renderTable);

  // Modal Controls
  addBtn.addEventListener("click", () => {
    document.getElementById("modal-user-title").innerText = "Tambah Pengguna";
    document.getElementById("user-id").value = "";
    document.getElementById("user-nama").value = "";
    document.getElementById("user-username").value = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-password").value = "";
    document.getElementById("user-password").required = true;
    document.getElementById("pass-field-group").style.display = "block";
    document.getElementById("user-role").value = "warga";
    wargaLinkGroup.style.display = "block";
    userWargaSelect.value = "";
    document.getElementById("user-active").checked = true;
    modal.classList.add("show");
  });

  const closeModal = () => modal.classList.remove("show");
  modalClose.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Edit User Modal Load
  function openEditModal(id) {
    const user = allUsers.find(u => u.id === id);
    if (!user) return;

    document.getElementById("modal-user-title").innerText = "Edit Pengguna";
    document.getElementById("user-id").value = user.id;
    document.getElementById("user-nama").value = user.nama_lengkap;
    document.getElementById("user-username").value = user.username;
    document.getElementById("user-email").value = user.email;
    document.getElementById("user-password").value = "";
    document.getElementById("user-password").required = false;
    document.getElementById("pass-field-group").style.display = "none"; // Hide password change here for security
    document.getElementById("user-role").value = user.role;
    
    if (user.role === "warga") {
      wargaLinkGroup.style.display = "block";
      userWargaSelect.value = user.warga_id || "";
    } else {
      wargaLinkGroup.style.display = "none";
    }

    document.getElementById("user-active").checked = user.is_active !== false;
    modal.classList.add("show");
  }

  // Delete user account confirm
  async function deleteUserConfirm(id) {
    const user = allUsers.find(u => u.id === id);
    if (!user) return;

    const result = await Swal.fire({
      title: 'Hapus Pengguna?',
      text: `Anda akan menghapus data pengguna ${user.nama_lengkap}. Aksi ini tidak dapat dibatalkan!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      cancelButtonColor: 'var(--secondary)',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "users", id));
        if (user.username) {
          await deleteDoc(doc(db, "usernames", user.username.toLowerCase()));
        }
        await logActivity("delete", `Menghapus user login ${user.nama_lengkap}`);
        Swal.fire('Terhapus!', 'Pengguna telah berhasil dihapus.', 'success');
        loadUsers();
      } catch (err) {
        Swal.fire('Gagal!', 'Gagal menghapus pengguna.', 'error');
      }
    }
  }

  // Handle submit form
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("user-id").value;
    const name = document.getElementById("user-nama").value.trim();
    const username = document.getElementById("user-username").value.trim().toLowerCase();
    const email = document.getElementById("user-email").value.trim();
    const role = document.getElementById("user-role").value;
    const active = document.getElementById("user-active").checked;
    const password = document.getElementById("user-password").value;
    const wargaId = role === "warga" ? userWargaSelect.value : null;

    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
      if (id) {
        // Edit Existing User profile
        const userRef = doc(db, "users", id);
        // Get old username if changed to delete mapping
        const oldUser = allUsers.find(u => u.id === id);
        if (oldUser && oldUser.username && oldUser.username !== username) {
          await deleteDoc(doc(db, "usernames", oldUser.username.toLowerCase()));
        }

        await updateDoc(userRef, {
          nama_lengkap: name,
          username: username,
          email: email,
          role: role,
          warga_id: wargaId,
          is_active: active,
          updated_at: serverTimestamp()
        });

        // Write new mapping
        await setDoc(doc(db, "usernames", username), { email: email });

        await logActivity("update", `Memperbarui profile pengguna ${name}`);
      } else {
        // Create new Firebase auth user using secondaryApp
        if (!password) {
          throw new Error("Password wajib untuk pengguna baru.");
        }
        
        // 1. Create auth user
        const credentials = await createUserWithEmailAndPassword(secondaryAuth, email, password);
        const newUid = credentials.user.uid;
 
        // 2. Save profile in users collection
        await setDoc(doc(db, "users", newUid), {
          username: username,
          email: email,
          nama_lengkap: name,
          role: role,
          warga_id: wargaId,
          is_active: active,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        });

        // 3. Write username mapping
        await setDoc(doc(db, "usernames", username), { email: email });

        await logActivity("create", `Membuat pengguna baru ${name} dengan role ${role}`);
      }

      Swal.fire('Berhasil!', 'Data pengguna disimpan.', 'success');
      closeModal();
      loadUsers();
    } catch (err) {
      console.error(err);
      Swal.fire('Gagal!', err.message || 'Terjadi kesalahan saat menyimpan.', 'error');
    }
  });

  // Load Password Reset Requests
  const resetTableBody = document.getElementById("reset-requests-table-body");
  
  async function loadResetRequests() {
    resetTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Memuat data...</td></tr>`;
    try {
      const snap = await getDocs(query(collection(db, "reset_password_requests"), orderBy("created_at", "desc")));
      const requests = [];
      snap.forEach(docSnap => {
        requests.push({ id: docSnap.id, ...docSnap.data() });
      });
      renderResetRequestsTable(requests);
    } catch (e) {
      console.error(e);
      resetTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--error);">Gagal memuat pengajuan reset.</td></tr>`;
    }
  }

  function renderResetRequestsTable(requests) {
    if (requests.length === 0) {
      resetTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--on-surface-variant);">Tidak ada pengajuan reset password.</td></tr>`;
      return;
    }

    resetTableBody.innerHTML = requests.map(req => {
      const matchedUser = allUsers.find(u => u.email === req.email);
      const namaTampil = matchedUser ? matchedUser.nama_lengkap : "Email Tidak Terdaftar (Bukan Warga)";
      const usernameTampil = matchedUser ? `(${matchedUser.username})` : "";
      const dateText = req.created_at ? new Date(req.created_at.seconds * 1000).toLocaleString('id-ID') : "-";
      return `
        <tr>
          <td style="font-weight: 600; color: ${matchedUser ? 'var(--on-background)' : 'var(--error)'};">
            ${namaTampil} ${usernameTampil}
          </td>
          <td>${req.email}</td>
          <td>${dateText}</td>
          <td>
            <span style="padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: bold; background-color: ${req.status === 'approved' ? 'rgba(34, 197, 94, 0.15)' : req.status === 'rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; color: ${req.status === 'approved' ? 'var(--success)' : req.status === 'rejected' ? 'var(--error)' : 'var(--warning)'};">
              ${req.status === 'approved' ? 'Disetujui' : req.status === 'rejected' ? 'Ditolak' : 'Pending'}
            </span>
          </td>
          <td style="text-align: right;">
            <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
              ${req.status === 'pending' ? `
                <button class="btn btn-primary approve-reset-btn" data-id="${req.id}" data-email="${req.email}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                  <i class="ri-check-line"></i> Setujui (123456)
                </button>
                <button class="btn btn-danger reject-reset-btn" data-id="${req.id}" data-email="${req.email}" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem;">
                  <i class="ri-close-line"></i> Tolak
                </button>
              ` : ''}
              <button class="btn btn-secondary delete-reset-btn" data-id="${req.id}" data-email="${req.email}" title="Hapus Pengajuan" style="padding: 6px 12px; border-radius: var(--radius-md); font-size: 0.8rem; background-color: var(--surface-variant); color: var(--on-surface-variant);">
                <i class="ri-delete-bin-line"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll(".approve-reset-btn").forEach(btn => {
      btn.addEventListener("click", () => approveResetPassword(btn.dataset.id, btn.dataset.email));
    });
    document.querySelectorAll(".reject-reset-btn").forEach(btn => {
      btn.addEventListener("click", () => rejectResetPassword(btn.dataset.id, btn.dataset.email));
    });
    document.querySelectorAll(".delete-reset-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteResetPassword(btn.dataset.id, btn.dataset.email));
    });
  }

  async function approveResetPassword(id, email) {
    const confirm = await Swal.fire({
      title: 'Setujui Reset Password?',
      text: `Apakah Anda yakin ingin mereset password akun ${email} menjadi 123456?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)'
    });

    if (confirm.isConfirmed) {
      Swal.fire({ title: 'Memproses reset password...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
      try {
        const resetFn = httpsCallable(functions, "resetUserPasswordToDefault");
        await resetFn({ email: email });

        // Update request status in Firestore
        await updateDoc(doc(db, "reset_password_requests", id), {
          status: "approved"
        });

        await logActivity("update", `Mereset password user ${email} menjadi 123456`);

        Swal.fire("Berhasil", "Password berhasil di-reset menjadi 123456.", "success");
        loadResetRequests();
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal", err.message || "Gagal mereset sandi. Pastikan Cloud Functions terdeploy atau ganti password melalui Firebase Console.", "error");
      }
    }
  }

  async function rejectResetPassword(id, email) {
    const confirm = await Swal.fire({
      title: 'Tolak Reset Password?',
      text: `Apakah Anda yakin ingin menolak pengajuan reset password untuk akun ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Ya, Tolak',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
      try {
        await updateDoc(doc(db, "reset_password_requests", id), {
          status: "rejected"
        });

        await logActivity("update", `Menolak permintaan reset password user ${email}`);

        Swal.fire("Selesai", "Pengajuan reset password telah ditolak.", "success");
        loadResetRequests();
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal", "Gagal menolak pengajuan reset.", "error");
      }
    }
  }

  async function deleteResetPassword(id, email) {
    const confirm = await Swal.fire({
      title: 'Hapus Pengajuan?',
      text: `Apakah Anda yakin ingin menghapus data pengajuan reset password untuk akun ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
      try {
        await deleteDoc(doc(db, "reset_password_requests", id));
        await logActivity("delete", `Menghapus dokumen riwayat pengajuan reset password user ${email}`);
        Swal.fire("Berhasil", "Pengajuan reset password telah dihapus.", "success");
        loadResetRequests();
      } catch (err) {
        console.error(err);
        Swal.fire("Gagal", "Gagal menghapus pengajuan.", "error");
      }
    }
  }

  // Initial load
  loadUsers();
  loadResetRequests();
}
