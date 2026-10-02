import Link from "next/link";
import { ArrowLeft, FileCheck2, Landmark, LockKeyhole, Scale, ShieldCheck } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

const mechanisms = [
  { icon: FileCheck2, title: "پروندهٔ اسناد", text: "خلاصهٔ پروژه، گزارش پیشرفت، ارزش‌گذاری و ضمائم در یک اتاق اسناد سطح‌بندی‌شده." },
  { icon: Scale, title: "ارزیابی مستقل", text: "منبع ارزش‌گذاری، تاریخ گزارش و اختلاف بین برنامه و واقعیت باید برای هر دوره ثبت شود." },
  { icon: Landmark, title: "ساختار نگهداری", text: "توکن طلا و تبدیل به توکن خشت در این MVP یک مکانیزم مفهومی است و نیازمند طراحی حقوقی مستقل است." },
  { icon: LockKeyhole, title: "کنترل خروج", text: "قفل، بازار ثانویه و مسیر تبدیل به توکن طلا جداگانه نمایش داده می‌شوند تا تصمیم پنهان نماند." },
];

export default function GuaranteesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">اعتماد و کنترل ریسک</span>
            <h1>تضمین را وعده نمی‌دهیم؛ سازوکار را توضیح می‌دهیم.</h1>
            <p>در محصول واقعی، نوع تضمین، ضامن، قرارداد و شرایط اجرا باید برای هر پروژه و با بررسی حقوقی مشخص شود.</p>
          </div>
        </section>
        <section className="section shell">
          <LegalDisclaimer />
          <div className="guarantee-grid">
            {mechanisms.map((item) => {
              const Icon = item.icon;
              return <article className="guarantee-card" key={item.title}><div className="guarantee-icon"><Icon size={20} /></div><h2>{item.title}</h2><p>{item.text}</p></article>;
            })}
          </div>
        </section>
        <section className="section section-soft">
          <div className="shell trust-section">
            <div>
              <span className="mini-label"><ShieldCheck size={14} /> یادداشت شفافیت</span>
              <h2>هیچ نموداری جای قرارداد را نمی‌گیرد.</h2>
              <p>این صفحه برای نشان دادن جایگاه اطلاعات ریسک در تجربهٔ کاربری ساخته شده است. اعداد و برچسب‌های نسخهٔ نمایشی، بیمه، تضمین اصل سرمایه یا مجوز فعالیت مالی نیستند.</p>
              <Link href="/how-it-works#risk" className="button button-red">خواندن ریسک‌ها <ArrowLeft size={15} /></Link>
            </div>
            <div className="trust-visual"><div className="trust-quote"><span>RISK FIRST</span><p>قبل از هر بازده، ببین چه چیزی می‌تواند تغییر کند.</p></div></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
