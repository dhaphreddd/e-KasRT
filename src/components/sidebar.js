export function renderSidebar(role, activeRoute) {
  const menuItems = [
    { route: "dashboard", label: "Dashboard", icon: "ri-dashboard-line", roles: ["admin", "bendahara", "rt", "warga"] },
    { route: "users", label: "User Management", icon: "ri-user-settings-line", roles: ["admin"] },
    { route: "warga", label: "Data Warga", icon: "ri-group-line", roles: ["admin", "bendahara", "rt"] },
    { route: "kategori", label: "Kategori Transaksi", icon: "ri-price-tag-3-line", roles: ["admin", "bendahara"] },
    { route: "transaksi", label: "Transaksi Kas", icon: "ri-exchange-funds-line", roles: ["admin", "bendahara", "rt"] },
    { route: "iuran", label: "Master & Tarif Iuran", icon: "ri-wallet-3-line", roles: ["admin", "bendahara"] },
    { route: "monitoring", label: "Monitoring Iuran", icon: "ri-calendar-todo-line", roles: ["admin", "bendahara", "rt"] },
    { route: "laporan", label: "Laporan Kas", icon: "ri-file-chart-line", roles: ["admin", "bendahara", "rt"] },
    { route: "pengaturan", label: "Pengaturan RT", icon: "ri-settings-4-line", roles: ["admin"] },
    { route: "backup", label: "Backup & Restore", icon: "ri-database-2-line", roles: ["admin"] }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  const sidebarHtml = `
    <div class="sidebar-brand">
      <i class="ri-wallet-3-fill" style="font-size: 2rem; color: var(--primary);"></i>
      <h1>e-kasRT</h1>
    </div>
    <ul class="sidebar-menu">
      ${filteredItems.map(item => `
        <li>
          <a href="#/${item.route}" class="sidebar-link ${activeRoute === item.route ? 'active' : ''}">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        </li>
      `).join('')}
    </ul>
    <div class="sidebar-footer">
      <button id="sidebar-logout" class="btn btn-secondary" style="width: 100%; border-radius: var(--radius-full); gap: 12px;">
        <i class="ri-logout-box-line"></i>
        <span>Keluar</span>
      </button>
    </div>
  `;

  return sidebarHtml;
}
