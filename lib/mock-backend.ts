import { properties, type Property } from "./data";

export type KycStatus = "not_started" | "needs_completion" | "in_review" | "approved" | "rejected";
export type InvestmentStatus = "draft" | "pending_payment" | "paid" | "allocated" | "cancelled";
export type ExitStatus = "submitted" | "in_review" | "approved" | "rejected";

export type DemoUser = {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  email: string;
  birthDate: string;
  postalCode: string;
  address: string;
  iban: string;
  role: "investor" | "operator" | "admin" | "auditor";
  tier: "bronze" | "silver" | "gold" | "titanium";
  kycStatus: KycStatus;
  createdAt: string;
};

export type DemoInvestment = {
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  units: number;
  status: InvestmentStatus;
  paymentStatus: "unpaid" | "pending" | "paid";
  contractId?: string;
  certificateId?: string;
  createdAt: string;
};

export type DemoDocument = {
  id: string;
  title: string;
  category: string;
  issuedAt: string;
  version: string;
  hash: string;
  access: "عمومی" | "شخصی" | "سطح طلایی";
  projectId?: string;
};

export type DemoNotification = {
  id: string;
  title: string;
  body: string;
  type: "kyc" | "investment" | "project" | "legal" | "action";
  read: boolean;
  createdAt: string;
  href?: string;
};

export type DemoTicket = {
  id: string;
  subject: string;
  category: "مالی" | "حقوقی" | "فنی" | "احراز هویت" | "پروژه‌ها";
  message: string;
  status: "open" | "answered" | "closed";
  createdAt: string;
  replies: Array<{ id: string; author: string; message: string; createdAt: string }>;
};

export type DemoExitRequest = {
  id: string;
  projectId: string;
  amount: number;
  reason: string;
  status: ExitStatus;
  requestedAt: string;
  reviewedAt?: string;
};

export type AuditEntry = {
  id: string;
  action: string;
  actor: string;
  target: string;
  createdAt: string;
  ip: string;
};

type DemoStore = {
  users: DemoUser[];
  investments: DemoInvestment[];
  documents: DemoDocument[];
  notifications: DemoNotification[];
  tickets: DemoTicket[];
  exits: DemoExitRequest[];
  auditLogs: AuditEntry[];
};

const demoUser: DemoUser = {
  id: "usr_demo_ali",
  firstName: "علی",
  lastName: "آزمایشی",
  nationalId: "۰۰۱۲۳۴۵۶۷۸",
  mobile: "۰۹۱۲۰۰۰۰۰۰۰",
  email: "ali@example.test",
  birthDate: "۱۳۶۵/۰۸/۱۲",
  postalCode: "۱۴۳۵۸۱۳۷۶۵",
  address: "تهران، نشانی نمایشی برای تست جریان KYC",
  iban: "IR۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰",
  role: "investor",
  tier: "silver",
  kycStatus: "needs_completion",
  createdAt: "۱۴۰۵/۰۶/۱۰",
};

function createInitialStore(): DemoStore {
  return {
    users: [demoUser],
    investments: [
      {
        id: "inv_001",
        userId: demoUser.id,
        projectId: "shahrak-west",
        amount: 12_000_000,
        units: 24,
        status: "allocated",
        paymentStatus: "paid",
        contractId: "ctr_001",
        certificateId: "cert_001",
        createdAt: "۱۴۰۵/۰۵/۲۷",
      },
    ],
    documents: [
      { id: "doc_contract_001", title: "قرارداد مشارکت مالی نمایشی", category: "قرارداد امضاشده", issuedAt: "۱۴۰۵/۰۵/۲۷", version: "۱.۰", hash: "KH-CTR-9E7A-001", access: "شخصی", projectId: "shahrak-west" },
      { id: "doc_certificate_001", title: "گواهی حق مالی خشت آفتاب", category: "گواهی حق مالی", issuedAt: "۱۴۰۵/۰۵/۲۸", version: "۱.۰", hash: "KH-CERT-4B71-001", access: "شخصی", projectId: "shahrak-west" },
      { id: "doc_report_001", title: "گزارش پیشرفت شهریور ۱۴۰۵", category: "گزارش پروژه", issuedAt: "۱۴۰۵/۰۶/۰۶", version: "۱.۲", hash: "KH-RPT-6D80-001", access: "عمومی", projectId: "shahrak-west" },
      { id: "doc_receipt_001", title: "رسید پرداخت نمایشی", category: "رسید پرداخت", issuedAt: "۱۴۰۵/۰۵/۲۷", version: "۱.۰", hash: "KH-PAY-8C12-001", access: "شخصی", projectId: "shahrak-west" },
    ],
    notifications: [
      { id: "ntf_001", title: "نیاز به تکمیل احراز هویت", body: "برای ثبت درخواست سرمایه‌گذاری، شماره شبا و تصویر مدارک را در پروفایل تکمیل کنید.", type: "action", read: false, createdAt: "۱۴۰۵/۰۶/۱۰ · ۰۹:۴۵", href: "/kyc" },
      { id: "ntf_002", title: "گزارش جدید پروژه منتشر شد", body: "گزارش پیشرفت شهریور برج آفتاب در اتاق اسناد قرار گرفت.", type: "project", read: false, createdAt: "۱۴۰۵/۰۶/۰۶ · ۱۲:۲۰", href: "/projects/shahrak-west/documents" },
      { id: "ntf_003", title: "گواهی حق مالی صادر شد", body: "گواهی نمایشی شما برای پروژهٔ برج آفتاب قابل مشاهده است.", type: "investment", read: true, createdAt: "۱۴۰۵/۰۵/۲۸ · ۱۶:۱۰", href: "/documents" },
    ],
    tickets: [
      { id: "tkt_001", subject: "پرسش دربارهٔ گزارش ارزش‌گذاری", category: "پروژه‌ها", message: "آیا نسخهٔ بعدی گزارش چه زمانی منتشر می‌شود؟", status: "answered", createdAt: "۱۴۰۵/۰۶/۰۴", replies: [{ id: "reply_001", author: "پشتیبانی خشت", message: "در نسخهٔ پایلوت، انتشار گزارش‌ها به‌صورت نمایشی انجام می‌شود و زمان‌بندی واقعی ندارد.", createdAt: "۱۴۰۵/۰۶/۰۵" }] },
    ],
    exits: [
      { id: "exit_001", projectId: "shahrak-west", amount: 2_000_000, reason: "بررسی فرآیند خروج در نسخهٔ پایلوت", status: "in_review", requestedAt: "۱۴۰۵/۰۶/۰۸" },
    ],
    auditLogs: [
      { id: "aud_001", action: "ثبت‌نام نمایشی", actor: "usr_demo_ali", target: "پروفایل کاربر", createdAt: "۱۴۰۵/۰۵/۲۰ · ۱۰:۱۵", ip: "127.0.0.1" },
      { id: "aud_002", action: "ثبت درخواست سرمایه‌گذاری", actor: "usr_demo_ali", target: "شهرک غرب، برج آفتاب", createdAt: "۱۴۰۵/۰۵/۲۷ · ۱۲:۳۲", ip: "127.0.0.1" },
      { id: "aud_003", action: "صدور گواهی حق مالی", actor: "system", target: "cert_001", createdAt: "۱۴۰۵/۰۵/۲۸ · ۱۶:۱۰", ip: "internal" },
    ],
  };
}

declare global {
  var __khishtDemoStore: DemoStore | undefined;
}

export function getDemoStore() {
  if (!globalThis.__khishtDemoStore) globalThis.__khishtDemoStore = createInitialStore();
  return globalThis.__khishtDemoStore;
}

export function getDemoUser() {
  return getDemoStore().users[0];
}

export function getProperty(projectId: string): Property | undefined {
  return properties.find((project) => project.slug === projectId);
}

export function projectSummary(project: Property) {
  return {
    project_id: project.slug,
    title: project.name,
    slug: project.slug,
    short_description: project.description,
    type: project.type,
    structure: "SPV / قرارداد نمونه",
    sponsor_id: "sponsor_demo_001",
    target_amount: project.targetCapital,
    raised_amount: project.raisedCapital,
    minimum_investment: project.minimumInvestment,
    start_date: "۱۴۰۵/۰۱/۱۵",
    estimated_end_date: "۱۴۰۶/۰۳/۳۱",
    risk_level: project.riskLevel,
    status: project.status,
    progress: project.progress,
    target_return: project.estimatedReturnBase,
    cover_image: project.image,
  };
}

export function addAudit(action: string, target: string, actor = getDemoUser().id) {
  const store = getDemoStore();
  store.auditLogs.unshift({
    id: `aud_${Date.now()}`,
    action,
    actor,
    target,
    createdAt: "۱۴۰۵/۰۶/۱۰ · اکنون",
    ip: "127.0.0.1",
  });
}

export function addNotification(notification: Omit<DemoNotification, "id" | "createdAt" | "read">) {
  const store = getDemoStore();
  store.notifications.unshift({
    id: `ntf_${Date.now()}`,
    createdAt: "۱۴۰۵/۰۶/۱۰ · اکنون",
    read: false,
    ...notification,
  });
}

export function toKycLabel(status: KycStatus) {
  return {
    not_started: "شروع نشده",
    needs_completion: "نیازمند تکمیل",
    in_review: "در حال بررسی",
    approved: "تأیید شده",
    rejected: "رد شده",
  }[status];
}

export function toInvestmentLabel(status: InvestmentStatus) {
  return {
    draft: "پیش‌نویس",
    pending_payment: "در انتظار پرداخت",
    paid: "پرداخت‌شده",
    allocated: "تخصیص‌یافته",
    cancelled: "لغوشده",
  }[status];
}
