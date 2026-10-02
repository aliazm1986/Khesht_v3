import Link from "next/link";
import { ArrowLeft, Check, FileText, Search, Wallet, ShieldCheck, BarChart3, LockKeyhole, Coins } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">راهنمای خشت</span>
            <h1>مالکیت را ساده‌تر ببین.</h1>
            <p>از انتخاب پروژه تا مدیریت سبد، مسیر را در چهار ایستگاه روشن کرده‌ایم.</p>
          </div>
        </section>
        <section className="shell" style={{ paddingTop: 28 }}>
          <LegalDisclaimer />
        </section>
        <section className="shell">
          <div className="how-grid">
            <article className="how-card"><Search size={22} color="var(--red)" /><span>مرحلهٔ ۰۱</span><h2>پروژه را ببین</h2><p>پروژه‌ها را بر اساس شهر، نوع ملک، سطح ریسک و بازدهی برآوردی مقایسه کن.</p></article>
            <article className="how-card"><Coins size={22} color="var(--red)" /><span>مرحلهٔ ۰۲</span><h2>مبلغ را به توکن تبدیل کن</h2><p>Minimum simulated amount مشخص می‌کند چه تعداد توکن خشت شبیه‌سازی‌شده دریافت می‌کنی.</p></article>
            <article className="how-card"><Wallet size={22} color="var(--red)" /><span>مرحلهٔ ۰۳</span><h2>توکن طلا را ببین</h2><p>در مدل فرضی، توکن اولیه تا آغاز پروژه در ذخیرهٔ طلای شبیه‌سازی‌شده نگهداری می‌شود.</p></article>
            <article className="how-card"><BarChart3 size={22} color="var(--red)" /><span>مرحلهٔ ۰۴</span><h2>توکن خشت پروژه</h2><p>پس از آغاز پروژه، واحد نمونه به توکن خشت پروژه تبدیل و با گزارش‌ها به‌روزرسانی می‌شود.</p></article>
            <article className="how-card"><ShieldCheck size={22} color="var(--red)" /><span>مرحلهٔ ۰۵</span><h2>بازار ثانویه</h2><p>دفتر سفارش، خرید و فروش و کارمزد در بازار ثانویهٔ نمایشی دیده می‌شود؛ اجرای سفارش قطعی نیست.</p></article>
            <article className="how-card"><LockKeyhole size={22} color="var(--red)" /><span>مرحلهٔ ۰۶</span><h2>سه مسیر خروج</h2><p>بازار پویا، طرح نگهداری ۲۴ ماهه و حفاظت سرمایهٔ فرضی را کنار هم مقایسه کن.</p></article>
          </div>
        </section>
        <section className="section section-soft">
          <div className="shell trust-section">
            <div>
              <span className="mini-label">چک‌لیست تصمیم</span>
              <h2>قبل از ساختن، این چهار چیز را بخوان.</h2>
              <div className="trust-list">
                <div><b><Check size={14} /></b><span>میزان سرمایه و حداقل تعداد بلوک</span></div>
                <div><b><Check size={14} /></b><span>زمان قفل و مسیر احتمالی خروج</span></div>
                <div><b><Check size={14} /></b><span>بازده هدف، هزینه‌ها و ریسک‌های پروژه</span></div>
                <div><b><Check size={14} /></b><span>توکن خشت و گواهی مالکیت دیجیتال فرضی، سند رسمی ملک نیست</span></div>
              </div>
            </div>
            <div className="trust-visual">
              <div className="trust-quote"><span>نسخهٔ نمایشی</span><p>خشت قرار نیست به‌جای شما تصمیم بگیرد؛ قرار است تصمیم را واضح‌تر کند.</p></div>
            </div>
          </div>
        </section>
        <section className="shell" style={{ padding: "55px 0 80px" }}>
          <Link href="/projects" className="button button-red">مشاهدهٔ فرصت‌ها <ArrowLeft size={16} /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
