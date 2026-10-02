"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, RefreshCcw, Star, Trash2 } from "lucide-react";
import { formatToman, properties } from "@/lib/data";

const positions = [
  { slug: "shahrak-west", type: "خشت", quantity: 24, average: 500000, current: 545000, lock: "بازار پویا", protection: "خاموش", risk: "متوسط" },
  { slug: "narvan-renovation", type: "خشت", quantity: 42, average: 500000, current: 525000, lock: "۹ ماه نمونه", protection: "فعال", risk: "پایین" },
  { slug: "kish-marina", type: "طلا", quantity: 18, average: 750000, current: 760000, lock: "نگهداری موقت", protection: "فعال", risk: "بالا" },
];

const tabs = ["همهٔ توکن‌ها", "توکن‌های خشت", "توکن‌های طلا", "بازار ثانویه", "نگهداری بلندمدت", "حفاظت سرمایه", "علاقه‌مندی‌ها"];

export function PortfolioTabs() {
  const [active, setActive] = useState(tabs[0]);
  const [removed, setRemoved] = useState<string[]>([]);
  const filtered = useMemo(() => positions.filter((position) => !removed.includes(position.slug)).filter((position) => active === tabs[0] || (active === "توکن‌های خشت" && position.type === "خشت") || (active === "توکن‌های طلا" && position.type === "طلا") || (active === "حفاظت سرمایهٔ فرضی" && position.protection === "فعال")), [active, removed]);
  return (
    <div>
      <div className="portfolio-tabs">{tabs.map((tab) => <button key={tab} type="button" className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>)}</div>
      <div className="portfolio-table-wrap">
        <table className="portfolio-table"><thead><tr><th>پروژه</th><th>نماد</th><th>تعداد</th><th>خرید نمونه</th><th>قیمت فعلی</th><th>ارزش برآوردی</th><th>بازدهی</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>{filtered.map((position) => { const project = properties.find((item) => item.slug === position.slug)!; const value = position.quantity * position.current; const returnRate = Math.round((position.current / position.average - 1) * 100); return <tr key={position.slug}><td><strong>{project.name}</strong><small>{project.location}</small></td><td><b className="symbol-chip">{position.type === "طلا" ? "GOLD" : project.tokenSymbol}</b></td><td>{formatToman(position.quantity)}</td><td>{formatToman(position.average)}</td><td>{formatToman(position.current)}</td><td><strong>{formatToman(value)}</strong><small>تومان</small></td><td className="table-positive">+{returnRate}%</td><td><span className="table-status">{position.lock}</span><small>{position.protection === "فعال" ? "حفاظت فرضی فعال" : "حفاظت خاموش"}</small></td><td><div className="table-actions"><button title="جزئیات" type="button"><Eye size={14} /></button><button title="تبدیل" type="button"><RefreshCcw size={14} /></button><button title="حذف" type="button" onClick={() => setRemoved((items) => [...items, position.slug])}><Trash2 size={14} /></button></div></td></tr>; })}</tbody></table>
        {filtered.length === 0 && <div className="empty-state">در این فیلتر توکن نمایشی ندارید.</div>}
      </div>
      <p className="portfolio-note"><Star size={14} /> قیمت‌ها و بازدهی‌ها شبیه‌سازی‌شده‌اند و به معنای مالکیت رسمی یا سود قطعی نیستند.</p>
      <div style={{ marginTop: 18 }}><Link href="/projects" className="inline-link">افزودن فرصت تازه <ArrowLeft size={15} /></Link></div>
    </div>
  );
}
