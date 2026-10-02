"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { Download, Eye, FileCheck2, LockKeyhole } from "lucide-react";
import type { DocumentItem, InvestorTier, Property } from "@/lib/data";
import { tiers } from "@/lib/data";

const tierOrder: InvestorTier[] = ["bronze", "silver", "gold", "titanium"];
const accessToTier: Record<DocumentItem["access"], InvestorTier> = { "عمومی": "bronze", "سطح نقره‌ای": "silver", "سطح طلایی": "gold", "سطح تیتانیومی": "titanium" };
const tabs = ["خلاصه پروژه", "گزارش ارزش‌گذاری", "گزارش پیشرفت", "اسناد فنی", "اسناد مالی", "اسناد حقوقی", "ضمائم", "اتاق داده ویژه"];
const categoryByTab: Record<string, string> = {
  "خلاصه پروژه": "خلاصه پروژه",
  "گزارش ارزش‌گذاری": "ارزش‌گذاری",
  "گزارش پیشرفت": "گزارش پیشرفت",
  "اسناد فنی": "اسناد فنی",
  "اسناد مالی": "اسناد مالی",
  "اسناد حقوقی": "اسناد حقوقی",
  "ضمائم": "اتاق داده",
  "اتاق داده ویژه": "اتاق داده",
};

export function DocumentsRoom({ property }: { property: Property }) {
  const [tier, setTier] = useState<InvestorTier>("bronze");
  const [active, setActive] = useState(tabs[0]);
  useEffect(() => {
    const stored = window.localStorage.getItem("khest-tier") as InvestorTier | null;
    if (stored && tiers.some((item) => item.id === stored)) setTier(stored);
  }, []);
  const tierIndex = tierOrder.indexOf(tier);
  const visible = useMemo(() => property.documents.filter((doc) => doc.category.includes(categoryByTab[active] ?? active)), [active, property.documents]);
  return (
    <div>
      <div className="room-toolbar"><div><span className="mini-label">اتاق اسناد نمایشی</span><h2>{property.name}</h2></div><label className="tier-select"><span>سطح دسترسی</span><select value={tier} onChange={(event) => setTier(event.target.value as InvestorTier)}>{tiers.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label></div>
      <div className="document-tabs">{tabs.map((tab) => <button type="button" key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>)}</div>
      <div className="document-grid">{visible.map((doc) => { const required = accessToTier[doc.access]; const locked = tierIndex < tierOrder.indexOf(required); return <article className={`document-card ${locked ? "locked" : ""}`} key={doc.title}><div className="document-icon">{locked ? <LockKeyhole size={18} /> : <FileCheck2 size={18} />}</div><div className="document-main"><div className="document-top"><strong>{doc.title}</strong><span className="access-badge">{doc.access}</span></div><p>{doc.category} · نسخهٔ نمایشی · {doc.date}</p><div className="document-status">{doc.status}</div>{locked && <small>این سند در سطح دسترسی فعلی شما قابل مشاهده نیست.</small>}</div><div className="document-actions"><button type="button" title="پیش‌نمایش"><Eye size={15} /></button><button type="button" title="دانلود نمایشی" disabled={locked}><Download size={15} /></button></div></article>; })}</div>
      <div className="room-callout"><FileCheck2 size={18} /><div><strong>داده‌نمای پروژه</strong><p>سرمایه‌گذاران طلایی و تیتانیومی در نسخهٔ نمایشی، گزارش ارزش‌گذاری، مدل مالی و ضمائم را می‌بینند. ارتقای سطح اینجا فقط یک تعامل محصول است.</p></div></div>
    </div>
  );
}
