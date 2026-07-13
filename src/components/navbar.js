export function renderNavbar(title, profile) {
  const name = profile ? profile.nama_lengkap : "User";
  const role = profile ? profile.role.toUpperCase() : "GUEST";
  
  return `
    <div style="display: flex; align-items: center; gap: 12px;">
      <button id="toggle-sidebar-mobile" class="btn btn-secondary" style="display: none; padding: 8px; border-radius: var(--radius-md);">
        <i class="ri-menu-2-line" style="font-size: 1.25rem;"></i>
      </button>
      <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--on-background);">${title}</h2>
    </div>
    
    <div style="display: flex; align-items: center; gap: 16px;">
      <!-- Theme Switcher -->
      <button id="theme-toggle-btn" class="theme-switch" title="Ganti Tema">
        <i class="ri-moon-line"></i>
      </button>
      
      <!-- Ganti Sandi Button -->
      <button id="btn-change-password-nav" class="theme-switch" title="Ganti Kata Sandi">
        <i class="ri-key-2-line"></i>
      </button>
      
      <!-- User profile summary -->
      <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid var(--surface-variant); padding-left: 16px;">
        <div style="text-align: right; display: block;">
          <p style="font-size: 0.9rem; font-weight: 600; color: var(--on-background);">${name}</p>
          <span style="font-size: 0.75rem; font-weight: 500; color: var(--primary);">${role}</span>
        </div>
        <div style="width: 36px; height: 36px; border-radius: var(--radius-full); background-color: var(--primary-container); color: var(--on-primary-container); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.95rem;">
          ${name.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  `;
}
