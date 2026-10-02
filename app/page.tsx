import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, ChartNoAxesCombined, Play, ShieldCheck, UsersRound } from "lucide-react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const opportunities = [
  { title: "مجتمع مسکونی آفتاب", place: "تهران، سعادت‌آباد", rate: "٪۲۸", progress: 72, image: "/projects/khest-hero.png", href: "/projects/shahrak-west" },
  { title: "بازسازی نارون", place: "تهران، یوسف‌آباد", rate: "٪۲۳", progress: 100, image: "/projects/khest-exterior.png", href: "/projects/narvan-renovation" },
  { title: "مارینا رزیدنس", place: "کیش، مرجان", rate: "٪۳۱", progress: 48, image: "/projects/khest-interior.png", href: "/projects/kish-marina" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="luxe-home">
        <section className="luxe-hero shell">
          <div className="luxe-hero-copy luxe-reveal">
            <p className="luxe-eyebrow">سرمایه‌گذاری خرد، ساختن فردا</p>
            <h1>با <em>خشت</em>،<br />در ساختن فردا شریک باشید</h1>
            <p className="luxe-lead">سرمایه‌گذاری خرد در املاک و مستغلات؛ امن، شفاف و در دسترس همه. با خشت، سهمی از دارایی‌های ارزشمند آینده داشته باشید.</p>
            <div className="luxe-hero-actions">
              <Link href="/projects" className="luxe-primary-button luxe-large">شروع سرمایه‌گذاری <ArrowLeft size={18} /></Link>
              <Link href="/how-it-works" className="luxe-video-button"><span><Play size={15} fill="currentColor" /></span>تماشای ویدیو</Link>
            </div>
            <div className="luxe-trust-list">
              <span><b><ShieldCheck size={18} /></b>دارای مجوز رسمی</span>
              <span><b><ChartNoAxesCombined size={18} /></b>شفاف و قابل پیگیری</span>
              <span><b><UsersRound size={18} /></b>سرمایه‌گذاری با مبالغ کم</span>
            </div>
          </div>

          <div className="luxe-hero-media luxe-reveal luxe-delay-1">
            <Image src="/projects/khesht-luxe-hero.png" alt="نمای صفحه اول پلتفرم خشت و ساختمان پروژه" fill priority sizes="(max-width: 900px) 100vw, 56vw" />
            <div className="luxe-hero-shade" />
            <div className="luxe-orbit luxe-orbit-a" /><div className="luxe-orbit luxe-orbit-b" />
            <aside className="luxe-roi-card">
              <span>بازدهی سالانه تخمینی</span>
              <strong>٪۲۴٫۵ <ArrowUpRight size={24} /></strong>
              <svg viewBox="0 0 240 84" role="img" aria-label="نمودار بازده صعودی"><path d="M4 70 C24 63 40 48 58 55 S91 66 108 48 S138 34 155 43 S187 28 202 30 S220 10 236 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
              <div className="luxe-roi-details"><span>ارزش هر واحد <b>۱۰۰٬۰۰۰٬۰۰۰</b></span><span>مدت پروژه <b>۲۴ ماه</b></span><span>تعداد سرمایه‌گذاران <b>۱٬۲۸۴</b></span></div>
            </aside>
            <div className="luxe-hero-whisper">آینده<br />ساخته می‌شود<br />با هم</div>
          </div>
        </section>

        <section className="luxe-metrics shell luxe-reveal luxe-delay-2">
          <div><span className="luxe-metric-icon"><UsersRound size={21} /></span><strong>۱٬۲۸۴</strong><p>سرمایه‌گذار فعال</p></div>
          <div><span className="luxe-metric-icon"><Building2 size={21} /></span><strong>۳۳</strong><p>پروژه در حال اجرا</p></div>
          <div><span className="luxe-metric-icon"><ArrowUpRight size={21} /></span><strong>۲٬۴۶۰</strong><p>میلیارد تومان ارزش کل پروژه‌ها</p></div>
          <div><span className="luxe-metric-icon"><ChartNoAxesCombined size={21} /></span><strong>۲۴٫۵</strong><p>میانگین بازدهی سالانه</p></div>
        </section>

        <section className="luxe-opportunities shell">
          <div className="luxe-section-heading luxe-reveal"><div><p className="luxe-eyebrow">فرصت‌های منتخب</p><h2>ملک‌ها را ببینید،<br />آگاهانه انتخاب کنید.</h2></div><Link href="/projects" className="luxe-text-link">مشاهده همه فرصت‌ها <ArrowLeft size={17} /></Link></div>
          <div className="luxe-opportunity-grid">
            {opportunities.map((item, index) => <article className={`luxe-property-card luxe-reveal luxe-delay-${index + 1}`} key={item.title}>
              <div className="luxe-property-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" /><span>در حال تأمین مالی</span></div>
              <div className="luxe-property-content"><p>{item.place}</p><h3>{item.title}</h3><div><span>بازده مورد انتظار <b>{item.rate}</b></span><span>تأمین مالی <b>٪{item.progress}</b></span></div><Link href={item.href}>جزئیات پروژه <ArrowLeft size={16} /></Link></div>
            </article>)}
          </div>
        </section>

        <section className="luxe-process"><div className="shell luxe-process-grid"><div className="luxe-reveal"><p className="luxe-eyebrow">روش کار خشت</p><h2>سرمایه‌گذاری،<br />به سادگی چند قدم.</h2><p>همهٔ اطلاعات، وضعیت پیشرفت و مستندات پروژه در یک تجربهٔ شفاف و قابل پیگیری کنار شماست.</p><Link href="/how-it-works" className="luxe-text-link">آشنایی با نحوه کار <ArrowLeft size={17} /></Link></div><div className="luxe-process-steps luxe-reveal luxe-delay-2"><article><b>۰۱</b><h3>پروژه را انتخاب کنید</h3><p>فرصت‌ها را با اطلاعات مالی و مستندات کامل مقایسه کنید.</p></article><article><b>۰۲</b><h3>سرمایه‌گذاری کنید</h3><p>با مبلغ دلخواه و فرآیند شفاف، سهم خود را ثبت کنید.</p></article><article><b>۰۳</b><h3>رشد را دنبال کنید</h3><p>پیشرفت پروژه و وضعیت سبدتان را در داشبورد ببینید.</p></article></div></div></section>
      </main>
      <Footer />
    </>
  );
}
