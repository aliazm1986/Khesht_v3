import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NotificationsCenter } from "../components/MemberCenters";
import { InvestorNav } from "../components/InvestorNav";

export default function NotificationsPage() { return <><Header /><main><section className="page-hero"><div className="shell"><span className="mini-label">مرکز اعلان‌ها</span><h1>خبر مهم، در زمان درست.</h1><p>رویدادهای KYC، سرمایه‌گذاری، اسناد، پروژه و اقدام‌های موردنیاز کاربر در این بخش ثبت می‌شوند.</p></div></section><section className="member-page shell"><InvestorNav active="notifications" /><div className="member-content"><NotificationsCenter /></div></section></main><Footer /></>; }
