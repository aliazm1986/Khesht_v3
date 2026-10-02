import Link from "next/link";
import { ArrowLeft, BookOpen, MessageCircle, Star, Users } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const articles = [
  { category: "راهنمای توکن", title: "توکن طلا و توکن خشت چه تفاوتی دارند؟", note: "۳ دقیقه مطالعه", color: "red" },
  { category: "گزارش پروژه", title: "چطور نمودار پیشرفت یک ملک را بخوانیم؟", note: "۵ دقیقه مطالعه", color: "sand" },
  { category: "بازار ثانویه", title: "دفتر سفارش چه چیزی را نشان می‌دهد؟", note: "۴ دقیقه مطالعه", color: "wine" },
];

export default function LearnPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell">
            <span className="mini-label">مجله و جامعهٔ خشت</span>
            <h1>قبل از خرید، بهتر ببین.</h1>
            <p>یادداشت‌های کوتاه، تجربهٔ کاربران و توضیح زبان سادهٔ مفاهیم توکن‌محور ملک.</p>
          </div>
        </section>
        <section className="section shell">
          <div className="community-stats">
            <div><Users size={18} /><strong>جامعهٔ نمونه</strong><span>فضای گفت‌وگو و پرسش</span></div>
            <div><MessageCircle size={18} /><strong>پاسخ‌محور</strong><span>هر تصمیم با توضیح</span></div>
            <div><Star size={18} /><strong>بازخورد مستمر</strong><span>نسخهٔ محصول با نظر شما</span></div>
          </div>
          <div className="section-heading"><div><span className="mini-label"><BookOpen size={14} /> تازه‌های مجله</span><h2>سه تکه برای شروع.</h2></div><Link href="/faq" className="inline-link">سؤالات رایج <ArrowLeft size={15} /></Link></div>
          <div className="news-grid">
            {articles.map((article) => <article className={`news-card ${article.color}`} key={article.title}><span>{article.category}</span><h3>{article.title}</h3><p>{article.note} · محتوای نمایشی برای نسخهٔ MVP</p><Link href="/how-it-works" className="arrow-link">خواندن راهنما <ArrowLeft size={14} /></Link></article>)}
          </div>
        </section>
        <section className="section section-soft">
          <div className="shell community-quote-grid">
            <div><span className="mini-label">صدای کاربران نمونه</span><h2>اعتماد از گفت‌وگو می‌آید.</h2><p>در محصول واقعی، نظرها باید با رضایت کاربر، تاریخ و زمینهٔ مشخص نمایش داده شوند؛ نه به‌عنوان وعدهٔ بازده.</p></div>
            <div className="story-card"><div className="story-stars">★★★★★</div><p>«وقتی گزارش و ریسک کنار عدد بازده دیده می‌شود، تصمیم من آرام‌تر و قابل توضیح‌تر است.»</p><small>بازخورد فرضی · کاربر سطح نقره‌ای</small></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
