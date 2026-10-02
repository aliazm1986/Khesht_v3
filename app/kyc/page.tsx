import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { KycForm } from "../components/KycForm";
import { InvestorNav } from "../components/InvestorNav";

export default function KycPage() {
  return <><Header /><main><section className="page-hero"><div className="shell"><span className="mini-label">احراز هویت پایه</span><h1>اطلاعات را کامل کنید، آگاهانه ادامه دهید.</h1><p>برای حفاظت از حساب کاربر و ثبت درخواست سرمایه‌گذاری، اطلاعات هویتی و بانکی در یک جریان قابل پیگیری بررسی می‌شوند.</p></div></section><section className="member-page shell"><InvestorNav active="kyc" /><div className="member-content"><KycForm /></div></section></main><Footer /></>;
}
