"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Download, Eye, FileText, LifeBuoy, LoaderCircle, LogOut, MessageSquarePlus, ReceiptText, Save, Send, UserRound } from "lucide-react";
import { properties, formatToman } from "@/lib/data";

type ApiResult<T> = { ok: boolean; data?: T; error?: string };

async function getData<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, init);
  const result = await response.json() as ApiResult<T>;
  if (!response.ok || !result.ok || result.data === undefined) throw new Error(result.error ?? "خطا در ارتباط با نسخهٔ نمایشی");
  return result.data;
}

type UserDocument = { id: string; title: string; category: string; issuedAt: string; version: string; hash: string; access: string; projectId?: string };
type Notification = { id: string; title: string; body: string; type: string; read: boolean; createdAt: string; href?: string };
type Ticket = { id: string; subject: string; category: string; message: string; status: string; createdAt: string; replies: Array<{ id: string; author: string; message: string; createdAt: string }> };
type ExitRequest = { id: string; projectId: string; amount: number; reason: string; status: string; requestedAt: string };
type Profile = { firstName: string; lastName: string; mobile: string; nationalId: string; email: string; birthDate: string; postalCode: string; address: string; iban: string; kycStatus: string; tier: string };

export function DocumentsCenter() {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [selected, setSelected] = useState<UserDocument | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { getData<UserDocument[]>("/api/me/documents").then(setDocuments).catch((error: Error) => setMessage(error.message)); }, []);
  const categories = useMemo(() => Array.from(new Set(documents.map((document) => document.category))), [documents]);
  return <div className="member-center-grid">
    <section className="member-panel documents-panel"><div className="panel-heading"><div><span className="mini-label">مرکز اسناد</span><h2>قراردادها و گواهی‌های شما</h2></div><FileText size={20} /></div><div className="document-category-row">{categories.map((category) => <span key={category}>{category}</span>)}</div><div className="user-doc-list">{documents.map((document) => <article key={document.id} className="user-document"><div className="user-document-icon"><ReceiptText size={18} /></div><div><strong>{document.title}</strong><span>{document.category} · نسخهٔ {document.version}</span><small>صدور: {document.issuedAt} · شناسه: {document.hash}</small></div><div className="user-document-actions"><button type="button" title="پیش‌نمایش" onClick={() => setSelected(document)}><Eye size={16} /></button><button type="button" title="دانلود نمایشی" onClick={async () => { await getData(`/api/documents/${document.id}/download`); setMessage("لینک دانلود نمایشی آماده شد؛ در محصول واقعی فایل با کنترل دسترسی امن تحویل می‌شود."); }}><Download size={16} /></button></div></article>)}</div>{message && <p className="form-message success">{message}</p>}</section>
    <aside className="member-aside">{selected ? <div className="document-preview"><span className="mini-label">پیش‌نمایش سند</span><h3>{selected.title}</h3><p>این نمای MVP متادیتای سند را نمایش می‌دهد. فایل نهایی باید با نسخه‌بندی، هش، مجوز دسترسی و لینک دانلود امن در فضای فایل نگهداری شود.</p><dl><div><dt>نسخه</dt><dd>{selected.version}</dd></div><div><dt>هش / شناسه</dt><dd>{selected.hash}</dd></div><div><dt>دسترسی</dt><dd>{selected.access}</dd></div></dl></div> : <div className="empty-mini"><FileText size={24} /><p>برای دیدن مشخصات، یکی از اسناد را انتخاب کنید.</p></div>}<Link href="/projects/shahrak-west/documents" className="inline-link">اتاق اسناد پروژه <Download size={15} /></Link></aside>
  </div>;
}

export function NotificationsCenter() {
  const [items, setItems] = useState<Notification[]>([]);
  const [error, setError] = useState("");
  const unread = items.filter((item) => !item.read).length;
  useEffect(() => { getData<Notification[]>("/api/me/notifications").then(setItems).catch((reason: Error) => setError(reason.message)); }, []);
  const markAll = async () => {
    try { await getData<{ count: number }>("/api/me/notifications/read-all", { method: "POST" }); setItems((current) => current.map((item) => ({ ...item, read: true }))); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "خطا"); }
  };
  return <section className="member-panel notification-panel"><div className="panel-heading"><div><span className="mini-label">مرکز اعلان‌ها</span><h2>{unread ? `${unread} اعلان خوانده‌نشده` : "همه چیز به‌روز است"}</h2></div><button className="button button-ghost button-small" type="button" onClick={markAll}><CheckCheck size={15} /> خواندن همه</button></div><div className="notification-list">{items.map((item) => <Link href={item.href ?? "/notifications"} className={`notification-item ${item.read ? "read" : "unread"}`} key={item.id}><span className={`notification-dot ${item.type}`} /><div><strong>{item.title}</strong><p>{item.body}</p><small>{item.createdAt}</small></div></Link>)}</div>{error && <p className="form-message error">{error}</p>}</section>;
}

export function SupportCenter() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [form, setForm] = useState({ subject: "", category: "فنی", message: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => { getData<Ticket[]>("/api/support/tickets").then(setTickets).catch((error: Error) => setMessage(error.message)); }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setMessage("");
    try { const ticket = await getData<Ticket>("/api/support/tickets", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) }); setTickets((current) => [ticket, ...current]); setForm({ subject: "", category: "فنی", message: "" }); setMessage("تیکت نمایشی ثبت شد."); }
    catch (reason) { setMessage(reason instanceof Error ? reason.message : "خطا در ثبت تیکت"); }
    finally { setLoading(false); }
  };
  return <div className="support-layout"><section className="member-panel"><div className="panel-heading"><div><span className="mini-label">پشتیبانی</span><h2>تیکت جدید</h2></div><LifeBuoy size={20} /></div><form className="mvp-form" onSubmit={submit}><label><span>موضوع</span><input required value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="مثلاً پرسش دربارهٔ گواهی" /></label><label><span>دسته‌بندی</span><select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{["مالی", "حقوقی", "فنی", "احراز هویت", "پروژه‌ها"].map((item) => <option key={item}>{item}</option>)}</select></label><label><span>شرح درخواست</span><textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label><button className="button button-red" disabled={loading}>{loading ? <LoaderCircle size={16} className="spin" /> : <><Send size={16} /> ثبت تیکت</>}</button></form>{message && <p className="form-message success">{message}</p>}</section><section className="member-panel"><div className="panel-heading"><div><span className="mini-label">تاریخچه</span><h2>تیکت‌های شما</h2></div><MessageSquarePlus size={20} /></div><div className="ticket-list">{tickets.map((ticket) => <article key={ticket.id} className="ticket-card"><div className="ticket-top"><strong>{ticket.subject}</strong><span className={`status-badge ${ticket.status}`}>{ticket.status === "answered" ? "پاسخ داده شده" : ticket.status === "open" ? "باز" : "بسته"}</span></div><p>{ticket.message}</p><small>{ticket.category} · {ticket.createdAt}</small>{ticket.replies.map((reply) => <div className="ticket-reply" key={reply.id}><strong>{reply.author}</strong><p>{reply.message}</p><small>{reply.createdAt}</small></div>)}</article>)}</div></section></div>;
}

export function ExitRequestForm() {
  const [requests, setRequests] = useState<ExitRequest[]>([]);
  const [form, setForm] = useState({ project_id: properties[0].slug, amount: 2_000_000, reason: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => { getData<ExitRequest[]>("/api/me/exit-requests").then(setRequests).catch((error: Error) => setMessage(error.message)); }, []);
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setMessage(""); try { const request = await getData<ExitRequest>("/api/exit-requests", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) }); setRequests((current) => [request, ...current]); setForm({ ...form, reason: "" }); setMessage("درخواست خروج برای بررسی نمایشی ثبت شد."); } catch (reason) { setMessage(reason instanceof Error ? reason.message : "خطا"); } finally { setLoading(false); } };
  return <div className="support-layout"><section className="member-panel"><div className="panel-heading"><div><span className="mini-label">نقدشوندگی و خروج</span><h2>ثبت درخواست خروج</h2></div><LogOut size={20} /></div><p className="panel-intro">در MVP، درخواست خروج در صف اپراتور قرار می‌گیرد. تأیید آن به قواعد پروژه، وجود خریدار یا سازوکار بازخرید وابسته است.</p><form className="mvp-form" onSubmit={submit}><label><span>پروژه</span><select value={form.project_id} onChange={(event) => setForm({ ...form, project_id: event.target.value })}>{properties.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}</select></label><label><span>مبلغ درخواست (تومان)</span><input inputMode="numeric" value={form.amount} onChange={(event) => setForm({ ...form, amount: Number(event.target.value.replace(/\D/g, "")) || 0 })} /></label><label><span>دلیل درخواست</span><textarea required rows={4} value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} placeholder="توضیح کوتاه برای اپراتور" /></label><button className="button button-red" disabled={loading}>{loading ? <LoaderCircle size={16} className="spin" /> : <><LogOut size={16} /> ثبت درخواست</>}</button></form>{message && <p className="form-message success">{message}</p>}</section><section className="member-panel"><div className="panel-heading"><div><span className="mini-label">وضعیت‌ها</span><h2>درخواست‌های قبلی</h2></div><ReceiptText size={20} /></div><div className="exit-list">{requests.map((request) => { const project = properties.find((item) => item.slug === request.projectId); const label = request.status === "in_review" ? "در حال بررسی" : request.status === "submitted" ? "ثبت شده" : request.status === "approved" ? "تأیید شده" : "رد شده"; return <article key={request.id} className="exit-row"><div><strong>{project?.name ?? request.projectId}</strong><span>{formatToman(request.amount)} تومان · {request.requestedAt}</span><small>{request.reason}</small></div><b className={`status-badge ${request.status}`}>{label}</b></article>; })}</div></section></div>;
}

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => { getData<Profile>("/api/me").then(setProfile).catch((error: Error) => setMessage(error.message)); }, []);
  const save = async (event: FormEvent) => { event.preventDefault(); if (!profile) return; setLoading(true); setMessage(""); try { const next = await getData<Profile>("/api/me/profile", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(profile) }); setProfile(next); setMessage("پروفایل نمایشی ذخیره شد."); } catch (reason) { setMessage(reason instanceof Error ? reason.message : "خطا"); } finally { setLoading(false); } };
  if (!profile) return <div className="loading-state"><LoaderCircle className="spin" size={20} /> در حال دریافت پروفایل…</div>;
  const change = (key: keyof Profile, value: string) => setProfile({ ...profile, [key]: value });
  return <div className="member-center-grid"><form className="member-panel mvp-form" onSubmit={save}><div className="panel-heading"><div><span className="mini-label">پروفایل سرمایه‌گذار</span><h2>{profile.firstName} {profile.lastName}</h2></div><UserRound size={20} /></div><div className="form-grid-two"><label><span>نام</span><input value={profile.firstName} onChange={(event) => change("firstName", event.target.value)} /></label><label><span>نام خانوادگی</span><input value={profile.lastName} onChange={(event) => change("lastName", event.target.value)} /></label><label><span>شماره همراه</span><input value={profile.mobile} onChange={(event) => change("mobile", event.target.value)} /></label><label><span>ایمیل</span><input type="email" value={profile.email} onChange={(event) => change("email", event.target.value)} /></label><label><span>کد ملی</span><input value={profile.nationalId} onChange={(event) => change("nationalId", event.target.value)} /></label><label><span>تاریخ تولد</span><input value={profile.birthDate} onChange={(event) => change("birthDate", event.target.value)} /></label></div><label><span>نشانی</span><textarea rows={3} value={profile.address} onChange={(event) => change("address", event.target.value)} /></label><div className="form-grid-two"><label><span>کدپستی</span><input value={profile.postalCode} onChange={(event) => change("postalCode", event.target.value)} /></label><label><span>شماره شبا</span><input value={profile.iban} onChange={(event) => change("iban", event.target.value)} /></label></div><button className="button button-red" disabled={loading}>{loading ? <LoaderCircle size={16} className="spin" /> : <><Save size={16} /> ذخیره تغییرات</>}</button>{message && <p className="form-message success">{message}</p>}</form><aside className="member-aside"><div className="profile-status-card"><span className="mini-label">وضعیت حساب</span><h3>سطح {profile.tier === "silver" ? "نقره‌ای" : profile.tier}</h3><p>وضعیت KYC: {profile.kycStatus === "approved" ? "تأیید شده" : profile.kycStatus === "in_review" ? "در حال بررسی" : "نیازمند تکمیل"}</p><Link href="/kyc" className="button button-ghost button-small">مدیریت احراز هویت</Link></div></aside></div>;
}
