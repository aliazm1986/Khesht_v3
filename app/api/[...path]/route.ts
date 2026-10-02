import { NextRequest, NextResponse } from "next/server";
import {
  addAudit,
  addNotification,
  getDemoStore,
  getDemoUser,
  getProperty,
  projectSummary,
  toInvestmentLabel,
  toKycLabel,
  type InvestmentStatus,
  type KycStatus,
} from "@/lib/mock-backend";
import { properties } from "@/lib/data";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ path: string[] }> };

function response(data: unknown, status = 200) {
  return NextResponse.json({ ok: status < 400, data }, { status });
}

function error(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

async function body(request: NextRequest) {
  try {
    return await request.json() as Record<string, unknown>;
  } catch {
    return {};
  }
}

function numeric(value: unknown) {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
}

function demoContract(contractId: string) {
  const investment = getDemoStore().investments.find((item) => item.contractId === contractId || item.id === contractId);
  const project = investment ? getProperty(investment.projectId) : undefined;
  return {
    contract_id: contractId,
    user_id: getDemoUser().id,
    project_id: investment?.projectId ?? "shahrak-west",
    title: `قرارداد مشارکت مالی ${project?.name ?? "خشت"}`,
    template_version: "۱.۰-demo",
    sign_status: investment?.status === "allocated" ? "signed" : "pending",
    signed_at: investment?.status === "allocated" ? "۱۴۰۵/۰۵/۲۷" : null,
    signed_file_url: "/documents",
  };
}

async function handleGet(path: string[], request: NextRequest) {
  const store = getDemoStore();
  const [root, second, third, fourth] = path;

  if (root === "projects" && !second) return response(properties.map(projectSummary));
  if (root === "projects" && second && !third) {
    const project = getProperty(second);
    return project ? response({ ...projectSummary(project), details: project }) : error("پروژه پیدا نشد.", 404);
  }
  if (root === "projects" && second && third === "reports") {
    const project = getProperty(second);
    return project ? response(project.progressUpdates) : error("پروژه پیدا نشد.", 404);
  }
  if (root === "projects" && second && third === "documents") {
    const project = getProperty(second);
    return project ? response(project.documents) : error("پروژه پیدا نشد.", 404);
  }

  if (root === "me" && !second) return response({ ...getDemoUser(), kyc_label: toKycLabel(getDemoUser().kycStatus) });
  if (root === "me" && second === "kyc-status") return response({ status: getDemoUser().kycStatus, label: toKycLabel(getDemoUser().kycStatus), missing: ["تصویر کارت ملی", "تطبیق شماره شبا"] });
  if (root === "kyc" && second === "status") return response({ status: getDemoUser().kycStatus, label: toKycLabel(getDemoUser().kycStatus) });
  if (root === "me" && second === "investments") {
    return response(store.investments.map((investment) => ({
      ...investment,
      status_label: toInvestmentLabel(investment.status),
      project: projectSummary(getProperty(investment.projectId)!),
    })));
  }
  if (root === "investments" && second) {
    const investment = store.investments.find((item) => item.id === second);
    return investment ? response(investment) : error("درخواست سرمایه‌گذاری پیدا نشد.", 404);
  }
  if (root === "me" && second === "contracts") return response(store.investments.filter((item) => item.contractId).map((item) => demoContract(item.contractId!)));
  if (root === "contracts" && second) return response(demoContract(second));
  if (root === "me" && second === "documents") return response(store.documents);
  if (root === "documents" && second && third === "download") {
    const document = store.documents.find((item) => item.id === second);
    return document ? response({ ...document, download_url: "/documents", message: "فایل در MVP نمایشی است." }) : error("سند پیدا نشد.", 404);
  }
  if (root === "me" && second === "notifications") return response(store.notifications);
  if (root === "me" && second === "exit-requests") return response(store.exits.map((item) => ({ ...item, project: projectSummary(getProperty(item.projectId)!) })));
  if (root === "support" && second === "tickets") return response(store.tickets);

  if (root === "admin" && second === "users") {
    return response([
      ...store.users,
      { id: "usr_002", firstName: "مریم", lastName: "نمونه", mobile: "۰۹۳۵۰۰۰۰۰۰۰", role: "investor", tier: "gold", kycStatus: "approved", createdAt: "۱۴۰۵/۰۵/۲۴" },
      { id: "usr_003", firstName: "ناظر", lastName: "پایلوت", mobile: "۰۹۱۰۰۰۰۰۰۰۰", role: "auditor", tier: "titanium", kycStatus: "approved", createdAt: "۱۴۰۵/۰۵/۱۸" },
    ]);
  }
  if (root === "admin" && second === "projects") return response(properties.map(projectSummary));
  if (root === "admin" && second === "kyc-queue") return response(store.users.map((user) => ({ ...user, kyc_label: toKycLabel(user.kycStatus) })));
  if (root === "admin" && second === "audit-logs") return response(store.auditLogs);
  if (root === "admin" && second === "tickets") return response(store.tickets);

  return error(`مسیر GET /api/${path.join("/")} در نسخهٔ MVP تعریف نشده است.`, 404);
}

async function handlePost(path: string[], request: NextRequest) {
  const store = getDemoStore();
  const data = await body(request);
  const [root, second, third, fourth] = path;

  if (root === "auth" && second === "send-otp") {
    const mobile = String(data.mobile ?? "");
    if (mobile.replace(/\D/g, "").length < 10) return error("شمارهٔ موبایل معتبر وارد کنید.");
    addAudit("ارسال OTP نمایشی", mobile);
    return response({ mobile, expires_in: 120, otp_preview: "123456", message: "کد نمایشی برای تست: ۱۲۳۴۵۶" });
  }
  if (root === "auth" && second === "verify-otp") {
    if (String(data.code ?? "") !== "123456") return error("کد نمایشی صحیح نیست. برای تست از ۱۲۳۴۵۶ استفاده کنید.");
    addAudit("تأیید OTP نمایشی", String(data.mobile ?? getDemoUser().mobile));
    return response({ access_token: "khisht-demo-token", user: getDemoUser(), next: "/dashboard" });
  }
  if (root === "auth" && second === "register") {
    const user = getDemoUser();
    user.firstName = String(data.firstName ?? user.firstName);
    user.lastName = String(data.lastName ?? user.lastName);
    user.mobile = String(data.mobile ?? user.mobile);
    user.nationalId = String(data.nationalId ?? user.nationalId);
    user.email = String(data.email ?? user.email);
    addAudit("تکمیل ثبت‌نام نمایشی", user.id);
    addNotification({ title: "ثبت‌نام تکمیل شد", body: "برای سرمایه‌گذاری، مرحلهٔ احراز هویت را تکمیل کنید.", type: "action", href: "/kyc" });
    return response({ user, next: "/kyc" }, 201);
  }
  if (root === "auth" && (second === "login" || second === "logout")) {
    addAudit(second === "login" ? "ورود نمایشی" : "خروج نمایشی", getDemoUser().id);
    return response({ message: second === "login" ? "ورود نمایشی انجام شد." : "خروج نمایشی انجام شد." });
  }

  if (root === "kyc" && (second === "submit" || second === "upload-documents")) {
    const user = getDemoUser();
    user.kycStatus = "in_review";
    addAudit(second === "submit" ? "ثبت KYC" : "بارگذاری مدرک KYC", user.id);
    addNotification({ title: "احراز هویت در حال بررسی است", body: "اطلاعات KYC شما در صف بررسی نمایشی قرار گرفت.", type: "kyc", href: "/kyc" });
    return response({ status: user.kycStatus, label: toKycLabel(user.kycStatus), submitted: data }, 201);
  }
  if (root === "me" && second === "bank-account") {
    const user = getDemoUser();
    user.iban = String(data.iban ?? user.iban);
    addAudit("ثبت شماره شبا", user.id);
    return response({ iban: user.iban });
  }

  if (root === "investments" && !second) {
    const projectId = String(data.project_id ?? "");
    const project = getProperty(projectId);
    const amount = numeric(data.amount);
    if (!project) return error("پروژه انتخاب‌شده پیدا نشد.", 404);
    if (amount < project.minimumInvestment) return error(`حداقل مبلغ این پروژه ${project.minimumInvestment.toLocaleString("fa-IR")} تومان است.`);
    const investment = {
      id: `inv_${Date.now()}`,
      userId: getDemoUser().id,
      projectId,
      amount,
      units: Math.floor(amount / project.tokenPriceCurrent),
      status: "pending_payment" as InvestmentStatus,
      paymentStatus: "pending" as const,
      createdAt: "۱۴۰۵/۰۶/۱۰",
    };
    store.investments.unshift(investment);
    addAudit("ثبت درخواست سرمایه‌گذاری", project.name);
    addNotification({ title: "درخواست سرمایه‌گذاری ثبت شد", body: `درخواست نمایشی شما برای ${project.name} در انتظار پرداخت است.`, type: "investment", href: "/dashboard" });
    return response(investment, 201);
  }
  if (root === "investments" && second && third === "pay") {
    const investment = store.investments.find((item) => item.id === second);
    if (!investment) return error("درخواست سرمایه‌گذاری پیدا نشد.", 404);
    investment.paymentStatus = "paid";
    investment.status = "allocated";
    investment.contractId = `ctr_${Date.now()}`;
    investment.certificateId = `cert_${Date.now()}`;
    const project = getProperty(investment.projectId)!;
    store.documents.unshift(
      { id: investment.contractId, title: `قرارداد مشارکت مالی ${project.name}`, category: "قرارداد امضاشده", issuedAt: "۱۴۰۵/۰۶/۱۰", version: "۱.۰", hash: `KH-CTR-${Date.now().toString().slice(-6)}`, access: "شخصی", projectId: project.slug },
      { id: investment.certificateId, title: `گواهی حق مالی ${project.tokenName}`, category: "گواهی حق مالی", issuedAt: "۱۴۰۵/۰۶/۱۰", version: "۱.۰", hash: `KH-CERT-${Date.now().toString().slice(-6)}`, access: "شخصی", projectId: project.slug },
    );
    addAudit("ثبت پرداخت و تخصیص نمایشی", project.name);
    addNotification({ title: "پرداخت نمایشی تأیید شد", body: "گواهی حق مالی و قرارداد شما در مرکز اسناد ایجاد شد.", type: "investment", href: "/documents" });
    return response({ ...investment, receipt_id: `pay_${Date.now()}` });
  }
  if (root === "contracts" && second && third === "sign") {
    addAudit("امضای الکترونیک نمایشی", second);
    return response({ ...demoContract(second), sign_status: "signed", signed_at: "۱۴۰۵/۰۶/۱۰" });
  }

  if (root === "exit-requests") {
    const projectId = String(data.project_id ?? "");
    if (!getProperty(projectId)) return error("پروژه پیدا نشد.", 404);
    const exit = { id: `exit_${Date.now()}`, projectId, amount: numeric(data.amount), reason: String(data.reason ?? "بدون توضیح"), status: "submitted" as const, requestedAt: "۱۴۰۵/۰۶/۱۰" };
    store.exits.unshift(exit);
    addAudit("ثبت درخواست خروج", projectId);
    addNotification({ title: "درخواست خروج ثبت شد", body: "درخواست نمایشی شما برای بررسی اپراتور در صف قرار گرفت.", type: "action", href: "/exit" });
    return response(exit, 201);
  }

  if (root === "support" && second === "tickets") {
    const ticket = {
      id: `tkt_${Date.now()}`,
      subject: String(data.subject ?? "درخواست پشتیبانی"),
      category: (data.category ?? "فنی") as "مالی" | "حقوقی" | "فنی" | "احراز هویت" | "پروژه‌ها",
      message: String(data.message ?? ""),
      status: "open" as const,
      createdAt: "۱۴۰۵/۰۶/۱۰",
      replies: [],
    };
    store.tickets.unshift(ticket);
    addAudit("ثبت تیکت پشتیبانی", ticket.id);
    return response(ticket, 201);
  }
  if (root === "me" && second === "notifications" && third === "read-all") {
    store.notifications.forEach((notification) => { notification.read = true; });
    return response({ count: store.notifications.length });
  }

  if (root === "admin" && second === "projects") {
    addAudit("ثبت پروژه در پنل ادمین", String(data.title ?? "پروژهٔ جدید"), "admin_demo");
    return response({ project_id: `prj_${Date.now()}`, status: "draft", ...data }, 201);
  }
  if (root === "admin" && second === "kyc" && third && (fourth === "approve" || fourth === "reject")) {
    const user = store.users.find((item) => item.id === third) ?? getDemoUser();
    user.kycStatus = fourth === "approve" ? "approved" : "rejected";
    addAudit(fourth === "approve" ? "تأیید KYC" : "رد KYC", user.id, "admin_demo");
    return response({ user_id: user.id, status: user.kycStatus, label: toKycLabel(user.kycStatus) });
  }

  return error(`مسیر POST /api/${path.join("/")} در نسخهٔ MVP تعریف نشده است.`, 404);
}

async function handlePut(path: string[], request: NextRequest) {
  const data = await body(request);
  const [root, second, third] = path;
  if (root === "me" && second === "profile") {
    const user = getDemoUser();
    const allowed = ["firstName", "lastName", "nationalId", "mobile", "email", "birthDate", "postalCode", "address", "iban"] as const;
    allowed.forEach((key) => {
      if (typeof data[key] === "string") user[key] = data[key] as never;
    });
    addAudit("ویرایش پروفایل", user.id);
    return response(user);
  }
  if (root === "admin" && second === "projects" && third) {
    addAudit("ویرایش پروژه در پنل ادمین", third, "admin_demo");
    return response({ project_id: third, updated: data });
  }
  return error(`مسیر PUT /api/${path.join("/")} در نسخهٔ MVP تعریف نشده است.`, 404);
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handleGet((await context.params).path, request);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handlePost((await context.params).path, request);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handlePut((await context.params).path, request);
}
