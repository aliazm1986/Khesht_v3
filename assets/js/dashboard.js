const dashboardSidebar = document.getElementById("dashboardSidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

if (dashboardSidebar && sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    if (window.innerWidth <= 760) {
      dashboardSidebar.classList.toggle("mobile-open");
      return;
    }
    dashboardSidebar.classList.toggle("collapsed");
  });
}

document.querySelectorAll(".side-nav a").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".side-nav a.active").forEach((active) => active.classList.remove("active"));
    item.classList.add("active");
    if (window.innerWidth <= 760) dashboardSidebar?.classList.remove("mobile-open");
  });
});
