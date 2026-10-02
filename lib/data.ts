export type InvestorTier = "bronze" | "silver" | "gold" | "titanium";
export type PropertyAccent = "coral" | "brick" | "wine" | "sand";

export type LifecycleItem = {
  title: string;
  status: "done" | "current" | "upcoming";
  note: string;
};

export type DocumentItem = {
  title: string;
  category: string;
  date: string;
  access: "عمومی" | "سطح نقره‌ای" | "سطح طلایی" | "سطح تیتانیومی";
  status: string;
};

export type ProgressItem = {
  stage: string;
  date: string;
  progress: number;
  note: string;
  image: string;
};

export type Property = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  accent: PropertyAccent;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  projectValuation: number;
  targetCapital: number;
  raisedCapital: number;
  tokenName: string;
  tokenSymbol: string;
  tokenPriceInitial: number;
  tokenPriceCurrent: number;
  totalTokenSupply: number;
  availableTokenSupply: number;
  simulatedHolders: number;
  minimumInvestment: number;
  minimumTokens: number;
  estimatedReturnLow: number;
  estimatedReturnBase: number;
  estimatedReturnHigh: number;
  rentalYield: number;
  progress: number;
  plannedProgress: number;
  actualProgress: number;
  riskLevel: "پایین" | "متوسط" | "بالا";
  lockup: string;
  exitStrategy: string;
  valuationDate: string;
  nextValuationDate: string;
  lifecycle: LifecycleItem[];
  documents: DocumentItem[];
  progressUpdates: ProgressItem[];
};

const commonLifecycle: LifecycleItem[] = [
  { title: "بررسی و پذیرش پروژه", status: "done", note: "غربال‌گری نمونه" },
  { title: "ارزش‌گذاری اولیه", status: "done", note: "گزارش کارشناسی نمونه" },
  { title: "عرضهٔ اولیهٔ توکن", status: "current", note: "در محیط نمایشی" },
  { title: "نگهداری در توکن طلا", status: "upcoming", note: "مکانیزم فرضی" },
  { title: "شروع پروژه", status: "upcoming", note: "پس از تأمین" },
  { title: "تبدیل به توکن خشت", status: "upcoming", note: "توکن پروژه" },
  { title: "گزارش‌دهی دوره‌ای", status: "upcoming", note: "ارزش‌گذاری و پیشرفت" },
  { title: "بازار ثانویه", status: "upcoming", note: "مشروط به خریدار" },
  { title: "تکمیل پروژه", status: "upcoming", note: "تحویل نمایشی" },
  { title: "اجاره، فروش یا تسویه", status: "upcoming", note: "سناریوی خروج" },
];

const baseDocuments: DocumentItem[] = [
  { title: "خلاصهٔ معرفی پروژه", category: "خلاصه پروژه", date: "۱۴۰۵/۰۵/۱۲", access: "عمومی", status: "منتشرشده" },
  { title: "ارزش‌گذاری کارشناسی نمونه", category: "ارزش‌گذاری", date: "۱۴۰۵/۰۵/۱۲", access: "سطح نقره‌ای", status: "به‌روزرسانی‌شده" },
  { title: "گزارش پیشرفت دوره‌ای", category: "گزارش پیشرفت", date: "۱۴۰۵/۰۴/۲۸", access: "عمومی", status: "منتشرشده" },
  { title: "دفترچهٔ فنی و مشخصات ساخت", category: "اسناد فنی", date: "۱۴۰۵/۰۴/۲۶", access: "سطح طلایی", status: "منتشرشده" },
  { title: "مدل مالی تفصیلی نمونه", category: "اسناد مالی", date: "۱۴۰۵/۰۴/۲۵", access: "سطح طلایی", status: "محرمانه نمایشی" },
  { title: "چارچوب قراردادی و ضمائم حقوقی", category: "اسناد حقوقی", date: "۱۴۰۵/۰۴/۲۲", access: "سطح طلایی", status: "منتشرشده" },
  { title: "قراردادها و ضمائم داده‌نما", category: "اتاق داده", date: "۱۴۰۵/۰۴/۲۰", access: "سطح تیتانیومی", status: "در انتظار بررسی" },
];

const progressUpdates: ProgressItem[] = [
  { stage: "اسکلت سازه", date: "۱۴۰۵/۰۴/۲۸", progress: 68, note: "طبقات اصلی تکمیل و کنترل کیفیت نمونه انجام شد.", image: "/projects/khest-progress.png" },
  { stage: "نمای خارجی", date: "۱۴۰۵/۰۳/۱۵", progress: 46, note: "نمونهٔ مصالح نما و جزئیات پنجره‌ها بررسی شد.", image: "/projects/khest-exterior.png" },
  { stage: "تصویر معماری", date: "۱۴۰۵/۰۲/۰۹", progress: 27, note: "رندر معماری برای مقایسهٔ مسیر پروژه ثبت شد.", image: "/projects/khest-hero.png" },
  { stage: "فضای داخلی", date: "۱۴۰۵/۰۱/۲۲", progress: 18, note: "پالت داخلی و چیدمان عملکردی در نسخهٔ نمایشی.", image: "/projects/khest-interior.png" },
];

export const properties: Property[] = [
  {
    slug: "shahrak-west",
    name: "شهرک غرب، برج آفتاب",
    location: "تهران · شهرک غرب",
    type: "مسکونی",
    status: "در حال تأمین نمایشی",
    accent: "coral",
    image: "/projects/khest-hero.png",
    gallery: ["/projects/khest-hero.png", "/projects/khest-exterior.png", "/projects/khest-interior.png", "/projects/khest-progress.png"],
    description: "واحد نوساز با نورگیری دوطرفه و دسترسی سریع به محورهای اصلی؛ برای نمایش مسیر تبدیل یک پروژهٔ ملکی به توکن‌های خشت.",
    features: ["۱۱۸ متر", "۲ خواب", "پارکینگ", "تحویل آماده"],
    projectValuation: 38_500_000_000,
    targetCapital: 12_000_000_000,
    raisedCapital: 8_880_000_000,
    tokenName: "توکن خشت آفتاب",
    tokenSymbol: "KH-AFTAB",
    tokenPriceInitial: 500_000,
    tokenPriceCurrent: 545_000,
    totalTokenSupply: 77_000,
    availableTokenSupply: 59_240,
    simulatedHolders: 186,
    minimumInvestment: 500_000,
    minimumTokens: 1,
    estimatedReturnLow: 14,
    estimatedReturnBase: 27,
    estimatedReturnHigh: 34,
    rentalYield: 8,
    progress: 74,
    plannedProgress: 71,
    actualProgress: 74,
    riskLevel: "متوسط",
    lockup: "۱۲ ماه نمونه",
    exitStrategy: "اجارهٔ واحد و بازار ثانویهٔ نمایشی",
    valuationDate: "۱۴۰۵/۰۵/۱۲",
    nextValuationDate: "۱۴۰۵/۰۸/۱۲",
    lifecycle: commonLifecycle,
    documents: baseDocuments,
    progressUpdates,
  },
  {
    slug: "narvan-renovation",
    name: "بازسازی نارون",
    location: "تهران · یوسف‌آباد",
    type: "بازسازی",
    status: "آمادهٔ عرضهٔ نمایشی",
    accent: "wine",
    image: "/projects/khest-exterior.png",
    gallery: ["/projects/khest-exterior.png", "/projects/khest-interior.png", "/projects/khest-hero.png", "/projects/khest-progress.png"],
    description: "بازسازی یک ساختمان شهری با تمرکز بر استفادهٔ مجدد از سازه و تعریف درآمد اجاره‌ای قابل‌ردیابی در محیط نمونه.",
    features: ["۹۸۰ متر زیربنا", "۱۴ واحد", "بازسازی کامل", "قرارداد اجارهٔ نمونه"],
    projectValuation: 29_800_000_000,
    targetCapital: 9_500_000_000,
    raisedCapital: 9_500_000_000,
    tokenName: "توکن خشت نارون",
    tokenSymbol: "KH-NARVAN",
    tokenPriceInitial: 500_000,
    tokenPriceCurrent: 525_000,
    totalTokenSupply: 59_600,
    availableTokenSupply: 0,
    simulatedHolders: 214,
    minimumInvestment: 500_000,
    minimumTokens: 1,
    estimatedReturnLow: 12,
    estimatedReturnBase: 23,
    estimatedReturnHigh: 30,
    rentalYield: 9,
    progress: 100,
    plannedProgress: 100,
    actualProgress: 100,
    riskLevel: "پایین",
    lockup: "۹ ماه نمونه",
    exitStrategy: "درآمد اجاره و تسویهٔ نمایشی",
    valuationDate: "۱۴۰۵/۰۵/۰۵",
    nextValuationDate: "۱۴۰۵/۰۸/۰۵",
    lifecycle: commonLifecycle.map((item, index) => ({ ...item, status: index < 7 ? "done" : index === 7 ? "current" : "upcoming" })),
    documents: baseDocuments,
    progressUpdates,
  },
  {
    slug: "kish-marina",
    name: "کیش مارینا رزیدنس",
    location: "کیش · مرجان",
    type: "تفریحی",
    status: "به‌زودی",
    accent: "brick",
    image: "/projects/khest-interior.png",
    gallery: ["/projects/khest-interior.png", "/projects/khest-hero.png", "/projects/khest-exterior.png", "/projects/khest-progress.png"],
    description: "سوئیت ساحلی با مدیریت اجارهٔ کوتاه‌مدت و چشم‌انداز خلیج؛ طراحی‌شده برای نمایش جریان درآمد فصلی.",
    features: ["۷۲ متر", "ویوی دریا", "استخر", "مدیریت اجاره"],
    projectValuation: 61_200_000_000,
    targetCapital: 18_000_000_000,
    raisedCapital: 8_640_000_000,
    tokenName: "توکن خشت مارینا",
    tokenSymbol: "KH-MARINA",
    tokenPriceInitial: 750_000,
    tokenPriceCurrent: 790_000,
    totalTokenSupply: 81_600,
    availableTokenSupply: 46_080,
    simulatedHolders: 93,
    minimumInvestment: 750_000,
    minimumTokens: 1,
    estimatedReturnLow: 16,
    estimatedReturnBase: 31,
    estimatedReturnHigh: 38,
    rentalYield: 11,
    progress: 48,
    plannedProgress: 52,
    actualProgress: 48,
    riskLevel: "بالا",
    lockup: "۱۸ ماه نمونه",
    exitStrategy: "اجارهٔ کوتاه‌مدت و بازار ثانویهٔ نمایشی",
    valuationDate: "۱۴۰۵/۰۴/۲۲",
    nextValuationDate: "۱۴۰۵/۰۷/۲۲",
    lifecycle: commonLifecycle,
    documents: baseDocuments,
    progressUpdates,
  },
  {
    slug: "mirdamad-office",
    name: "میرداماد، خانه‌کار",
    location: "تهران · میرداماد",
    type: "اداری",
    status: "تکمیل‌شده",
    accent: "wine",
    image: "/projects/khest-interior.png",
    gallery: ["/projects/khest-interior.png", "/projects/khest-exterior.png", "/projects/khest-hero.png", "/projects/khest-progress.png"],
    description: "طبقهٔ اداری کامل با مستأجر شرکتی نمونه و قرارداد بلندمدت؛ انتخابی کم‌دردسر برای سبد درآمدی نمایشی.",
    features: ["۲۶۵ متر", "مستأجر فعال", "لابی اختصاصی", "دسترسی مترو"],
    projectValuation: 44_000_000_000,
    targetCapital: 14_500_000_000,
    raisedCapital: 14_500_000_000,
    tokenName: "توکن خشت خانه‌کار",
    tokenSymbol: "KH-MIRDAMAD",
    tokenPriceInitial: 1_000_000,
    tokenPriceCurrent: 1_085_000,
    totalTokenSupply: 44_000,
    availableTokenSupply: 0,
    simulatedHolders: 241,
    minimumInvestment: 1_000_000,
    minimumTokens: 1,
    estimatedReturnLow: 13,
    estimatedReturnBase: 24,
    estimatedReturnHigh: 29,
    rentalYield: 10,
    progress: 100,
    plannedProgress: 98,
    actualProgress: 100,
    riskLevel: "پایین",
    lockup: "۶ ماه نمونه",
    exitStrategy: "درآمد اجاره و فروش نمایشی",
    valuationDate: "۱۴۰۵/۰۵/۰۱",
    nextValuationDate: "۱۴۰۵/۰۸/۰۱",
    lifecycle: commonLifecycle.map((item, index) => ({ ...item, status: index < 9 ? "done" : "current" })),
    documents: baseDocuments,
    progressUpdates,
  },
  {
    slug: "lavasan-garden",
    name: "باغ‌خانهٔ لواسان",
    location: "لواسان · کندعلیا",
    type: "ویلایی",
    status: "در حال تأمین نمایشی",
    accent: "sand",
    image: "/projects/khest-progress.png",
    gallery: ["/projects/khest-progress.png", "/projects/khest-hero.png", "/projects/khest-interior.png", "/projects/khest-exterior.png"],
    description: "ویلای باغی با معماری آجری و حیاط خصوصی؛ ترکیبی از حفظ ارزش و درآمد اجارهٔ آخرهفته در مدل مفهومی.",
    features: ["۳۲۰ متر زمین", "۴ خواب", "حیاط خصوصی", "آمادهٔ بهره‌برداری"],
    projectValuation: 52_800_000_000,
    targetCapital: 16_000_000_000,
    raisedCapital: 9_920_000_000,
    tokenName: "توکن خشت باغ‌خانه",
    tokenSymbol: "KH-LAVASAN",
    tokenPriceInitial: 650_000,
    tokenPriceCurrent: 675_000,
    totalTokenSupply: 81_230,
    availableTokenSupply: 30_150,
    simulatedHolders: 117,
    minimumInvestment: 650_000,
    minimumTokens: 1,
    estimatedReturnLow: 15,
    estimatedReturnBase: 29,
    estimatedReturnHigh: 36,
    rentalYield: 7,
    progress: 62,
    plannedProgress: 65,
    actualProgress: 62,
    riskLevel: "بالا",
    lockup: "۱۵ ماه نمونه",
    exitStrategy: "اجارهٔ آخرهفته و فروش نمایشی",
    valuationDate: "۱۴۰۵/۰۴/۲۸",
    nextValuationDate: "۱۴۰۵/۰۷/۲۸",
    lifecycle: commonLifecycle,
    documents: baseDocuments,
    progressUpdates,
  },
  {
    slug: "mashhad-axis",
    name: "محور مشهد",
    location: "مشهد · سجاد",
    type: "تجاری",
    status: "در حال بررسی",
    accent: "coral",
    image: "/projects/khest-exterior.png",
    gallery: ["/projects/khest-exterior.png", "/projects/khest-interior.png", "/projects/khest-progress.png", "/projects/khest-hero.png"],
    description: "فضای تجاری محلی با تمرکز بر جریان اجاره و گزارش‌دهی مرحله‌ای؛ در انتظار تکمیل بررسی‌های نمونه.",
    features: ["۱٬۱۰۰ متر", "واحدهای تجاری", "پارکینگ", "گزارش ماهانه"],
    projectValuation: 70_000_000_000,
    targetCapital: 21_000_000_000,
    raisedCapital: 5_460_000_000,
    tokenName: "توکن خشت محور",
    tokenSymbol: "KH-AXIS",
    tokenPriceInitial: 900_000,
    tokenPriceCurrent: 900_000,
    totalTokenSupply: 77_770,
    availableTokenSupply: 71_703,
    simulatedHolders: 54,
    minimumInvestment: 900_000,
    minimumTokens: 1,
    estimatedReturnLow: 11,
    estimatedReturnBase: 21,
    estimatedReturnHigh: 27,
    rentalYield: 9,
    progress: 31,
    plannedProgress: 35,
    actualProgress: 31,
    riskLevel: "بالا",
    lockup: "۲۴ ماه نمونه",
    exitStrategy: "اجارهٔ تجاری و بازار ثانویهٔ نمایشی",
    valuationDate: "۱۴۰۵/۰۳/۳۰",
    nextValuationDate: "۱۴۰۵/۰۶/۳۰",
    lifecycle: commonLifecycle.map((item, index) => ({ ...item, status: index < 2 ? "done" : index === 2 ? "current" : "upcoming" })),
    documents: baseDocuments,
    progressUpdates,
  },
];

export const tiers: Array<{ id: InvestorTier; name: string; detail: string; access: string; color: string }> = [
  { id: "bronze", name: "برنزی", detail: "سرمایهٔ خرد", access: "پروژه‌های عمومی و گزارش‌های خلاصه", color: "#b56f4a" },
  { id: "silver", name: "نقره‌ای", detail: "سرمایهٔ متوسط", access: "گزارش‌های مالی و پیشرفت گسترده‌تر", color: "#87919a" },
  { id: "gold", name: "طلایی", detail: "سرمایهٔ بالا", access: "ارزش‌گذاری و اتاق اسناد تفصیلی", color: "#b79042" },
  { id: "titanium", name: "تیتانیومی", detail: "سرمایهٔ خیلی بالا", access: "دسترسی کامل به داده‌نما و ضمائم", color: "#596977" },
];

export const formatToman = (value: number) => new Intl.NumberFormat("fa-IR").format(Math.round(value));
export const formatCompactToman = (value: number) => {
  if (value >= 1_000_000_000) return `${formatToman(value / 1_000_000_000)} میلیارد`;
  if (value >= 1_000_000) return `${formatToman(value / 1_000_000)} میلیون`;
  return formatToman(value);
};

export const legalDisclaimerShort =
  "این محیط صرفاً نمایشی است و هیچ‌گونه پیشنهاد سرمایه‌گذاری، فروش ملک، صدور توکن، تضمین سرمایه، انتقال مالکیت رسمی یا معاملهٔ واقعی در آن انجام نمی‌شود.";

export const legalDisclaimer =
  "این وب‌سایت یک نمونهٔ آزمایشی از تجربهٔ کاربری پلتفرم خشت است. اطلاعات پروژه‌ها، قیمت توکن‌ها، ارقام بازدهی، اسناد، ارزش‌گذاری‌ها و محاسبات کاملاً آزمایشی هستند و به‌منزلهٔ پیشنهاد سرمایه‌گذاری، مشاورهٔ مالی، فروش ملک، صدور اوراق بهادار، صدور توکن، تضمین اصل سرمایه، تضمین بازدهی یا انتقال مالکیت رسمی نیستند. هرگونه فعالیت واقعی در این حوزه منوط به اخذ مجوزهای قانونی لازم، ایجاد ساختار حقوقی مناسب و همکاری با نهادهای دارای مجوز خواهد بود.";
