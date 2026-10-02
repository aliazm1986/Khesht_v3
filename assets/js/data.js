/* ============================================================
   داده‌های نمونه پروژه‌ها
   توجه: این داده‌ها Placeholder هستند و در نسخه نهایی باید
   از API دریافت شوند:  GET /api/v1/projects
   ============================================================ */

const PROJECTS = [
  {
    id: "aftab-residential",
    title: "مجتمع مسکونی آفتاب",
    city: "تهران",
    district: "سعادت‌آباد",
    status: "funding",
    statusLabel: "در حال تأمین مالی",
    progress: 72,
    goal: "۱۸ میلیارد تومان",
    annualReturn: 28,
    duration: 18,
    minInvest: "۵ میلیون تومان",
    daysLeft: 21,
    investors: 842,
    createdAt: 20260810,
    palette: ["#19A974", "#087443"],
    accent: "#E6F7F0"
  },
  {
    id: "narenj-commercial",
    title: "مرکز تجاری نارنج",
    city: "اصفهان",
    district: "چهارباغ بالا",
    status: "new",
    statusLabel: "جدید",
    progress: 18,
    goal: "۲۴ میلیارد تومان",
    annualReturn: 31,
    duration: 24,
    minInvest: "۱۰ میلیون تومان",
    daysLeft: 45,
    investors: 210,
    createdAt: 20260901,
    palette: ["#F2B84B", "#D99A1F"],
    accent: "#FDF3DE"
  },
  {
    id: "sahel-hotel",
    title: "هتل ساحلی مروارید",
    city: "کیش",
    district: "بلوار ساحلی",
    status: "limited",
    statusLabel: "فرصت محدود",
    progress: 91,
    goal: "۳۵ میلیارد تومان",
    annualReturn: 34,
    duration: 24,
    minInvest: "۲۰ میلیون تومان",
    daysLeft: 6,
    investors: 1260,
    createdAt: 20260715,
    palette: ["#2563EB", "#1E40AF"],
    accent: "#EAF1FB"
  },
  {
    id: "toos-residential",
    title: "برج مسکونی توس",
    city: "مشهد",
    district: "بلوار سجاد",
    status: "funding",
    statusLabel: "در حال تأمین مالی",
    progress: 54,
    goal: "۱۲ میلیارد تومان",
    annualReturn: 25,
    duration: 12,
    minInvest: "۵ میلیون تومان",
    daysLeft: 30,
    investors: 530,
    createdAt: 20260822,
    palette: ["#8B95A1", "#5A6673"],
    accent: "#EEF0F3"
  },
  {
    id: "bagh-office",
    title: "مجتمع اداری باغستان",
    city: "شیراز",
    district: "معالی‌آباد",
    status: "new",
    statusLabel: "جدید",
    progress: 8,
    goal: "۹ میلیارد تومان",
    annualReturn: 22,
    duration: 12,
    minInvest: "۵ میلیون تومان",
    daysLeft: 60,
    investors: 95,
    createdAt: 20260904,
    palette: ["#19A974", "#0B5B39"],
    accent: "#E6F7F0"
  },
  {
    id: "ferdows-completed",
    title: "ویلاهای فردوس",
    city: "تهران",
    district: "لواسان",
    status: "done",
    statusLabel: "تکمیل‌شده",
    progress: 100,
    goal: "۱۵ میلیارد تومان",
    annualReturn: 27,
    duration: 18,
    minInvest: "۱۰ میلیون تومان",
    daysLeft: 0,
    investors: 980,
    createdAt: 20250510,
    palette: ["#C2CCD6", "#8B95A1"],
    accent: "#F7F8FA"
  }
];

/* تصویرسازی SVG اختصاصی برای هر پروژه (به‌جای عکس خارجی) */
function projectArt(project, seed) {
  const [c1, c2] = project.palette;
  const bg = project.accent;
  const s = seed || 0;
  return `
  <svg viewBox="0 0 400 250" role="img" aria-label="تصویرسازی ${project.title}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-${project.id}-${s}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="${bg}"/>
    <circle cx="${330 - s * 20}" cy="45" r="24" fill="#F2B84B" opacity="0.8"/>
    <rect x="${30 + s * 10}" y="${110 - s * 8}" width="70" height="140" rx="5" fill="#D7DEE6"/>
    <rect x="${115 + s * 6}" y="${70 - s * 10}" width="90" height="180" rx="5" fill="url(#g-${project.id}-${s})"/>
    <rect x="${220 - s * 4}" y="${120 + s * 6}" width="65" height="130" rx="5" fill="#C2CCD6"/>
    <rect x="${300 - s * 8}" y="${95 + s * 4}" width="75" height="155" rx="5" fill="#8B95A1"/>
    <g fill="#FFFFFF" opacity="0.85">
      <rect x="${128 + s * 6}" y="${86 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${152 + s * 6}" y="${86 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${176 + s * 6}" y="${86 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${128 + s * 6}" y="${112 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${152 + s * 6}" y="${112 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${176 + s * 6}" y="${112 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${128 + s * 6}" y="${138 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${152 + s * 6}" y="${138 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${176 + s * 6}" y="${138 - s * 10}" width="14" height="14" rx="3"/>
      <rect x="${44 + s * 10}" y="${126 - s * 8}" width="12" height="12" rx="3"/>
      <rect x="${68 + s * 10}" y="${126 - s * 8}" width="12" height="12" rx="3"/>
      <rect x="${44 + s * 10}" y="${150 - s * 8}" width="12" height="12" rx="3"/>
      <rect x="${68 + s * 10}" y="${150 - s * 8}" width="12" height="12" rx="3"/>
      <rect x="${312 - s * 8}" y="${110 + s * 4}" width="12" height="12" rx="3"/>
      <rect x="${336 - s * 8}" y="${110 + s * 4}" width="12" height="12" rx="3"/>
      <rect x="${312 - s * 8}" y="${134 + s * 4}" width="12" height="12" rx="3"/>
      <rect x="${336 - s * 8}" y="${134 + s * 4}" width="12" height="12" rx="3"/>
    </g>
    <rect x="0" y="246" width="400" height="4" fill="#E6E9ED"/>
  </svg>`;
}
