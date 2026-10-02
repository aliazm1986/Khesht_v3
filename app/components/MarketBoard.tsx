"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BadgeInfo, CheckCircle2, CircleDollarSign, Clock3, TrendingUp } from "lucide-react";
import { formatCompactToman, formatToman, properties, type Property } from "@/lib/data";

const orders = [
  { side: "فروش", symbol: "KH-AFTAB", price: 552_000, quantity: 780, total: 430_560_000, status: "در انتظار تطبیق" },
  { side: "خرید", symbol: "KH-NARVAN", price: 531_000, quantity: 2_100, total: 1_115_100_000, status: "بخشی تطبیق‌شده" },
  { side: "فروش", symbol: "KH-MARINA", price: 803_000, quantity: 1_460, total: 1_172_380_000, status: "ثبت‌شده" },
  { side: "خرید", symbol: "KH-MIRDAMAD", price: 1_078_000, quantity: 980, total: 1_056_440_000, status: "تطبیق کامل" },
];

export function MarketBoard({ project }: { project?: Property }) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [symbol, setSymbol] = useState(project?.tokenSymbol ?? properties[0].tokenSymbol);
  const [quantity, setQuantity] = useState("2000");
  const [price, setPrice] = useState("550000");
  const [notice, setNotice] = useState("");
  const selected = properties.find((item) => item.tokenSymbol === symbol) ?? properties[0];
  const total = Number(quantity || 0) * Number(price || 0);
  const fee = Math.round(total * 0.015);
  const validMinimum = total >= 1_000_000_000;
  const marketRows = useMemo(() => orders.map((order) => ({ ...order, accent: order.side === "خرید" ? "positive" : "negative" })), []);

  return (
    <div className="market-layout">
      <section className="market-panel order-entry">
        <div className="panel-title-row"><div><span className="mini-label">ثبت سفارش نمایشی{project ? ` · ${project.tokenSymbol}` : ""}</span><h2>بازار ثانویهٔ پویا</h2></div><TrendingUp size={19} color="var(--red)" /></div>
        <p className="market-helper">این بازار توسط «صندوق/صرافی فرضی» شبیه‌سازی می‌شود و هیچ سفارش واقعی ارسال نمی‌کند.</p>
        <div className="order-tabs"><button className={side === "buy" ? "active" : ""} onClick={() => setSide("buy")} type="button">ثبت سفارش خرید</button><button className={side === "sell" ? "active" : ""} onClick={() => setSide("sell")} type="button">ثبت سفارش فروش</button></div>
        <label className="form-field"><span>توکن پروژه</span><select value={symbol} onChange={(event) => setSymbol(event.target.value)}>{properties.map((item) => <option value={item.tokenSymbol} key={item.tokenSymbol}>{item.tokenName} · {item.tokenSymbol}</option>)}</select></label>
        <div className="form-grid-two">
          <label className="form-field"><span>تعداد توکن</span><input value={quantity} onChange={(event) => setQuantity(event.target.value.replace(/\D/g, ""))} inputMode="numeric" /></label>
          <label className="form-field"><span>قیمت هر توکن</span><input value={price} onChange={(event) => setPrice(event.target.value.replace(/\D/g, ""))} inputMode="numeric" /></label>
        </div>
        <div className="market-total"><span>ارزش سفارش</span><strong>{formatCompactToman(total)} تومان</strong><small>کارمزد نمایشی: {formatToman(fee)} تومان</small></div>
        {!validMinimum && <div className="sim-error"><BadgeInfo size={15} /> حداقل مبلغ معامله در بازار ثانویهٔ نمایشی: ۱ میلیارد تومان</div>}
        <button type="button" className="button button-red button-wide" disabled={!validMinimum} onClick={() => setNotice(`سفارش ${side === "buy" ? "خرید" : "فروش"} ${selected.tokenSymbol} در محیط نمایشی ثبت شد.`)}>ثبت سفارش نمایشی <ArrowLeft size={16} /></button>
        {notice && <p className="sim-success"><CheckCircle2 size={14} /> {notice}</p>}
        <p className="market-disclaimer">ورود سفارش به بازار ثانویه به‌معنای انجام قطعی معامله نیست و اجرای آن به وجود خریدار، قیمت پیشنهادی و شرایط بازار بستگی دارد.</p>
      </section>
      <section className="market-panel">
        <div className="market-summary-grid">
          <div><span>شاخص بازار نمونه</span><strong>+۱۲٫۸٪</strong><small><TrendingUp size={13} /> ۳۰ روز اخیر</small></div>
          <div><span>حجم معاملات نمونه</span><strong>۲۸٫۴ میلیارد</strong><small><CircleDollarSign size={13} /> تومان</small></div>
          <div><span>زمان تسویهٔ فرضی</span><strong>۱–۲ روز</strong><small><Clock3 size={13} /> مشروط به تطبیق</small></div>
        </div>
        <div className="panel-title-row market-order-title"><div><span className="mini-label">دفتر سفارشات</span><h2>قیمت‌های پیشنهادی</h2></div><span className="market-status"><i /> بازار بازِ نمایشی</span></div>
        <div className="order-book">
          <div className="order-book-head"><span>سمت</span><span>توکن</span><span>قیمت</span><span>تعداد</span><span>وضعیت</span></div>
          {marketRows.map((order, index) => <div className="order-book-row" key={`${order.symbol}-${index}`}><span className={order.accent}>{order.side}</span><b>{order.symbol}</b><span>{formatToman(order.price)}</span><span>{formatToman(order.quantity)}</span><small>{order.status}</small></div>)}
        </div>
        <div className="recent-trades"><h3>معاملات اخیرِ شبیه‌سازی‌شده</h3><div><span>KH-AFTAB · ۱٬۲۰۰ توکن</span><b>۵۴۸٬۰۰۰ تومان</b><small>امروز، ۱۰:۲۸</small></div><div><span>KH-MARINA · ۳۰۰ توکن</span><b>۷۹۸٬۰۰۰ تومان</b><small>دیروز، ۱۶:۰۵</small></div></div>
      </section>
    </div>
  );
}
