/* ============================================================
   خشت — منطق رابط کاربری (بدون وابستگی خارجی)
   ============================================================ */

/* ---------- ابزار: تبدیل اعداد به رقم فارسی ---------- */
const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function toFa(num) {
  return String(num).replace(/\d/g, (d) => FA_DIGITS[+d]);
}
function toFaComma(num) {
  return toFa(Number(num).toLocaleString("en-US")).replace(/,/g, "٬");
}

/* ---------- هدر sticky ---------- */
const header = document.getElementById("header");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- منوی همبرگری موبایل ---------- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });
  mobileMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- رندر کارت پروژه‌ها ---------- */
const grid = document.getElementById("projectsGrid");

const TAG_CLASS = { new: "tag-new", funding: "tag-funding", done: "tag-done", limited: "tag-limited" };

function projectCard(project, index) {
  const barClass = project.status === "limited" ? "gold" : "";
  const daysText =
    project.status === "done"
      ? "تکمیل شده"
      : project.daysLeft <= 7
      ? `<span class="warn">فقط ${toFa(project.daysLeft)} روز باقی‌مانده</span>`
      : `${toFa(project.daysLeft)} روز باقی‌مانده`;
  return `
  <article class="project-card reveal"
    data-city="${project.city}" data-return="${project.annualReturn}"
    data-duration="${project.duration}" data-status="${project.status}"
    data-created="${project.createdAt}" data-days="${project.daysLeft || 9999}">
    <div class="project-media">
      ${projectArt(project, index % 3)}
      <span class="tag ${TAG_CLASS[project.status]}">${project.statusLabel}</span>
    </div>
    <div class="project-body">
      <h3 class="project-title">${project.title}</h3>
      <div class="project-loc">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${project.city}، ${project.district}
      </div>
      <div class="progress-wrap">
        <div class="progress-meta">
          <span class="pct">٪${toFa(project.progress)} تأمین شده</span>
          <span class="goal">هدف: ${project.goal}</span>
        </div>
        <div class="progress"><div class="progress-fill ${barClass}" data-progress="${project.progress}"></div></div>
      </div>
      <div class="project-metrics">
        <div class="metric">
          <div class="metric-value">٪${toFa(project.annualReturn)}</div>
          <div class="metric-label">بازده سالانه</div>
        </div>
        <div class="metric">
          <div class="metric-value dark">${toFa(project.duration)} ماه</div>
          <div class="metric-label">مدت سرمایه‌گذاری</div>
        </div>
        <div class="metric">
          <div class="metric-value dark">${project.minInvest}</div>
          <div class="metric-label">حداقل ورود</div>
        </div>
      </div>
      <div class="project-foot">
        <span>${daysText}</span>
        <span>${toFaComma(project.investors)} سرمایه‌گذار</span>
      </div>
      <a href="project.html?id=${project.id}" class="btn btn-green btn-block">مشاهده جزئیات</a>
    </div>
  </article>`;
}

function renderProjects() {
  if (!grid || typeof PROJECTS === "undefined") return;
  grid.innerHTML = PROJECTS.map((p, i) => projectCard(p, i)).join("");
  observeReveals(grid.querySelectorAll(".reveal"));
  animateProgressBars(grid);
  applyFilters();
}

/* ---------- فیلتر و مرتب‌سازی ---------- */
const filterCity = document.getElementById("filterCity");
const filterReturn = document.getElementById("filterReturn");
const filterDuration = document.getElementById("filterDuration");
const filterStatus = document.getElementById("filterStatus");
const sortBy = document.getElementById("sortBy");
const filtersCount = document.getElementById("filtersCount");

function applyFilters() {
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".project-card"));
  const city = filterCity ? filterCity.value : "";
  const minReturn = filterReturn ? Number(filterReturn.value || 0) : 0;
  const maxDuration = filterDuration ? Number(filterDuration.value || 0) : 0;
  const status = filterStatus ? filterStatus.value : "";

  let visible = 0;
  cards.forEach((card) => {
    const okCity = !city || card.dataset.city === city;
    const okReturn = !minReturn || Number(card.dataset.return) >= minReturn;
    const okDuration = !maxDuration || Number(card.dataset.duration) <= maxDuration;
    const okStatus = !status || card.dataset.status === status;
    const show = okCity && okReturn && okDuration && okStatus;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });

  const mode = sortBy ? sortBy.value : "newest";
  const sorted = cards.slice().sort((a, b) => {
    if (mode === "return") return Number(b.dataset.return) - Number(a.dataset.return);
    if (mode === "deadline") return Number(a.dataset.days) - Number(b.dataset.days);
    return Number(b.dataset.created) - Number(a.dataset.created);
  });
  sorted.forEach((card) => grid.appendChild(card));

  if (filtersCount) {
    filtersCount.textContent = visible
      ? `${toFa(visible)} فرصت سرمایه‌گذاری یافت شد`
      : "فرصتی با این فیلترها یافت نشد؛ فیلترها را تغییر دهید.";
  }
}

[filterCity, filterReturn, filterDuration, filterStatus, sortBy].forEach((el) => {
  if (el) el.addEventListener("change", applyFilters);
});

/* ---------- نوار پیشرفت ---------- */
function animateProgressBars(scope) {
  const bars = (scope || document).querySelectorAll(".progress-fill[data-progress]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.progress + "%";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((bar) => io.observe(bar));
}

/* ---------- شمارنده آمار ---------- */
function animateCounters() {
  const counters = document.querySelectorAll(".stat-value[data-count]");
  if (!counters.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = prefix + toFaComma(Math.round(target * eased)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((counter) => io.observe(counter));
}

/* ---------- انیمیشن reveal (fade-up) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
function observeReveals(nodes) {
  (nodes || document.querySelectorAll(".reveal")).forEach((node) => revealObserver.observe(node));
}

/* ---------- آکاردئون سوالات متداول ---------- */
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  const answer = item.querySelector(".faq-a");
  if (!btn || !answer) return;
  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((other) => {
      other.classList.remove("open");
      other.querySelector(".faq-a").style.maxHeight = "0";
      other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

/* ---------- اجرا ---------- */
renderProjects();
observeReveals();
animateCounters();
animateProgressBars(document);

/* ---------- خبرنامه ---------- */
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");
if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterMessage.textContent = "عضویت شما ثبت شد؛ به‌زودی خبرهای خشت را دریافت می‌کنید.";
    newsletterMessage.style.color = "#9BE1C1";
    newsletterForm.reset();
  });
}
