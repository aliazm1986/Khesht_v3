import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AdminWorkspace } from "../components/AdminWorkspace";

export default function AdminPage() { return <><Header /><main><section className="page-hero"><div className="shell"><span className="mini-label">پنل مدیریت</span><h1>کنترل پایهٔ عملیات پایلوت.</h1><p>مدیریت کاربران، KYC، پروژه‌ها، تیکت‌ها و لاگ حسابرسی برای مشاهدهٔ جریان عملیاتی MVP.</p></div></section><section className="listing-section shell"><AdminWorkspace /></section></main><Footer /></>; }
