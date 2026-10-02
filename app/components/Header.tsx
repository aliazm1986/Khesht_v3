"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { KhestLogo } from "./KhestLogo";

type MenuKey = "invest" | "build" | "community" | "guide" | null;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };
  const toggleMenu = (key: Exclude<MenuKey, null>) => {
    setOpenMenu((current) => current === key ? null : key);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="خشت" onClick={closeMenu}><KhestLogo /></Link>
        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          <div className={`nav-menu ${openMenu === "invest" ? "is-open" : ""}`}>
            <button type="button" className="nav-menu-trigger" aria-expanded={openMenu === "invest"} onClick={() => toggleMenu("invest")}>
              سرمایه‌گذاری <ChevronDown size={14} />
            </button>
            <div className="nav-dropdown" role="menu">
              <Link href="/projects" onClick={closeMenu}><strong>فرصت‌های پروژه</strong><span>پروژه‌ها را مقایسه کن</span></Link>
              <Link href="/market" onClick={closeMenu}><strong>بازار ثانویه</strong><span>دفتر سفارش </span></Link>
              <Link href="/portfolio" onClick={closeMenu}><strong>سبد توکن‌ها</strong><span>گواهی‌ها و موجودی</span></Link>
              <Link href="/auto-invest" onClick={closeMenu}><strong>سرمایه‌گذاری هوشمند</strong><span>قواعد شخصی بساز</span></Link>
            </div>
          </div>
          <div className={`nav-menu ${openMenu === "build" ? "is-open" : ""}`}>
            <button type="button" className="nav-menu-trigger" aria-expanded={openMenu === "build"} onClick={() => toggleMenu("build")}>
             بررسی پیش از قرارداد <ChevronDown size={14} />
            </button>
            <div className="nav-dropdown" role="menu">
              <Link href="/finance" onClick={closeMenu}><strong>ارسال پروژه</strong><span>معرفی فرصت جدید</span></Link>
              <Link href="/how-it-works" onClick={closeMenu}><strong>مدل خشت</strong><span>از طلا تا توکن خشت</span></Link>
              <Link href="/guarantees" onClick={closeMenu}><strong>کنترل ریسک</strong><span>سناریوهای خروج</span></Link>
            </div>
          </div>
          <div className={`nav-menu ${openMenu === "community" ? "is-open" : ""}`}>
            <button type="button" className="nav-menu-trigger" aria-expanded={openMenu === "community"} onClick={() => toggleMenu("community")}>
              جامعه <ChevronDown size={14} />
            </button>
            <div className="nav-dropdown" role="menu">
              <Link href="/learn" onClick={closeMenu}><strong>مجلهٔ خشت</strong><span>یادگیری و روایت پروژه</span></Link>
              <Link href="/tiers" onClick={closeMenu}><strong>سطح سرمایه‌گذار</strong><span>برنزی تا تیتانیومی</span></Link>
              <Link href="/dashboard" onClick={closeMenu}><strong>داشبورد</strong><span>نمای شخصی محصول</span></Link>
            </div>
          </div>
          <div className={`nav-menu ${openMenu === "guide" ? "is-open" : ""}`}>
            <button type="button" className="nav-menu-trigger" aria-expanded={openMenu === "guide"} onClick={() => toggleMenu("guide")}>
              راهنما <ChevronDown size={14} />
            </button>
            <div className="nav-dropdown" role="menu">
              <Link href="/faq" onClick={closeMenu}><strong>پرسش‌های رایج</strong><span>پاسخ‌های کوتاه و روشن</span></Link>
              <Link href="/projects/shahrak-west/documents" onClick={closeMenu}><strong>اتاق اسناد</strong><span>گزارش و ضمایم نمونه</span></Link>
              <Link href="/how-it-works#risk" onClick={closeMenu}><strong>ریسک‌ها</strong><span>قبل از تصمیم بخوان</span></Link>
            </div>
          </div>
        </nav>
        <div className="header-actions">
          <Link href="/dashboard" className="login-link">ورود به داشبورد</Link>
          <Link href="/projects" className="button button-red button-small">
            شروع کنید <ArrowLeft size={15} />
          </Link>
          <button className="mobile-menu" aria-label={menuOpen ? "بستن منو" : "باز کردن منو"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="ناوبری موبایل">
          <Link href="/projects" onClick={closeMenu}>فرصت‌های سرمایه‌گذاری</Link>
          <Link href="/market" onClick={closeMenu}>بازار ثانویه</Link>
          <Link href="/how-it-works" onClick={closeMenu}>چطور کار می‌کند؟</Link>
          <Link href="/portfolio" onClick={closeMenu}>سبد توکن‌ها</Link>
          <Link href="/dashboard" onClick={closeMenu}>داشبورد</Link>
          <Link href="/tiers" onClick={closeMenu}>سطح دسترسی</Link>
          <Link href="/auto-invest" onClick={closeMenu}>سرمایه‌گذاری هوشمند</Link>
          <Link href="/learn" onClick={closeMenu}>مجله و جامعه</Link>
          <Link href="/finance" onClick={closeMenu}>برای سازنده‌ها</Link>
          <Link href="/faq" onClick={closeMenu}>پرسش‌های رایج</Link>
        </nav>
      )}
    </header>
  );
}
