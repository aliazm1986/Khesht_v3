import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, BarChart3, Check, ChevronLeft, FileText, Layers3, LockKeyhole, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BlockArt } from "./components/BlockArt";
import { PropertyCard } from "./components/PropertyCard";
import { KhestLogo } from "./components/KhestLogo";
import { InvestmentCalculator } from "./components/InvestmentCalculator";
import { AutoInvestPanel } from "./components/AutoInvestPanel";
import { properties, formatCompactToman, formatToman, legalDisclaimerShort } from "@/lib/data";

export default function HomePage() {
  const featured = properties[0];
  return (
    <>
      <Header />
      <main>
        <section className="hero-wrap">
          <div className="hero shell">
            <div className="hero-copy">
              <span className="kicker">توکن‌سازی ملک، با یک نشان روشن</span>
              <h1>
                <em>خشت</em>
                <br />
                   پلتفرم هوشمند سرمایه گذاری و تامین املاک در ایران
              </h1>
              <p className="hero-lead">
                خشت یک تجربهٔ روان و شفاف برای دیدن، مقایسه و مدیریت «سرمایه گذاری در املاک» است؛ هر ملک به واحدهای دیجیتال بنام «خشت» تقسیم می‌شود
                و پلتفرم مسیر ارزش‌گذاری تا خروج را شفاف نشان می‌دهد.
              </p>
              <div className="hero-cta">
                <Link href="/projects" className="button button-red">کشف پروژه‌ها <ArrowLeft size={17} /></Link>
                <Link href="/how-it-works" className="inline-link">مدل خشت را ببین <ChevronLeft size={17} /></Link>
              </div>
              <div className="hero-trust-row">
                <span><ShieldCheck size={15} /> داده‌ها نمایشی‌اند</span>
                <span><FileText size={15} /> گزارش و سند کنار هر پروژه</span>
              </div>
            </div>
            <div className="hero-visual-wrap">
              <div className="hero-logo-orbit"><KhestLogo compact /></div>
              <div className="hero-card">
                <div className="hero-card-top">
                  <span> </span>
                  <span className="live-dot">عرضهٔ اولیه</span>
                </div>
                <div className="hero-art">
                  <BlockArt image={featured.image} accent={featured.accent} alt={`نمای معماری ${featured.name}`} />
                </div>
                <div className="hero-card-bottom">
                  <div className="hero-stat"><span>{featured.location}</span><strong>{featured.tokenSymbol}</strong></div>
                  <div className="hero-stat"><span>قیمت هر توکن</span><strong className="red">{formatToman(featured.tokenPriceCurrent)}</strong><small>تومان</small></div>
                  <div className="hero-stat"><span>تکمیل تأمین</span><strong>{featured.progress}%</strong><small>گزارش دوره‌ای</small></div>
                </div>
              </div>
              <div className="floating-metric"><span>ارزش‌گذاری نمونه</span><strong>{formatCompactToman(featured.projectValuation)}</strong><small>{featured.valuationDate} · گزارش دوره‌ای</small></div>
            </div>
          </div>
        </section>خانه‌ کار

        <section className="proof-strip">
          <div className="proof-grid shell">
            <div className="proof-item"><strong>توکن خشت</strong><span>واحد دیجیتال شبیه‌سازی‌شده</span></div>
            <div className="proof-item"><strong>توکن طلا</strong><span>نگهداری پیش از شروع پروژه</span></div>
            <div className="proof-item"><strong>۲۴ ماه</strong><span>طرح نگهداری بلندمدت نمونه</span></div>
            <div className="proof-item"><strong>۱ میلیارد</strong><span>حداقل معاملهٔ ثانویه</span></div>
          </div>
        </section>

        <section className="section shell">
          <div className="section-heading">
            <div><span className="mini-label">فرصت‌های توکن‌محور</span><h2>توکن بعدی‌ات را انتخاب کن.</h2></div>
            <Link href="/projects" className="inline-link">مشاهدهٔ همه <ArrowLeft size={16} /></Link>
          </div>
          <div className="property-grid">
            {properties.slice(0, 3).map((property, index) => <PropertyCard key={property.slug} property={property} featured={index === 0} />)}
          </div>
        </section>

        <section className="section section-soft" id="tools">
          <div className="shell">
            <div className="section-heading">
              <div><span className="mini-label">ابزارهای تصمیم</span><h2>قبل از خرید، سناریوها را امتحان کن.</h2></div>
              <p>دو ابزار تعاملی برای تبدیل یک ایدهٔ مالی به تصمیمی قابل توضیح.</p>
            </div>
            <div className="toolkit-grid">
              <InvestmentCalculator compact />
              <AutoInvestPanel />
            </div>
          </div>
        </section>

        <section className="section architecture-section">
          <div className="shell">
            <div className="section-heading">
              <div><span className="mini-label">مدل پلتفرمی خشت</span><h2>پول، پروژه و گزارش؛ در یک مسیر.</h2></div>
              <p>{legalDisclaimerShort}</p>
            </div>
            <div className="architecture-flow">
              <div className="flow-node"><span className="flow-icon"><WalletCards size={20} /></span><strong>بانک فرضی</strong><small>سپرده و تسویهٔ نمونه</small></div>
              <ArrowUpLeft className="flow-arrow" size={22} />
              <div className="flow-node accent"><span className="flow-icon"><Sparkles size={20} /></span><strong>توکن طلا شبیه‌سازی‌شده</strong><small>نگهداری موقت ارزش</small></div>
              <ArrowUpLeft className="flow-arrow" size={22} />
              <div className="flow-node"><span className="flow-icon"><Layers3 size={20} /></span><strong>توکن خشت پروژه</strong><small>واحد دیجیتال پروژه</small></div>
              <ArrowUpLeft className="flow-arrow" size={22} />
              <div className="flow-node"><span className="flow-icon"><BarChart3 size={20} /></span><strong>صندوق/صرافی فرضی</strong><small>بازار ثانویهٔ نمایشی</small></div>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell">
            <div className="section-heading"><div><span className="mini-label">از خرید تا گزارش</span><h2>چرخه‌ای که می‌شود دید.</h2></div><p>هر مرحله با وضعیت، تاریخ و سند نمونه همراه می‌شود.</p></div>
            <div className="steps-grid">
              <div className="step-card"><span className="step-number">۰۱ / VALUE</span><h3>ارزش‌گذاری</h3><p>ارزش پروژه و قیمت نمونهٔ توکن با گزارش دوره‌ای به‌روزرسانی می‌شود.</p></div>
              <div className="step-card"><span className="step-number">۰۲ / GOLD</span><h3>توکن طلا</h3><p>توکن اولیه پیش از شروع پروژه در ابزار طلای فرضی نگهداری می‌شود.</p></div>
              <div className="step-card"><span className="step-number">۰۳ / KH-Token</span><h3>توکن خشت</h3><p>پس از آغاز پروژه، واحد نمونه به توکن خشت همان پروژه تبدیل می‌شود.</p></div>
              <div className="step-card"><span className="step-number">۰۴ / MARKET</span><h3>بازار ثانویه</h3><p>خریدوفروش نمایشی، با دفتر سفارش و شرط وجود خریدار نمایش داده می‌شود.</p></div>
            </div>
          </div>
        </section>

        <section className="section shell" id="learn">
          <div className="section-heading"><div><span className="mini-label">سه مسیر تجربه</span><h2>برای هر تصمیم، یک نمای روشن.</h2></div></div>
          <div className="earn-grid">
            <div className="earn-card red"><LockKeyhole size={25} /><h3>نگهداری بلندمدت</h3><p>دورهٔ نمونهٔ ۲۴ ماهه، کارمزد کمتر و بازدهی برآوردی بالاتر؛ بدون وعدهٔ قطعی.</p><span className="earn-metric">۲۴ <small>ماه نمونه</small></span></div>
            <div className="earn-card"><Sparkles size={25} /><h3>حفاظت سرمایهٔ فرضی</h3><p>در سناریوی رکود فرضی، تبدیل موجودی به توکن طلا شبیه‌سازی می‌شود؛ بیمه یا تضمین واقعی نیست.</p><span className="earn-metric">۱٪ <small>کارمزد نمونه</small></span></div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell">
            <div className="section-heading"><div><span className="mini-label">الگوهای محصول خشت</span><h2>هر مسیر، یک نقطهٔ ورود دارد.</h2></div><Link href="/learn" className="inline-link">مجله و جامعه <ArrowLeft size={15} /></Link></div>
            <div className="feature-bento">
              <Link href="/finance" className="feature-tile feature-tile-red"><span className="feature-index">۰۱</span><strong> بررسی پیش از قرارداد </strong><p>پروژه را مرحله‌ای معرفی کن، سنجش اولیه بگیر و پروندهٔ گزارش بساز.</p><ArrowLeft size={17} /></Link>
              <Link href="/guarantees" className="feature-tile"><span className="feature-index">۰۲</span><strong>اعتماد و کنترل ریسک</strong><p>قبل از دیدن بازده، اسناد، ارزش‌گذاری و مسیر خروج را مرور کن.</p><ShieldCheck size={19} /></Link>
              <Link href="/faq" className="feature-tile"><span className="feature-index">۰۳</span><strong>پاسخ‌های روشن</strong><p>تفاوت توکن، گواهی دیجیتال و مالکیت رسمی را ساده بخوان.</p><FileText size={19} /></Link>
            </div>
          </div>
        </section>

        <section className="shell cta-panel">
          <div><span className="mini-label">قدم بعدی</span><h2>با یک پروژه شروع کن؛ با داده جلو برو.</h2><p>نسخهٔ نمایشی خشت برای دیدن جریان محصول ساخته شده است.</p></div>
          <div className="cta-actions"><Link href="/projects" className="button button-red">دیدن فرصت‌ها <ArrowLeft size={15} /></Link><Link href="/auto-invest" className="button button-ghost">ساختن قواعد شخصی</Link></div>
        </section>

        <section className="section section-soft">
          <div className="trust-section shell">
            <div><span className="mini-label">گواهی و دسترسی</span><h2>هر توکن، یک پروندهٔ قابل‌خواندن دارد.</h2><p>به‌جای نمایش یک برگهٔ سهام، در محیط مفهومی خشت «گواهی مالکیت دیجیتال فرضی» و اتاق اسناد پروژه را می‌بینید.</p><div className="trust-list"><div><b><Check size={15} /></b><span>گزارش ارزش‌گذاری و پیشرفت دوره‌ای</span></div><div><b><Check size={15} /></b><span>سطح دسترسی برنزی، نقره‌ای، طلایی و تیتانیومی</span></div><div><b><Check size={15} /></b><span>تمایز روشن بین توکن، مشارکت اقتصادی و مالکیت رسمی</span></div></div></div>
            <div className="trust-visual"><div className="trust-quote"><span>PROPERTY TOKEN OWNERSHIP CERTIFICATE</span><p>گواهی مشارکت دیجیتال فرضی؛ نه سند مالکیت رسمی.</p></div></div>
          </div>
        </section>

        <section className="shell" id="risk"><div className="risk-banner"><div><h3>شفافیت قبل از بازده</h3><p>این نسخه فقط برای تجربهٔ محصول است؛ هیچ عددی پیشنهاد، تضمین یا تعهد مالی نیست.</p></div><Link href="/how-it-works#risk">مطالعهٔ ریسک‌ها <ArrowLeft size={14} /></Link></div></section>
      </main>
      <Footer />
    </>
  );
}
