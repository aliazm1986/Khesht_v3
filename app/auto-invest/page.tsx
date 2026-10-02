import Link from "next/link";
import { ArrowLeft, BellRing, Check } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AutoInvestPanel } from "../components/AutoInvestPanel";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

export default function AutoInvestPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">قواعد شخصی سرمایه‌گذاری</span>
            <h1>پیدا کردن فرصت، یک کار تکراری نیست.</h1>
            <p>فیلترهای خودت را ذخیره کن تا در نسخهٔ واقعی، فرصت‌های منطبق را قبل از تصمیم نهایی ببینی.</p>
          </div>
        </section>
        <section className="section shell auto-page-layout">
          <div>
            <LegalDisclaimer />
            <AutoInvestPanel />
          </div>
          <aside className="auto-page-aside">
            <span className="mini-label"><BellRing size={14} /> جریان پیشنهادی</span>
            <h2>اعلان، نه خرید بی‌اجازه.</h2>
            <p>معماری این قابلیت طوری طراحی شده که پیشنهاد با تأیید کاربر جدا باشد؛ سقف مبلغ، نوع پروژه و وضعیت حساب باید قبل از اجرا کنترل شود.</p>
            <div className="aside-checks">
              <div><Check size={14} /> معیارهای قابل تغییر</div>
              <div><Check size={14} /> توقف با یک کلیک</div>
              <div><Check size={14} /> ثبت تاریخچهٔ تصمیم</div>
            </div>
            <Link href="/projects" className="button button-red">مرور پروژه‌ها <ArrowLeft size={15} /></Link>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
