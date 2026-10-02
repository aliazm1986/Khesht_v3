"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BadgeCheck, Check, ClipboardList, FilePlus2, LoaderCircle, ShieldAlert, UsersRound, X } from "lucide-react";

type AdminUser = { id: string; firstName: string; lastName: string; mobile: string; nationalId?: string; role: string; tier: string; kycStatus: string; createdAt: string; kyc_label?: string };
type Audit = { id: string; action: string; actor: string; target: string; createdAt: string; ip: string };
type Ticket = { id: string; subject: string; category: string; status: string; createdAt: string };
type ApiResult<T> = { ok: boolean; data?: T; error?: string };

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, init);
  const result = await response.json() as ApiResult<T>;
  if (!response.ok || !result.ok || result.data === undefined) throw new Error(result.error ?? "خطای ارتباط با پنل");
  return result.data;
}

const tabs = ["users", "kyc", "projects", "tickets", "audit"] as const;
type Tab = (typeof tabs)[number];

export function AdminWorkspace() {
  const [active, setActive] = useState<Tab>("users");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [queue, setQueue] = useState<AdminUser[]>([]);
  const [logs, setLogs] = useState<Audit[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ title: "", type: "مسکونی", target_amount: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const [nextUsers, nextQueue, nextLogs, nextTickets] = await Promise.all([
        request<AdminUser[]>("/api/admin/users"),
        request<AdminUser[]>("/api/admin/kyc-queue"),
        request<Audit[]>("/api/admin/audit-logs"),
        request<Ticket[]>("/api/admin/tickets"),
      ]);
      setUsers(nextUsers); setQueue(nextQueue); setLogs(nextLogs); setTickets(nextTickets);
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "خطا در دریافت داده‌ها"); }
  };

  useEffect(() => { void load(); }, []);

  const kycAction = async (id: string, action: "approve" | "reject") => {
    try {
      await request(`/api/admin/kyc/${id}/${action}`, { method: "POST" });
      setMessage(action === "approve" ? "KYC نمایشی تأیید شد." : "KYC نمایشی رد شد.");
      await load();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "خطا در تغییر وضعیت"); }
  };

  const createProject = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setMessage("");
    try {
      await request("/api/admin/projects", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      setMessage("پیش‌نویس پروژه در پنل نمایشی ثبت شد."); setForm({ title: "", type: "مسکونی", target_amount: "" }); await load();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "خطا در ایجاد پیش‌نویس"); }
    finally { setLoading(false); }
  };

  const status = (value: string) => value === "approved" ? "تأیید شده" : value === "in_review" ? "در حال بررسی" : value === "needs_completion" ? "ناقص" : value === "rejected" ? "رد شده" : value;
  const tabLabel: Record<Tab, string> = { users: "کاربران", kyc: "صف KYC", projects: "پروژه‌ها", tickets: "تیکت‌ها", audit: "لاگ حسابرسی" };

  return <section className="admin-workspace">
    <aside className="admin-nav"><span className="mini-label">Admin / MVP</span><h2>مدیریت خشت</h2>{tabs.map((tab) => <button key={tab} type="button" className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab === "users" ? <UsersRound size={16} /> : tab === "kyc" ? <BadgeCheck size={16} /> : tab === "projects" ? <FilePlus2 size={16} /> : tab === "tickets" ? <ClipboardList size={16} /> : <ShieldAlert size={16} />}{tabLabel[tab]}</button>)}</aside>
    <div className="admin-main"><div className="panel-heading"><div><span className="mini-label">پنل پایهٔ ادمین</span><h2>{tabLabel[active]}</h2></div><span className="demo-tag">دادهٔ نمایشی</span></div>{message && <p className="form-message success">{message}</p>}
      {active === "users" && <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>کاربر</th><th>موبایل</th><th>نقش</th><th>سطح</th><th>KYC</th><th>ثبت‌نام</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><strong>{user.firstName} {user.lastName}</strong><small>{user.id}</small></td><td>{user.mobile}</td><td>{user.role}</td><td>{user.tier}</td><td><span className={`status-badge ${user.kycStatus}`}>{status(user.kycStatus)}</span></td><td>{user.createdAt}</td></tr>)}</tbody></table></div>}
      {active === "kyc" && <div className="kyc-queue">{queue.map((user) => <article key={user.id} className="kyc-queue-row"><div><strong>{user.firstName} {user.lastName}</strong><span>{user.mobile} · {user.nationalId ?? "کد ملی در انتظار"}</span><small>وضعیت: {user.kyc_label ?? status(user.kycStatus)}</small></div><div className="admin-actions"><button type="button" className="icon-approve" title="تأیید" onClick={() => void kycAction(user.id, "approve")}><Check size={16} /></button><button type="button" className="icon-reject" title="رد" onClick={() => void kycAction(user.id, "reject")}><X size={16} /></button></div></article>)}</div>}
      {active === "projects" && <div className="admin-project-layout"><form className="mvp-form admin-create" onSubmit={createProject}><h3>افزودن پیش‌نویس پروژه</h3><label><span>عنوان پروژه</span><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label><label><span>نوع پروژه</span><select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>{["مسکونی", "اداری", "تجاری", "تفریحی", "بازسازی"].map((item) => <option key={item}>{item}</option>)}</select></label><label><span>مبلغ هدف (تومان)</span><input required inputMode="numeric" value={form.target_amount} onChange={(event) => setForm({ ...form, target_amount: event.target.value })} /></label><button className="button button-red" disabled={loading}>{loading ? <LoaderCircle size={16} className="spin" /> : <><FilePlus2 size={16} /> ذخیرهٔ پیش‌نویس</>}</button></form><div className="admin-project-note"><h3>چرخهٔ پیشنهادی</h3><ol><li>تعریف پروژه و ارکان حقوقی</li><li>بارگذاری اسناد و ارزیابی ریسک</li><li>بررسی اپراتور و انتشار</li><li>ثبت درخواست و صدور گواهی</li><li>گزارش، خروج و لاگ حسابرسی</li></ol></div></div>}
      {active === "tickets" && <div className="ticket-list">{tickets.map((ticket) => <article className="ticket-card" key={ticket.id}><div className="ticket-top"><strong>{ticket.subject}</strong><span className={`status-badge ${ticket.status}`}>{ticket.status}</span></div><p>{ticket.category} · {ticket.createdAt}</p></article>)}</div>}
      {active === "audit" && <div className="audit-list">{logs.map((log) => <article key={log.id} className="audit-row"><span className="audit-dot" /><div><strong>{log.action}</strong><p>{log.target} · عامل: {log.actor}</p></div><small>{log.createdAt}<br />IP: {log.ip}</small></article>)}</div>}
    </div>
  </section>;
}
