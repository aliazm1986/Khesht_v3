/* ============================================================
   منطق صفحه جزئیات پروژه
   ============================================================ */

// دریافت ID از query string
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

if (!projectId || typeof PROJECTS === "undefined") {
  document.body.innerHTML = `<div class="container" style="padding:100px 24px;text-align:center">
    <h1 style="margin-bottom:20px">پروژه یافت نشد</h1>
    <a href="index.html" class="btn btn-primary">بازگشت به صفحه اصلی</a>
  </div>`;
} else {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) {
    document.body.innerHTML = `<div class="container" style="padding:100px 24px;text-align:center">
      <h1 style="margin-bottom:20px">پروژه یافت نشد</h1>
      <a href="index.html" class="btn btn-primary">بازگشت به صفحه اصلی</a>
    </div>`;
  } else {
    renderProject(project);
  }
}

function renderProject(project) {
  const TAG_CLASS = { new: "tag-new", funding: "tag-funding", done: "tag-done", limited: "tag-limited" };

  // عنوان و مسیر
  document.getElementById("crumbTitle").textContent = project.title;
  document.getElementById("detailTitle").textContent = project.title;
  document.getElementById("detailLoc").textContent = `${project.city}، ${project.district}`;
  const tagEl = document.getElementById("detailTag");
  tagEl.textContent = project.statusLabel;
  tagEl.className = "tag " + TAG_CLASS[project.status];

  // گالری
  document.getElementById("galleryMain").innerHTML = projectArt(project, 0);
  document.getElementById("galleryThumb1").innerHTML = projectArt(project, 1);
  document.getElementById("galleryThumb2").innerHTML = projectArt(project, 2);

  // متن معرفی (اینجا می‌تواند از API دریافت شود)
  // document.getElementById("aboutText") — از HTML پیش‌فرض استفاده می‌کنیم

  // مالی
  document.getElementById("finGoal").textContent = project.goal;
  document.getElementById("finReturn").textContent = `٪${toFa(project.annualReturn)}`;
  document.getElementById("finDuration").textContent = `${toFa(project.duration)} ماه`;
  document.getElementById("finMin").textContent = project.minInvest;

  // کارت سرمایه‌گذاری
  const pct = toFa(project.progress);
  document.getElementById("invPct").textContent = `٪${pct} تأمین شده`;
  document.getElementById("invGoal").textContent = `هدف: ${project.goal}`;
  document.getElementById("invReturn").textContent = `٪${toFa(project.annualReturn)}`;
  document.getElementById("invDuration").textContent = `${toFa(project.duration)} ماه`;
  document.getElementById("invMin").textContent = project.minInvest;
  document.getElementById("invInvestors").textContent = toFaComma(project.investors);

  const barEl = document.getElementById("invBar");
  barEl.dataset.progress = project.progress;
  if (project.status === "limited") barEl.classList.add("gold");
  setTimeout(() => {
    barEl.style.width = project.progress + "%";
  }, 200);

  // محاسبه سود
  const amountInput = document.getElementById("investAmount");
  const hintEl = document.getElementById("investHint");
  const estEl = document.getElementById("investEst");
  const minAmount = parseInt(project.minInvest.replace(/[^\d]/g, ""), 10);

  function updateEstimate() {
    const rawVal = amountInput.value.replace(/[^\d]/g, "");
    const amount = parseInt(rawVal, 10) || 0;
    amountInput.value = amount.toLocaleString("en-US");

    if (amount < minAmount) {
      hintEl.textContent = `حداقل مبلغ ورود ${project.minInvest} است`;
      hintEl.classList.add("error");
    } else {
      hintEl.textContent = "حداقل مبلغ ورود رعایت شده است ✔";
      hintEl.classList.remove("error");
    }

    const profit = Math.round((amount * project.annualReturn * project.duration) / (100 * 12));
    estEl.textContent = toFaComma(profit) + " تومان";
  }

  amountInput.addEventListener("input", updateEstimate);
  updateEstimate();

  document.getElementById("investBtn").addEventListener("click", () => {
    const rawVal = amountInput.value.replace(/[^\d]/g, "");
    const amount = parseInt(rawVal, 10) || 0;
    if (amount < minAmount) {
      alert(`لطفاً حداقل ${project.minInvest} سرمایه‌گذاری کنید.`);
      return;
    }
    alert(`در نسخه نهایی، به صفحه پرداخت امن منتقل می‌شوید.\n\nمبلغ: ${toFaComma(amount)} تومان\nپروژه: ${project.title}`);
  });
}

/* ---------- تب‌های جزئیات ---------- */
document.querySelectorAll(".detail-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.tab;
    document.querySelectorAll(".detail-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const panel = document.getElementById("panel-" + targetId);
    if (panel) panel.classList.add("active");
  });
});
