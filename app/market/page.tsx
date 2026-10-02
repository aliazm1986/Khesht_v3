import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MarketBoard } from "../components/MarketBoard";
import { legalDisclaimerShort } from "@/lib/data";

export default function MarketPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">صندوق / صرافی فرضی</span>
            <h1>بازار ثانویهٔ توکن خشت.</h1>
            <p>دفتر سفارش، معاملهٔ اخیر و ثبت سفارش در یک بازار آرام و گزارش‌محور؛ نه یک صرافی هیجانی.</p>
          </div>
        </section>
        <section className="listing-section shell">
          <div className="market-minimum"><strong>حداقل مبلغ معامله: ۱ میلیارد تومان</strong><span>{legalDisclaimerShort}</span></div>
          <MarketBoard />
        </section>
      </main>
      <Footer />
    </>
  );
}
