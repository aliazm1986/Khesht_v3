import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PropertyFilters } from "../components/PropertyFilters";
import { LegalDisclaimer } from "../components/LegalDisclaimer";
import { properties } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">کتابخانهٔ فرصت‌ها</span>
            <h1>فرصت مناسب خودت را پیدا کن.</h1>
            <p>فیلتر کن، مقایسه کن و قبل از هر تصمیم، قیمت توکن، عرضه، گزارش و چرخهٔ تبدیل را ببین.</p>
          </div>
        </section>
        <section className="listing-section shell">
          <LegalDisclaimer />
          <PropertyFilters properties={properties} />
        </section>
      </main>
      <Footer />
    </>
  );
}
