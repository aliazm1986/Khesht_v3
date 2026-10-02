import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BarChart3, FileCheck2, Info, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { BlockArt } from "../../components/BlockArt";
import { BuySimulator } from "../../components/BuySimulator";
import { LegalDisclaimer } from "../../components/LegalDisclaimer";
import { formatCompactToman, formatToman, properties } from "@/lib/data";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();

  return (
    <>
      <Header />
      <main>
        <div className="shell detail-layout">
          <div className="detail-art-wrap">
            <BlockArt accent={property.accent} image={property.image} alt={`نمای معماری ${property.name}`} />
            <div className="detail-art-caption">
              <span><MapPin size={13} /> {property.location}</span>
              <span>{property.status} · گزارش {property.progress}%</span>
            </div>
          </div>
          <div className="detail-copy">
            <Link href="/projects" className="inline-link"><ArrowRight size={15} /> بازگشت به فرصت‌ها</Link>
            <div className="detail-meta" style={{ marginTop: 24 }}><span>{property.type}</span><i /><span>کد KH-{property.slug.slice(0, 2).toUpperCase()}</span><i /><span>{property.riskLevel} ریسک نمونه</span></div>
            <h1>{property.name}</h1>
            <p>{property.description}</p>
            <div className="detail-stat-grid">
              <div><span>قیمت هر توکن</span><strong>{formatToman(property.tokenPriceCurrent)} تومان</strong></div>
              <div><span>ارزش‌گذاری پروژه</span><strong>{formatCompactToman(property.projectValuation)}</strong></div>
              <div><span>عرضهٔ باقی‌مانده</span><strong>{formatToman(property.availableTokenSupply)}</strong></div>
            </div>
            <div className="token-identity-card">
              <div className="token-mark"><Sparkles size={17} /></div>
              <div><span>توکن پروژه</span><strong>{property.tokenName}</strong><small>{property.tokenSymbol} · هر واحد یک مشارکت دیجیتال شبیه‌سازی‌شده</small></div>
              <span className="verified-chip"><ShieldCheck size={14} /> نمونه</span>
            </div>
            <div className="feature-pills">{property.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
            <LegalDisclaimer />
            <BuySimulator property={property} />
            <div className="lifecycle-panel">
              <div className="panel-title-row"><div><span className="mini-label">چرخهٔ عمر توکن</span><h2>از ارزیابی تا تسویه</h2></div><BarChart3 size={19} color="var(--red)" /></div>
              <div className="lifecycle-track">{property.lifecycle.map((item, index) => <div className={`lifecycle-step ${item.status}`} key={item.title}><span>{index + 1}</span><strong>{item.title}</strong><small>{item.note}</small></div>)}</div>
              <p className="lifecycle-copy">در مدل مفهومی خشت، توکن‌های اولیه تا زمان آغاز رسمی پروژه در یک ابزار طلای پشتیبان شبیه‌سازی‌شده نگهداری می‌شوند. پس از آغاز پروژه، این واحدها به توکن خشت همان پروژه تبدیل می‌شوند.</p>
            </div>
            <div className="valuation-card">
              <div><span className="mini-label">ارزش‌گذاری دوره‌ای</span><h2>{formatCompactToman(property.projectValuation)}</h2><p>گزارش نمونه توسط «کارشناس رسمی دادگستری»؛ بدون ادعای گزارش واقعی.</p></div>
              <div className="valuation-mini-chart"><span style={{ height: "35%" }} /><span style={{ height: "49%" }} /><span style={{ height: "56%" }} /><span style={{ height: "72%" }} /><span style={{ height: "84%" }} /></div>
              <div className="valuation-dates"><span>آخرین: {property.valuationDate}</span><span>بعدی: {property.nextValuationDate}</span></div>
            </div>
            <div className="detail-action-row">
              <Link href={`/projects/${property.slug}/documents`} className="button button-ghost"><FileCheck2 size={16} /> اتاق اسناد پروژه</Link>
              <Link href={`/market/${property.slug}`} className="button button-ghost"><BarChart3 size={16} /> بازار ثانویهٔ همین پروژه</Link>
            </div>
            <div className="detail-note"><Info size={15} /><span>اعداد این صفحه برای نمایش تجربهٔ محصول ساخته شده‌اند و ارزش حقوقی یا مالی ندارند.</span></div>
            <div className="doc-row"><FileCheck2 size={17} /><span>گواهی مالکیت دیجیتال فرضی جایگزین سند رسمی، سهم SPV یا مالکیت قانونی ملک نیست.</span></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
