import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, ImageIcon, LineChart } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { DocumentsRoom } from "../../../components/DocumentsRoom";
import { LegalDisclaimer } from "../../../components/LegalDisclaimer";
import { properties, formatCompactToman } from "@/lib/data";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function DocumentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <Link href={`/projects/${property.slug}`} className="inline-link"><ArrowRight size={14} /> بازگشت به پروژه</Link>
            <h1>گزارش و اتاق اسناد.</h1>
            <p>رشد پروژه، ارزش‌گذاری دوره‌ای و اسناد هر مرحله در یک پروندهٔ نمایشی.</p>
          </div>
        </section>
        <section className="section shell">
          <LegalDisclaimer />
          <div className="report-overview">
            <div><span className="mini-label">رشد نسبت به زمان‌بندی</span><strong>{property.actualProgress}%</strong><small>پیشرفت گزارش‌شده · برنامه {property.plannedProgress}%</small></div>
            <div><span className="mini-label">ارزش‌گذاری فعلی</span><strong>{formatCompactToman(property.projectValuation)}</strong><small>آخرین گزارش: {property.valuationDate}</small></div>
            <div><span className="mini-label">تصاویر دوره‌ای</span><strong>{property.progressUpdates.length}</strong><small>مرحلهٔ ساخت و معماری</small></div>
          </div>
          <div className="report-chart-panel">
            <div className="panel-title-row"><div><span className="mini-label">نمودار رشد پروژه</span><h2>پیشرفت، ارزش و سرمایه</h2></div><LineChart size={20} color="var(--red)" /></div>
            <div className="progress-chart"><div className="chart-axis"><span>۱۰۰٪</span><span>۷۵٪</span><span>۵۰٪</span><span>۲۵٪</span><span>۰٪</span></div><div className="chart-bars">{property.progressUpdates.map((item) => <div className="chart-bar-group" key={item.stage}><div className="chart-bar planned" style={{ height: `${item.progress + 8}%` }} /><div className="chart-bar actual" style={{ height: `${item.progress}%` }} /><small>{item.stage}</small></div>)}</div></div>
            <p className="chart-note"><BarChart3 size={14} /> قیمت‌گذاری پروژه در این محیط به‌صورت دوره‌ای و بر اساس گزارش‌های ارزش‌گذاری نمونه به‌روزرسانی می‌شود؛ به‌معنای تضمین قیمت فروش یا بازدهی آینده نیست.</p>
          </div>
          <div className="gallery-heading"><div><span className="mini-label">گزارش‌های تصویری</span><h2>مراحل پروژه، تاریخ‌دار و قابل مقایسه.</h2></div><ImageIcon size={21} color="var(--red)" /></div>
          <div className="progress-gallery">{property.progressUpdates.map((item) => <article key={item.stage}><div className="gallery-image"><Image src={item.image} alt={`گزارش ${item.stage} پروژهٔ ${property.name}`} fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} /><span>{item.progress}% پیشرفت</span></div><div><span className="mini-label">{item.date}</span><h3>{item.stage}</h3><p>{item.note}</p><small>گزارش دوره‌ای نمایشی · منتشرشده</small></div></article>)}</div>
          <div style={{ marginTop: 65 }}><DocumentsRoom property={property} /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
