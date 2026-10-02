import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, ArrowUpRight, BarChart3, Building2, ChartNoAxesCombined, Check, Layers3, LockKeyhole, Play, ShieldCheck, Sparkles, UsersRound, WalletCards } from "lucide-react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PropertyCard } from "./components/PropertyCard";
import { InvestmentCalculator } from "./components/InvestmentCalculator";
import { AutoInvestPanel } from "./components/AutoInvestPanel";
import { properties, legalDisclaimerShort } from "@/lib/data";

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
        <section className="section luxe-extended-section" id="tools"><div className="shell"><div className="section-heading"><div><span className="mini-label">ابزارهای تصمیم</span><h2>پیش از سرمایه‌گذاری، سناریوها را بسنجید.</h2></div><p>محاسبهٔ بازده و سرمایه‌گذاری خودکار، در همان تجربهٔ شفاف خشت.</p></div><div className="toolkit-grid"><InvestmentCalculator compact /><AutoInvestPanel /></div></div></section>
        <section className="section section-soft luxe-extended-section"><div className="shell"><div className="section-heading"><div><span className="mini-label">فرصت‌های بیشتر</span><h2>سبد خود را با پروژه‌های منتخب بسازید.</h2></div><Link href="/projects" className="inline-link">همهٔ فرصت‌ها <ArrowLeft size={16} /></Link></div><div className="property-grid">{properties.slice(0, 3).map((property, index) => <PropertyCard key={property.slug} property={property} featured={index === 0} />)}</div></div></section>
        <section className="section architecture-section luxe-extended-section"><div className="shell"><div className="section-heading"><div><span className="mini-label">مدل پلتفرم</span><h2>پول، پروژه و گزارش؛ در یک مسیر روشن.</h2></div><p>{legalDisclaimerShort}</p></div><div className="architecture-flow"><div className="flow-node"><span className="flow-icon"><WalletCards size={20} /></span><strong>واریز امن</strong><small>ثبت شفاف مبلغ سرمایه‌گذاری</small></div><ArrowUpLeft className="flow-arrow" size={22} /><div className="flow-node accent"><span className="flow-icon"><Sparkles size={20} /></span><strong>انتخاب پروژه</strong><small>بررسی ریسک و گزارش‌ها</small></div><ArrowUpLeft className="flow-arrow" size={22} /><div className="flow-node"><span className="flow-icon"><Layers3 size={20} /></span><strong>سهم خشت</strong><small>ثبت مشارکت در پروژه</small></div><ArrowUpLeft className="flow-arrow" size={22} /><div className="flow-node"><span className="flow-icon"><BarChart3 size={20} /></span><strong>داشبورد رشد</strong><small>پیگیری گزارش و بازده</small></div></div></div></section>
        <section className="section section-soft luxe-extended-section"><div className="shell"><div className="section-heading"><div><span className="mini-label">از انتخاب تا رشد</span><h2>چرخه‌ای که همیشه قابل پیگیری است.</h2></div><p>هر مرحله با وضعیت، تاریخ و مستندات روشن نمایش داده می‌شود.</p></div><div className="steps-grid"><div className="step-card"><span className="step-number">۰۱ / VALUE</span><h3>ارزش‌گذاری</h3><p>گزارش مالی و ارزش پروژه را پیش از تصمیم بررسی کنید.</p></div><div className="step-card"><span className="step-number">۰۲ / INVEST</span><h3>سرمایه‌گذاری</h3><p>با هر مبلغی که انتخاب می‌کنید، سهم خود را ثبت کنید.</p></div><div className="step-card"><span className="step-number">۰۳ / TRACK</span><h3>پیگیری پیشرفت</h3><p>گزارش‌های دوره‌ای پروژه همیشه در دسترس شماست.</p></div><div className="step-card"><span className="step-number">۰۴ / RETURN</span><h3>بازده</h3><p>زمان‌بندی و جزئیات پرداخت را از داشبورد دنبال کنید.</p></div></div></div></section>
        <section className="section luxe-extended-section"><div className="shell"><div className="section-heading"><div><span className="mini-label">مسیرهای سرمایه‌گذاری</span><h2>برای هر هدف، یک انتخاب روشن.</h2></div></div><div className="earn-grid"><div className="earn-card red"><LockKeyhole size={25} /><h3>نگهداری بلندمدت</h3><p>برای سرمایه‌گذارانی که به رشد تدریجی دارایی در یک بازهٔ مشخص فکر می‌کنند.</p><span className="earn-metric">۲۴ <small>ماه</small></span></div><div className="earn-card"><ShieldCheck size={25} /><h3>تصمیم آگاهانه</h3><p>مستندات، ریسک و وضعیت پروژه را قبل از هر انتخاب با شفافیت مرور کنید.</p><span className="earn-metric">۱۰۰٪ <small>شفاف</small></span></div></div></div></section>
        <section className="shell cta-panel luxe-extended-section"><div><span className="mini-label">قدم بعدی</span><h2>با یک پروژه شروع کنید؛ با داده جلو بروید.</h2><p>هر آنچه برای انتخاب آگاهانه لازم دارید، یک‌جا در خشت قابل مشاهده است.</p></div><div className="cta-actions"><Link href="/projects" className="button button-red">دیدن فرصت‌ها <ArrowLeft size={15} /></Link><Link href="/dashboard" className="button button-ghost">ورود به داشبورد</Link></div></section>
        <section className="section section-soft luxe-extended-section"><div className="trust-section shell"><div><span className="mini-label">شفافیت و اعتماد</span><h2>هر سرمایه‌گذاری، یک پروندهٔ قابل‌خواندن دارد.</h2><p>گزارش ارزش‌گذاری، پیشرفت پروژه و زمان‌بندی پرداخت‌ها در یک محیط منظم کنار هم هستند.</p><div className="trust-list"><div><b><Check size={15} /></b><span>گزارش ارزش‌گذاری و پیشرفت دوره‌ای</span></div><div><b><Check size={15} /></b><span>نمای روشن از ترکیب و عملکرد سبد</span></div><div><b><Check size={15} /></b><span>تفکیک شفاف ریسک، بازده و زمان‌بندی</span></div></div></div><div className="trust-visual"><div className="trust-quote"><span>KHESHT INVESTMENT REPORT</span><p>اطلاعات کامل پروژه، در دسترس پیش از هر تصمیم.</p></div></div></div></section>
      </main>
      <Footer />
    </>
  );
}
