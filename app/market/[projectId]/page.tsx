import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BarChart3, MapPin } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MarketBoard } from "../../components/MarketBoard";
import { formatCompactToman, formatToman, properties } from "@/lib/data";

export function generateStaticParams() {
  return properties.map((property) => ({ projectId: property.slug }));
}

export default async function ProjectMarketPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const property = properties.find((item) => item.slug === projectId);
  if (!property) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <Link href="/market" className="inline-link"><ArrowRight size={14} /> بازگشت به بازار</Link>
            <div className="detail-meta" style={{ marginTop: 18 }}><span>{property.type}</span><i /><span><MapPin size={12} /> {property.location}</span><i /><span>{property.tokenSymbol}</span></div>
            <h1>بازار {property.tokenName}.</h1>
            <p>دفتر سفارش و ثبت سفارش نمایشی برای همین پروژه؛ ارزش توکن و حجم سفارش صرفاً داده‌نمای محصول است.</p>
          </div>
        </section>
        <section className="listing-section shell">
          <div className="market-summary-grid">
            <div><span>قیمت فعلی هر توکن</span><strong>{formatToman(property.tokenPriceCurrent)}</strong><small>تومان · شبیه‌سازی‌شده</small></div>
            <div><span>ارزش‌گذاری پروژه</span><strong>{formatCompactToman(property.projectValuation)}</strong><small>گزارش دوره‌ای نمونه</small></div>
            <div><span>عرضهٔ باقی‌مانده</span><strong>{formatToman(property.availableTokenSupply)}</strong><small>توکن نمایشی</small></div>
          </div>
          <div className="market-minimum"><strong>حداقل مبلغ معامله در بازار ثانویه نمایشی: ۱ میلیارد تومان</strong><span>اجرای سفارش به وجود خریدار، قیمت پیشنهادی و شرایط بازار بستگی دارد.</span></div>
          <MarketBoard project={property} />
        </section>
      </main>
      <Footer />
    </>
  );
}
