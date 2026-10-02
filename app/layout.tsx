import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خشت | سرمایه‌گذاری بلوکی در ملک",
  description: "نمونهٔ اولیهٔ پلتفرم سرمایه‌گذاری خرد و شفاف در فرصت‌های ملکی.",
  icons: {
    icon: "/khesht-logo.png",
  },
  openGraph: {
    title: "خشت | مالکیت دیجیتال پروژه‌های ملکی",
    description: "دموی مفهومی توکنایز کردن فرصت‌های ملکی با بازار ثانویه و اتاق اسناد.",
    siteName: "خشت",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
