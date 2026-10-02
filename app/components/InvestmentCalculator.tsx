"use client";

import { Calculator, Info, TrendingUp, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { formatCompactToman, formatToman } from "@/lib/data";

const terms = [
  { months: 12, rate: 18 },
  { months: 24, rate: 24 },
  { months: 36, rate: 28 },
];

const onlyDigits = (value: string) => value.replace(/[^\d]/g, "");

export function InvestmentCalculator({ compact = false }: { compact?: boolean }) {
  const [initialAmount, setInitialAmount] = useState("500000000");
  const [monthlyAmount, setMonthlyAmount] = useState("50000000");
  const [term, setTerm] = useState(24);

  const result = useMemo(() => {
    const selectedTerm = terms.find((item) => item.months === term) ?? terms[1];
    const initial = Math.max(Number(initialAmount) || 0, 0);
    const monthly = Math.max(Number(monthlyAmount) || 0, 0);
    const monthlyRate = selectedTerm.rate / 100 / 12;
    const periods = selectedTerm.months;
    const growth = Math.pow(1 + monthlyRate, periods);
    const futureInitial = initial * growth;
    const futureContributions = monthlyRate === 0 ? monthly * periods : monthly * ((growth - 1) / monthlyRate);
    const projectedValue = Math.round(futureInitial + futureContributions);
    const contributed = initial + monthly * periods;

    return {
      rate: selectedTerm.rate,
      months: periods,
      contributed,
      projectedValue,
      projectedGain: Math.max(projectedValue - contributed, 0),
      monthlyIncome: Math.round(projectedValue * (selectedTerm.rate / 100) / 12),
    };
  }, [initialAmount, monthlyAmount, term]);

  const barValues = [0.28, 0.4, 0.53, 0.67, 0.82, 1];

  return (
    <section className={`calculator-card ${compact ? "calculator-card-compact" : ""}`} aria-labelledby="investment-calculator-title">
      <div className="calculator-head">
        <div>
          <span className="mini-label"><Calculator size={14} /> شبیه‌ساز تصمیم</span>
          <h2 id="investment-calculator-title">اگر هر ماه بسازم، چه تصویری می‌بینم؟</h2>
        </div>
        <TrendingUp size={21} color="var(--red)" />
      </div>
      <p className="calculator-intro">
        مبلغ اولیه و شارژ ماهانه را وارد کن تا یک سناریوی رشد بر اساس دورهٔ انتخابی ببینی.
      </p>

      <div className="calculator-inputs">
        <label className="tool-field">
          <span>مبلغ اولیه</span>
          <div className="tool-input-wrap">
            <input
              value={initialAmount}
              onChange={(event) => setInitialAmount(onlyDigits(event.target.value))}
              inputMode="numeric"
              aria-label="مبلغ اولیه به تومان"
            />
            <small>تومان</small>
          </div>
        </label>
        <label className="tool-field">
          <span>افزایش ماهانه</span>
          <div className="tool-input-wrap">
            <input
              value={monthlyAmount}
              onChange={(event) => setMonthlyAmount(onlyDigits(event.target.value))}
              inputMode="numeric"
              aria-label="افزایش ماهانه به تومان"
            />
            <small>تومان</small>
          </div>
        </label>
      </div>

      <div className="term-picker">
        <span>افق نگهداری نمایشی</span>
        <div className="term-switch" role="tablist" aria-label="انتخاب دورهٔ نگهداری">
          {terms.map((item) => (
            <button
              key={item.months}
              type="button"
              className={term === item.months ? "active" : ""}
              onClick={() => setTerm(item.months)}
              role="tab"
              aria-selected={term === item.months}
            >
              {item.months} ماه
              <small>{item.rate}٪ سناریو</small>
            </button>
          ))}
        </div>
      </div>

      <div className="calc-result">
        <div className="calc-result-main">
          <span>ارزش نهایی برآوردی</span>
          <strong>{formatCompactToman(result.projectedValue)}</strong>
          <small>تومان · پس از {result.months} ماه</small>
        </div>
        <div className="calc-bars" aria-label="نمودار رشد فرضی">
          {barValues.map((value, index) => (
            <span key={index} style={{ height: `${Math.max(22, value * 100)}%` }} />
          ))}
        </div>
      </div>
      <div className="calc-breakdown">
        <div><span>مجموع واریزی</span><strong>{formatCompactToman(result.contributed)}</strong></div>
        <div><span>رشد برآوردی</span><strong className="positive">+{formatCompactToman(result.projectedGain)}</strong></div>
        <div><span>درآمد ماهانهٔ فرضی</span><strong>{formatToman(result.monthlyIncome)}</strong></div>
      </div>
      <p className="calc-disclaimer"><Info size={14} /> این محاسبه صرفاً برای تجربهٔ رابط کاربری است؛ نرخ، سود و نقدشوندگی واقعی را تضمین نمی‌کند.</p>
    </section>
  );
}

export function CalculatorTeaser() {
  return (
    <div className="calculator-teaser">
      <div className="teaser-icon"><WalletCards size={19} /></div>
      <div>
        <strong>تصمیم را قبل از خرید شبیه‌سازی کن</strong>
        <p>سناریوی سرمایه‌گذاری خودت را در چند ثانیه ببین.</p>
      </div>
    </div>
  );
}
