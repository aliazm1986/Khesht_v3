import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaqAccordion } from "../components/FaqAccordion";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">مرکز پاسخ خشت</span>
            <h1>قبل از ساختن، سؤال‌هایت را روشن کن.</h1>
            <p>پاسخ‌های کوتاه دربارهٔ توکن خشت، توکن طلا، بازار ثانویه و وضعیت نمایشی این محصول.</p>
          </div>
        </section>
        <section className="section shell faq-layout">
          <div className="faq-side">
            <div className="faq-side-icon"><ShieldCheck size={22} /></div>
            <h2>شفافیت، بخشی از محصول است.</h2>
            <p>هرجا پاسخ به مجوز، قرارداد یا عملیات واقعی نیاز داشته باشد، آن را به‌عنوان «نیازمند طراحی و بررسی» علامت زده‌ایم.</p>
            <Link href="/how-it-works#risk" className="inline-link">مرور ریسک‌ها <ArrowLeft size={15} /></Link>
            <div className="faq-contact"><MessageCircle size={16} /><span>پرسش دیگری داری؟ در نسخهٔ واقعی، پشتیبانی و نوبت مشاوره از همین مسیر در دسترس است.</span></div>
          </div>
          <div>
            <LegalDisclaimer />
            <FaqAccordion />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
