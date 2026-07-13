export function renderBottomNav(role, activeRoute) {
  const menuItems = [
    { route: "dashboard", label: "Dashboard", icon: "ri-dashboard-line", roles: ["admin", "bendahara", "rt", "warga"] },
    { route: "warga", label: "Warga", icon: "ri-group-line", roles: ["admin", "bendahara", "rt"] },
    { route: "transaksi", label: "Kas", icon: "ri-exchange-funds-line", roles: ["admin", "bendahara", "rt"] },
    { route: "monitoring", label: "Iuran", icon: "ri-calendar-todo-line", roles: ["admin", "bendahara", "rt"] },
    { route: "laporan", label: "Laporan", icon: "ri-file-chart-line", roles: ["admin", "bendahara", "rt"] }
  ];

  // For citizens, bottom nav has fewer items
  const filteredItems = menuItems.filter(item => item.roles.includes(role)).slice(0, 5);

  const bottomNavHtml = filteredItems.map(item => `
    <a href="#/${item.route}" class="bottom-nav-link ${activeRoute === item.route ? 'active' : ''}">
      <i class="${item.icon}"></i>
      <span>${item.label}</span>
    </a>
  `).join('');

  return bottomNavHtml;
}
