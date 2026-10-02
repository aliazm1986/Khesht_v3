import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, PieChart, Plus, WalletCards } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

const holdings = [
  { name: "برج آفتاب", meta: "شهرک غرب · ۱۲ بلوک", value: "۱۵٬۰۰۰٬۰۰۰", change: "+۲۷٪", color: "#d91f35" },
  { name: "کیش مارینا", meta: "کیش · ۸ بلوک", value: "۱۶٬۸۰۰٬۰۰۰", change: "+۳۱٪", color: "#b4442e" },
  { name: "خانه‌کار", meta: "میرداماد · ۴ بلوک", value: "۱۳٬۸۰۰٬۰۰۰", change: "+۲۴٪", color: "#96334d" },
];

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="dashboard-shell shell">
        <div className="dashboard-top">
          <div>
            <span className="mini-label">داشبورد نمونه</span>
            <h1>سلام، علی.</h1>
            <p>اینجا جایی است که توکن‌های خشت و طلای شبیه‌سازی‌شده‌ات را کنار هم می‌بینی.</p>
          </div>
          <span className="demo-tag">دموی تعاملی</span>
        </div>
        <div className="dashboard-cards">
          <div className="dashboard-card primary"><span>ارزش برآوردی کل سبد</span><strong>۴۵٬۶۰۰٬۰۰۰</strong><small>+۲۸٫۴٪ از شروع · نمایشی</small></div>
          <div className="dashboard-card"><span>درآمد ماهانهٔ هدف</span><strong>۱٬۰۶۵٬۰۰۰</strong><small>تومان · قابل‌پیگیری</small></div>
          <div className="dashboard-card"><span>تعداد توکن‌های خشت</span><strong>۲۴</strong><small>در ۳ فرصت</small></div>
        </div>
        <div className="dashboard-grid">
          <section className="dashboard-panel">
            <h2>روند ارزش سبد</h2>
            <div className="fake-chart" aria-label="نمودار نمایشی ارزش سبد">
              <svg viewBox="0 0 700 230" preserveAspectRatio="none" role="img">
                <defs><linearGradient id="khisht-chart" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d91f35" stopOpacity=".26" /><stop offset="1" stopColor="#d91f35" stopOpacity="0" /></linearGradient></defs>
                <path d="M0 190 C70 180 80 150 145 158 S225 125 290 140 S360 105 430 118 S510 70 570 89 S635 45 700 58 V230 H0 Z" fill="url(#khisht-chart)" />
                <path d="M0 190 C70 180 80 150 145 158 S225 125 290 140 S360 105 430 118 S510 70 570 89 S635 45 700 58" fill="none" stroke="#d91f35" strokeWidth="3" />
              </svg>
            </div>
          </section>
          <section className="dashboard-panel">
            <h2>ترکیب سبد <PieChart size={16} color="var(--red)" /></h2>
            <div className="holdings-list">
              {holdings.map((holding) => (
                <div className="holding-row" key={holding.name}>
                  <div className="holding-name"><span className="holding-dot" style={{ background: holding.color }} /><div><b>{holding.name}</b><small>{holding.meta}</small></div></div>
                  <div><strong>{holding.value}</strong><small style={{ color: "var(--green)" }}>{holding.change}</small></div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="dashboard-panel" style={{ marginTop: 13 }}>
          <div className="section-heading" style={{ marginBottom: 12 }}>
            <div><h2 style={{ margin: 0 }}>قدم بعدی</h2><p>یک فرصت تازه به سبدت اضافه کن.</p></div>
            <Link href="/projects" className="button button-red button-small"><Plus size={15} /> کشف فرصت‌ها</Link>
          </div>
          <div style={{ display: "flex", gap: 12, color: "var(--muted)", fontSize: 11, alignItems: "center" }}>
            <WalletCards size={18} color="var(--red)" />
            <span>پس از انتخاب، شبیه‌ساز خرید تعداد توکن و درآمد هدف را برایت محاسبه می‌کند.</span>
            <ArrowUpLeft size={15} color="var(--red)" />
          </div>
        </section>
        <LegalDisclaimer className="dashboard-disclaimer" />
        <div style={{ marginTop: 24 }}><Link href="/projects" className="inline-link">بازگشت به فرصت‌ها <ArrowLeft size={15} /></Link></div>
      </main>
      <Footer />
    </>
  );
}
