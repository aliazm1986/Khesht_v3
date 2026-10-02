import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PortfolioTabs } from "../components/PortfolioTabs";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">سبد توکن‌ها</span>
            <h1>هر واحد، در جای خودش.</h1>
            <p>توکن‌های خشت، توکن‌های طلای شبیه‌سازی‌شده، قفل‌ها و حفاظت فرضی را در یک نمای یکپارچه ببین.</p>
          </div>
        </section>
        <section className="listing-section shell"><LegalDisclaimer /><PortfolioTabs /></section>
      </main>
      <Footer />
    </>
  );
}
