"use client";

import { ChevronDown, CircleHelp } from "lucide-react";
import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export const khishtFaq: FaqItem[] = [
  {
    question: "حداقل مبلغ ورود در خشت چقدر است؟",
    answer: "در این نسخهٔ نمایشی، حداقل مبلغ هر پروژه در کارت همان پروژه نمایش داده می‌شود. عددها نمونه‌اند و در محصول واقعی به ساختار حقوقی، پروژه و مقررات بستگی دارند.",
  },
  {
    question: "توکن خشت با سند رسمی ملک یکی است؟",
    answer: "خیر. توکن خشت در این مدل یک واحد مشارکت دیجیتال فرضی است و «گواهی مالکیت دیجیتال» جایگزین سند رسمی ملک یا ورقهٔ سهام قانونی نمی‌شود.",
  },
  {
    question: "توکن طلا چه زمانی به توکن خشت تبدیل می‌شود؟",
    answer: "در سناریوی محصول، توکن اولیه تا شروع پروژه در لایهٔ طلای شبیه‌سازی‌شده نگهداری می‌شود و پس از عبور از نقطهٔ شروع پروژه به توکن همان پروژه تبدیل می‌شود.",
  },
  {
    question: "آیا بازار ثانویه نقدشوندگی را تضمین می‌کند؟",
    answer: "خیر. بازار ثانویه فقط مسیر ثبت و تطبیق سفارش را نشان می‌دهد. انجام معامله به وجود خریدار، قیمت، اسناد و شرایط حقوقی و عملیاتی وابسته است.",
  },
  {
    question: "سرمایه‌گذاری خودکار چگونه کار می‌کند؟",
    answer: "کاربر بازده برآوردی، افق نگهداری و نوع پروژه را انتخاب می‌کند. سامانهٔ واقعی می‌تواند فرصت‌های منطبق را پیشنهاد دهد؛ تأیید نهایی و کنترل سقف مبلغ باید همیشه با کاربر باشد.",
  },
  {
    question: "اطلاعات پروژه‌ها هر چند وقت به‌روزرسانی می‌شود؟",
    answer: "در نسخهٔ MVP، زمان آخرین ارزش‌گذاری و گزارش پیشرفت کنار پروژه نمایش داده می‌شود. در محصول واقعی، تقویم گزارش، منبع ارزیابی و تاریخچهٔ تغییرات باید قابل مشاهده باشد.",
  },
];

export function FaqAccordion({ items = khishtFaq }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <article className={`faq-item ${open ? "open" : ""}`} key={item.question}>
            <button type="button" className="faq-question" onClick={() => setOpenIndex(open ? null : index)} aria-expanded={open}>
              <span><CircleHelp size={17} />{item.question}</span>
              <ChevronDown size={17} />
            </button>
            {open && <div className="faq-answer"><p>{item.answer}</p></div>}
          </article>
        );
      })}
    </div>
  );
}
