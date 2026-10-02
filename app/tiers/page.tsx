import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TierSelector } from "../components/TierSelector";
import { LegalDisclaimer } from "../components/LegalDisclaimer";

export default function TiersPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">شخصی‌سازی تجربه</span>
            <h1>سطح دسترسی خودت را انتخاب کن.</h1>
            <p>این چهار سطح فقط برای نمایش تجربهٔ کاربری و بازشدن بخش‌های مختلف دموی خشت هستند؛ طبقه‌بندی قانونی یا مالی نیستند.</p>
          </div>
        </section>
        <section className="listing-section shell">
          <LegalDisclaimer />
          <TierSelector />
        </section>
      </main>
      <Footer />
    </>
  );
}
