import Link from "next/link";
import { KhestLogo } from "./KhestLogo";
import { legalDisclaimer } from "@/lib/data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <Link href="/" className="brand"><KhestLogo /></Link>
          <p>
            خشت سازی املاک، مرحله‌به‌مرحله و شفاف.
            <br />
            نسخهٔ تجربهٔ محصول.
          </p>
        </div>
        <div>
          <h3>خشت</h3>
          <Link href="/how-it-works">چطور کار می‌کند؟</Link>
          <Link href="/projects">فرصت‌ها</Link>
          <Link href="/market">بازار ثانویهٔ نمایشی</Link>
          <Link href="/portfolio">سبد توکن‌ها</Link>
          <Link href="/auto-invest">سرمایه‌گذاری خودکار</Link>
        </div>
        <div>
          <h3>راهنما</h3>
          <Link href="/tiers">سطح دسترسی</Link>
          <Link href="/projects/shahrak-west/documents">اتاق اسناد نمونه</Link>
          <Link href="/how-it-works#risk">ریسک‌ها</Link>
          <Link href="/faq">پرسش‌های رایج</Link>
        </div>
        <div className="footer-note">
          <span className="mini-label">شفافیت اول</span>
          <p>
            {legalDisclaimer}
          </p>
          <Link href="/finance">ارسال پروژه برای بررسی </Link>
          <Link href="/learn">مجله و جامعهٔ خشت</Link>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© ۱۴۰۵ خشت</span>
        <span>ساخته‌شده برای تجربه‌ای روشن‌تر از ملک</span>
      </div>
    </footer>
  );
}
