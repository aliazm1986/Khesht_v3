import Link from "next/link";
import { Bell, BriefcaseBusiness, FileText, LayoutDashboard, LogOut, ShieldCheck, UserRound } from "lucide-react";

const links = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard, key: "dashboard" },
  { href: "/portfolio", label: "سرمایه‌گذاری‌های من", icon: BriefcaseBusiness, key: "portfolio" },
  { href: "/documents", label: "اسناد من", icon: FileText, key: "documents" },
  { href: "/notifications", label: "اعلان‌ها", icon: Bell, key: "notifications" },
  { href: "/kyc", label: "احراز هویت", icon: ShieldCheck, key: "kyc" },
  { href: "/profile", label: "پروفایل", icon: UserRound, key: "profile" },
  { href: "/exit", label: "درخواست خروج", icon: LogOut, key: "exit" },
];

export function InvestorNav({ active }: { active?: string }) {
  return (
    <nav className="investor-nav" aria-label="منوی سرمایه‌گذار">
      {links.map(({ href, label, icon: Icon, key }) => (
        <Link href={href} className={active === key ? "active" : ""} key={key}>
          <Icon size={16} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
