"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BadgeInfo, Minus, Plus, ShieldCheck } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatCompactToman, formatToman } from "@/lib/data";

const modes = [
  { id: "market", title: "بازار ثانویهٔ پویا", detail: "بدون قفل بلندمدت؛ مشروط به وجود خریدار" },
  { id: "lock", title: "طرح نگهداری بلندمدت", detail: "قفل نمونهٔ ۲۴ ماهه با کارمزد کمتر" },
  { id: "protect", title: "حفاظت سرمایهٔ فرضی", detail: "کارمزد شبیه‌سازی‌شدهٔ ۱٪ و تبدیل به توکن طلا" },
] as const;

export function BuySimulator({ property }: { property: Property }) {
  const [amount, setAmount] = useState(property.minimumInvestment * 10);
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("market");
  const [scenario, setScenario] = useState<"conservative" | "base" | "optimistic">("base");
  const [protectionEnabled, setProtectionEnabled] = useState(false);
  const [message, setMessage] = useState("");

  const simulation = useMemo(() => {
    const tokens = Math.floor(amount / property.tokenPriceInitial);
    const gross = tokens * property.tokenPriceCurrent;
    const estimatedReturn = scenario === "conservative"
      ? property.estimatedReturnLow
      : scenario === "optimistic"
        ? property.estimatedReturnHigh
        : property.estimatedReturnBase;
    const rent = Math.round(amount * (property.rentalYield / 100) * (mode === "lock" ? 2 : 1));
    const feeRate = mode === "protect" || protectionEnabled ? 0.01 : mode === "lock" ? 0.005 : 0.02;
    const fees = Math.round(amount * feeRate);
    const net = gross + rent - fees;
    return { tokens, gross, estimatedReturn, rent, fees, net };
  }, [amount, mode, property, protectionEnabled, scenario]);

  const handleAmount = (value: string) => {
    const next = Number(value.replace(/[^\d]/g, ""));
    setAmount(Number.isFinite(next) ? next : 0);
    setMessage("");
  };

  return (
    <section className="buy-card">
      <div className="buy-card-head">
        <div>
          <span className="mini-label">شبیه‌ساز توکن خشت</span>
          <h2>مبلغ اولیه را وارد کنید</h2>
        </div>
        <ShieldCheck size={24} />
      </div>
      <p className="buy-helper">Minimum simulated amount برای تبدیل نمایشی مبلغ به توکن خشت است.</p>
      <label className="amount-field">
        <span>مبلغ شبیه‌سازی‌شده</span>
        <div><input value={amount || ""} onChange={(event) => handleAmount(event.target.value)} inputMode="numeric" /><b>تومان</b></div>
      </label>
      {amount > 0 && amount < property.minimumInvestment && (
        <div className="sim-error"><BadgeInfo size={15} /> مبلغ واردشده از حداقل مبلغ خرید این پروژه کمتر است.</div>
      )}
      <div className="mode-tabs">
        {modes.map((item) => (
          <button type="button" key={item.id} className={mode === item.id ? "active" : ""} onClick={() => setMode(item.id)}>
            <strong>{item.title}</strong><span>{item.detail}</span>
          </button>
        ))}
      </div>
      <div className="scenario-row">
        <span>سناریوی نمایشی</span>
        <div>
          <button type="button" className={scenario === "conservative" ? "active" : ""} onClick={() => setScenario("conservative")}>محافظه‌کارانه</button>
          <button type="button" className={scenario === "base" ? "active" : ""} onClick={() => setScenario("base")}>پایه</button>
          <button type="button" className={scenario === "optimistic" ? "active" : ""} onClick={() => setScenario("optimistic")}>خوش‌بینانه</button>
        </div>
      </div>
      {mode === "protect" && (
        <label className="toggle-row">
          <input type="checkbox" checked={protectionEnabled} onChange={(event) => setProtectionEnabled(event.target.checked)} />
          <span>فعال‌سازی حفاظت سرمایهٔ فرضی (۱٪)</span>
        </label>
      )}
      <div className="buy-summary">
        <div><span>تعداد توکن خشت</span><strong>{formatToman(simulation.tokens)}</strong></div>
        <div><span>ارزش برآوردی در خروج</span><strong>{formatCompactToman(simulation.gross)}</strong></div>
        <div><span>درآمد اجاره‌ای برآوردی</span><strong>{formatCompactToman(simulation.rent)}</strong></div>
        <div><span>کارمزد نمایشی</span><strong>{formatCompactToman(simulation.fees)}</strong></div>
        <div><span>ارزش خالص سناریو</span><strong>{formatCompactToman(simulation.net)}</strong></div>
        <div><span>بازدهی برآوردی</span><strong className="sim-accent">{simulation.estimatedReturn}%</strong></div>
      </div>
      {mode === "protect" && protectionEnabled && (
        <div className="gold-conversion-note">
          در سناریوی حفاظت، موجودی نمایشی شما در صورت فعال‌شدن شرط فرضی به «توکن طلا شبیه‌سازی‌شده» تبدیل می‌شود؛ این تضمین نقدی یا بیمه نیست.
        </div>
      )}
      <button
        type="button"
        className="button button-red button-wide"
        onClick={() => setMessage("سناریوی نمایشی ذخیره شد؛ هیچ خرید یا تراکنش واقعی انجام نشد.")}
        disabled={amount < property.minimumInvestment}
      >
        مشاهدهٔ گواهی مالکیت دیجیتال فرضی <ArrowLeft size={16} />
      </button>
      {message && <p className="sim-success">{message}</p>}
      <small className="buy-disclaimer">بازدهی برآوردی توکن خشت؛ غیرتضمینی مبتنی بر بازار. {mode === "lock" ? "خروج پیش از ۲۴ ماه محدود یا مشروط است." : "ورود به بازار ثانویه به‌معنای انجام قطعی معامله نیست."}</small>
    </section>
  );
}
