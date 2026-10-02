"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Bell, ChevronLeft, CircleHelp, CreditCard, LayoutDashboard, LineChart, LogOut, Menu, PieChart, Plus, Settings, ShieldCheck, WalletCards } from "lucide-react";
import { KhestLogo } from "./KhestLogo";

const navItems = [
  { label: "نمای کلی", icon: LayoutDashboard, active: true },
  { label: "سرمایه‌گذاری‌های من", icon: WalletCards },
  { label: "گزارش بازده", icon: LineChart },
  { label: "پرداخت‌ها", icon: CreditCard },
];

const holdings = [
  { name: "رزیدنس آفتاب", location: "شهرک غرب · ۱۲ واحد", value: "۱۵۰٬۰۰۰٬۰۰۰", share: "۴۲٪", color: "#B52A2E" },
  { name: "مارینای کیش", location: "کیش · ۸ واحد", value: "۱۶٬۸۰۰٬۰۰۰", share: "۳۱٪", color: "#D77B54" },
  { name: "خانه‌کار میرداماد", location: "میرداماد · ۴ واحد", value: "۱۳٬۸۰۰٬۰۰۰", share: "۲۷٪", color: "#7E1E26" },
];

export function LuxeDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <main className="luxe-dashboard">
      <aside className={`luxe-dash-sidebar ${collapsed ? "is-collapsed" : ""}`}>
        <div className="luxe-dash-sidebar-top">
          <Link href="/" className="luxe-dash-logo" aria-label="بازگشت به خانه"><KhestLogo compact={collapsed} /></Link>
          <button className="luxe-dash-collapse" type="button" onClick={() => setCollapsed((value) => !value)} aria-label="تغییر حالت سایدبار">{collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}</button>
        </div>
        <nav className="luxe-dash-nav" aria-label="منوی داشبورد">
          {navItems.map(({ label, icon: Icon, active }) => <button type="button" className={active ? "active" : ""} key={label} title={label}><Icon size={19} /><span>{label}</span></button>)}
        </nav>
        <div className="luxe-dash-sidebar-bottom">
          <button type="button" title="تنظیمات"><Settings size={19} /><span>تنظیمات</span></button>
          <button type="button" title="راهنما"><CircleHelp size={19} /><span>راهنما و پشتیبانی</span></button>
          <div className="luxe-dash-user"><span>ع</span><div><b>علی رضایی</b><small>حساب سرمایه‌گذار</small></div><LogOut size={16} /></div>
        </div>
      </aside>
      <section className="luxe-dash-content">
        <header className="luxe-dash-topbar">
          <button type="button" className="luxe-dash-mobile-menu" onClick={() => setCollapsed((value) => !value)} aria-label="باز کردن منو"><Menu size={21} /></button>
          <div><p>پنج‌شنبه، ۱۰ مهر ۱۴۰۵</p><h1>صبح بخیر، علی <span>✦</span></h1></div>
          <div className="luxe-dash-top-actions"><button type="button" className="luxe-dash-notification" aria-label="اعلان‌ها"><Bell size={19} /><i /></button><Link href="/projects" className="luxe-dash-invest"><Plus size={17} /> سرمایه‌گذاری جدید</Link></div>
        </header>
        <section className="luxe-dash-portfolio luxe-dash-reveal">
          <div className="luxe-dash-portfolio-copy"><span>ارزش خالص دارایی‌های شما</span><strong>۱۸۰٬۶۰۰٬۰۰۰ <small>تومان</small></strong><p><b>۲۸٫۴٪ +</b> رشد از آغاز سرمایه‌گذاری</p></div>
          <div className="luxe-dash-mini-chart" aria-label="روند صعودی ارزش سرمایه‌گذاری"><svg viewBox="0 0 340 132" role="img"><defs><linearGradient id="portfolio-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".34"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><path d="M0 112 C36 105 38 89 70 94 S111 76 136 82 S177 60 206 71 S240 37 267 47 S306 20 340 12 V132H0Z" fill="url(#portfolio-fill)"/><path d="M0 112 C36 105 38 89 70 94 S111 76 136 82 S177 60 206 71 S240 37 267 47 S306 20 340 12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg><span>مهر</span><span>آبان</span><span>آذر</span><span>دی</span><span>بهمن</span></div><div className="luxe-dash-portfolio-orb" />
        </section>
        <section className="luxe-dash-stats luxe-dash-reveal luxe-dash-delay-1">
          <article><div className="luxe-dash-stat-icon"><WalletCards size={19} /></div><p>سرمایه‌گذاری فعال</p><strong>۳ پروژه</strong><small>همه در وضعیت مطلوب</small></article>
          <article><div className="luxe-dash-stat-icon warm"><LineChart size={19} /></div><p>بازده مورد انتظار</p><strong>۲۴٫۵٪</strong><small>میانگین سالانه</small></article>
          <article><div className="luxe-dash-stat-icon pale"><CreditCard size={19} /></div><p>دریافتی این ماه</p><strong>۱٬۰۶۵٬۰۰۰</strong><small>تومان · ۱۸ روز دیگر</small></article>
        </section>
        <section className="luxe-dash-grid luxe-dash-reveal luxe-dash-delay-2">
          <article className="luxe-dash-panel luxe-dash-performance"><div className="luxe-dash-panel-title"><div><span>عملکرد سبد</span><h2>رشد ارزش سرمایه</h2></div><select aria-label="بازه زمانی"><option>۶ ماه اخیر</option><option>یک سال اخیر</option></select></div><div className="luxe-dash-large-chart"><div className="luxe-dash-y-axis"><span>۲۰۰م</span><span>۱۵۰م</span><span>۱۰۰م</span><span>۵۰م</span></div><svg viewBox="0 0 700 250" preserveAspectRatio="none" role="img"><defs><linearGradient id="chart-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#B52A2E" stopOpacity=".18"/><stop offset="1" stopColor="#B52A2E" stopOpacity="0"/></linearGradient></defs><path d="M0 214 C56 204 76 189 116 194 S168 163 219 171 S282 126 337 142 S402 97 454 111 S518 67 565 81 S636 41 700 45 V250 H0Z" fill="url(#chart-area)"/><path d="M0 214 C56 204 76 189 116 194 S168 163 219 171 S282 126 337 142 S402 97 454 111 S518 67 565 81 S636 41 700 45" fill="none" stroke="#B52A2E" strokeWidth="3" strokeLinecap="round"/></svg></div><div className="luxe-dash-x-axis"><span>فروردین</span><span>اردیبهشت</span><span>خرداد</span><span>تیر</span><span>مرداد</span><span>شهریور</span></div></article>
          <article className="luxe-dash-panel luxe-dash-allocation"><div className="luxe-dash-panel-title"><div><span>ترکیب سرمایه</span><h2>پراکندگی سبد</h2></div><PieChart size={20} color="var(--red)" /></div><div className="luxe-dash-donut"><div><b>۳</b><span>پروژه فعال</span></div></div><div className="luxe-dash-legend"><span><i /><b>رزیدنس آفتاب</b><em>۴۲٪</em></span><span><i /><b>مارینای کیش</b><em>۳۱٪</em></span><span><i /><b>خانه‌کار</b><em>۲۷٪</em></span></div></article>
        </section>
        <section className="luxe-dash-panel luxe-dash-holdings luxe-dash-reveal luxe-dash-delay-3"><div className="luxe-dash-panel-title"><div><span>دارایی‌های من</span><h2>سرمایه‌گذاری‌های فعال</h2></div><Link href="/projects">مشاهده همه <ArrowLeft size={15} /></Link></div><div className="luxe-dash-holding-list">{holdings.map((holding) => <article key={holding.name}><span className="luxe-dash-holding-dot" style={{ background: holding.color }} /><div className="luxe-dash-holding-name"><b>{holding.name}</b><small>{holding.location}</small></div><div className="luxe-dash-holding-bar"><i style={{ width: holding.share }} /></div><div className="luxe-dash-holding-value"><b>{holding.value}</b><small>تومان</small></div><em>{holding.share}</em></article>)}</div></section>
        <section className="luxe-dash-tip luxe-dash-reveal luxe-dash-delay-3"><ShieldCheck size={23} /><div><b>دارایی شما تحت نظارت شفاف است</b><p>گزارش دوره‌ای پروژه‌ها و وضعیت پرداخت‌ها همیشه از همین داشبورد در دسترس شماست.</p></div><Link href="/projects">فرصت‌های جدید <ArrowLeft size={16} /></Link></section>
      </section>
    </main>
  );
}
