import { notFound } from "next/navigation";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { InvestmentRequestForm } from "../../components/InvestmentRequestForm";
import { properties } from "@/lib/data";

export function generateStaticParams() { return properties.map((property) => ({ slug: property.slug })); }

export default async function InvestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();
  return <><Header /><main><section className="page-hero"><div className="shell"><Link href={`/projects/${property.slug}`} className="inline-link"><ArrowRight size={15} /> بازگشت به جزئیات پروژه</Link><span className="mini-label">درخواست سرمایه‌گذاری</span><h1>{property.name}</h1><p>فرآیند چهار مرحله‌ای برای انتخاب مبلغ، پذیرش ریسک، پرداخت نمایشی و صدور گواهی حق مالی.</p></div></section><section className="investment-page shell"><div className="investment-side"><span className="mini-label">پیش از ادامه</span><h2>اطلاعات کلیدی پروژه</h2><dl><div><dt>حداقل سرمایه‌گذاری</dt><dd>{property.minimumInvestment.toLocaleString("fa-IR")} تومان</dd></div><div><dt>سطح ریسک</dt><dd>{property.riskLevel}</dd></div><div><dt>ساختار حقوقی</dt><dd>SPV / قرارداد نمونه</dd></div></dl><div className="risk-callout"><ShieldCheck size={18} /><p>حق مالی شما در صورت اجرای واقعی، تابع قرارداد و ساختار حقوقی تعریف‌شده برای پروژه است.</p></div><Link href={`/projects/${property.slug}/documents`} className="inline-link"><FileText size={15} /> مطالعه اسناد پروژه</Link></div><InvestmentRequestForm property={property} /></section></main><Footer /></>;
}
