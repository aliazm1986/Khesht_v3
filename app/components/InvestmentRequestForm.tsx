"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, FileCheck2, LoaderCircle, ShieldAlert } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatToman } from "@/lib/data";

type Step = 1 | 2 | 3 | 4;

export function InvestmentRequestForm({ property }: { property: Property }) {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState(property.minimumInvestment * 10);
  const [checks, setChecks] = useState({ documents: false, risks: false, terms: false });
  const [investmentId, setInvestmentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const units = useMemo(() => Math.floor(amount / property.tokenPriceCurrent), [amount, property.tokenPriceCurrent]);
  const allChecks = Object.values(checks).every(Boolean);

  const createRequest = async () => {
    if (!allChecks) { setError("مطالعهٔ اسناد، ریسک‌ها و شرایط را تأیید کنید."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/investments", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ project_id: property.slug, amount }) });
      const result = await response.json() as { ok: boolean; data?: { id: string }; error?: string };
      if (!response.ok || !result.ok || !result.data) throw new Error(result.error ?? "ثبت درخواست انجام نشد.");
      setInvestmentId(result.data.id); setStep(3);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "خطای ناشناخته"); }
    finally { setLoading(false); }
  };

  const pay = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/investments/${investmentId}/pay`, { method: "POST" });
      const result = await response.json() as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "پرداخت نمایشی انجام نشد.");
      setStep(4);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "خطای ناشناخته"); }
    finally { setLoading(false); }
  };

  return <section className="investment-flow">
    <div className="flow-steps">{["مبلغ", "پذیرش ریسک", "پرداخت", "گواهی"].map((item, index) => <div key={item} className={step >= index + 1 ? "active" : ""}><span>{index + 1}</span><small>{item}</small></div>)}</div>
    {step === 1 && <div className="flow-panel"><span className="mini-label">گام ۱ از ۴</span><h2>مبلغ درخواست سرمایه‌گذاری</h2><p>حداقل مبلغ این پروژه {formatToman(property.minimumInvestment)} تومان است.</p><label className="large-field"><span>مبلغ (تومان)</span><input inputMode="numeric" value={amount || ""} onChange={(event) => setAmount(Number(event.target.value.replace(/\D/g, "")) || 0)} /></label><div className="order-summary"><div><span>پروژه</span><strong>{property.name}</strong></div><div><span>واحد حق مالی نمایشی</span><strong>{formatToman(units)} واحد</strong></div><div><span>قیمت هر واحد</span><strong>{formatToman(property.tokenPriceCurrent)} تومان</strong></div></div>{amount < property.minimumInvestment && <p className="form-message error">مبلغ کمتر از حداقل سرمایه‌گذاری پروژه است.</p>}<button className="button button-red" disabled={amount < property.minimumInvestment} onClick={() => setStep(2)}>ادامه <ArrowLeft size={16} /></button></div>}
    {step === 2 && <div className="flow-panel"><span className="mini-label">گام ۲ از ۴</span><h2>تأیید آگاهانه</h2><div className="risk-callout"><ShieldAlert size={19} /><p>این فرآیند به‌معنای انتقال مستقیم سند رسمی ملک نیست. حق مالی شما تابع ساختار حقوقی پروژه و قرارداد نهایی خواهد بود. بازده و نقدشوندگی قطعی نیستند.</p></div><div className="check-list"><label><input type="checkbox" checked={checks.documents} onChange={(event) => setChecks({ ...checks, documents: event.target.checked })} /><span>اسناد پروژه و ساختار حقوقی را مطالعه کردم.</span><Link href={`/projects/${property.slug}/documents`}>مشاهده اسناد</Link></label><label><input type="checkbox" checked={checks.risks} onChange={(event) => setChecks({ ...checks, risks: event.target.checked })} /><span>ریسک ساخت، بازار، حقوقی و نقدشوندگی را می‌پذیرم.</span></label><label><input type="checkbox" checked={checks.terms} onChange={(event) => setChecks({ ...checks, terms: event.target.checked })} /><span>شرایط و ضوابط نسخهٔ پایلوت را می‌پذیرم.</span></label></div>{error && <p className="form-message error">{error}</p>}<div className="flow-actions"><button className="button button-ghost" onClick={() => setStep(1)}>بازگشت</button><button className="button button-red" disabled={loading || !allChecks} onClick={createRequest}>{loading ? <LoaderCircle className="spin" size={17} /> : <>ثبت درخواست <ArrowLeft size={16} /></>}</button></div></div>}
    {step === 3 && <div className="flow-panel"><span className="mini-label">گام ۳ از ۴</span><h2>پرداخت نمایشی</h2><p>در MVP، این پرداخت هیچ اتصال بانکی ندارد؛ فقط وضعیت سفارش را برای تست جریان محصول تغییر می‌دهد.</p><div className="payment-card"><CreditCard size={24} /><div><strong>{formatToman(amount)} تومان</strong><small>شناسه درخواست: {investmentId}</small></div></div>{error && <p className="form-message error">{error}</p>}<button className="button button-red" disabled={loading} onClick={pay}>{loading ? <LoaderCircle className="spin" size={17} /> : <>تأیید پرداخت نمایشی <ArrowLeft size={16} /></>}</button></div>}
    {step === 4 && <div className="success-state compact"><span className="success-icon"><CheckCircle2 size={28} /></span><span className="mini-label">گام ۴ از ۴</span><h2>درخواست تخصیص شد.</h2><p>قرارداد و گواهی حق مالی نمایشی در مرکز اسناد شما ایجاد شد. در محصول واقعی این مرحله پس از تسویه و کنترل‌های حقوقی تکمیل می‌شود.</p><div className="flow-actions"><Link href="/documents" className="button button-red"><FileCheck2 size={16} /> مرکز اسناد</Link><Link href="/dashboard" className="button button-ghost">داشبورد</Link></div></div>}
  </section>;
}
