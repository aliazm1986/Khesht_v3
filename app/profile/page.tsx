import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProfileForm } from "../components/MemberCenters";
import { InvestorNav } from "../components/InvestorNav";

export default function ProfilePage() { return <><Header /><main><section className="page-hero"><div className="shell"><span className="mini-label">پروفایل</span><h1>دادهٔ شخصی، در کنترل شما.</h1><p>اطلاعات تماس، هویتی و حساب تسویه را ببینید و برای ادامهٔ KYC به‌روز کنید.</p></div></section><section className="member-page shell"><InvestorNav active="profile" /><div className="member-content"><ProfileForm /></div></section></main><Footer /></>; }
