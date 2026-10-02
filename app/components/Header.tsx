"use client";

import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { KhestLogo } from "./KhestLogo";

const links = [
  { href: "/", label: "خانه" },
  { href: "/projects", label: "سرمایه‌گذاری" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/about", label: "درباره ما" },
  { href: "/learn", label: "مجله" },
  { href: "/support", label: "تماس با ما" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="luxe-header">
      <div className="luxe-header-inner">
        <Link href="/" className="luxe-brand" aria-label="خشت"><KhestLogo /></Link>
        <nav className="luxe-nav" aria-label="ناوبری اصلی">
          {links.map((link, index) => <Link key={`${link.href}-${index}`} href={link.href} className={index === 0 ? "active" : ""}>{link.label}</Link>)}
        </nav>
        <div className="luxe-header-actions">
          <Link href="/dashboard" className="luxe-login">ورود / ثبت‌نام</Link>
          <Link href="/projects" className="luxe-primary-button">شروع سرمایه‌گذاری <ArrowLeft size={16} /></Link>
          <button type="button" className="luxe-menu-button" aria-label={open ? "بستن منو" : "باز کردن منو"} onClick={() => setOpen((value) => !value)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {open && <nav className="luxe-mobile-nav" aria-label="ناوبری موبایل">
        {links.map((link, index) => <Link key={`${link.href}-${index}`} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Link href="/dashboard" onClick={() => setOpen(false)}>ورود / ثبت‌نام</Link>
        <Link href="/projects" className="luxe-primary-button" onClick={() => setOpen(false)}>شروع سرمایه‌گذاری <ArrowLeft size={16} /></Link>
      </nav>}
    </header>
  );
}
