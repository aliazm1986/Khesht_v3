import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AuthFlow } from "../components/AuthFlow";

export default function AuthPage() {
  return <><Header /><main className="auth-page"><div className="auth-layout shell"><section className="auth-intro"><span className="mini-label">ورود و ثبت‌نام</span><h1>حساب خشت، برای دیدن مسیر سرمایه‌گذاری.</h1><p>با شماره همراه وارد شوید، پروفایل خود را کامل کنید و وضعیت احراز هویت، اسناد، درخواست‌ها و گزارش‌ها را از داشبورد دنبال کنید.</p><div className="auth-benefits"><div><b>۱</b><span>ورود با OTP نمایشی</span></div><div><b>۲</b><span>تکمیل KYC پایه</span></div><div><b>۳</b><span>ثبت درخواست و دریافت گواهی</span></div></div></section><AuthFlow /></div></main><Footer /></>;
}
