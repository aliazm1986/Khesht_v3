"use client";

import { Check, PauseCircle, PlayCircle, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

const propertyTypes = ["مسکونی", "بازسازی", "تجاری", "تفریحی"];

export function AutoInvestPanel() {
  const [enabled, setEnabled] = useState(false);
  const [targetYield, setTargetYield] = useState("۲۴٪");
  const [horizon, setHorizon] = useState("۱۲ تا ۲۴ ماه");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["مسکونی", "بازسازی"]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("khisht-auto-invest");
      if (stored) {
        const parsed = JSON.parse(stored) as {
          enabled?: boolean;
          targetYield?: string;
          horizon?: string;
          selectedTypes?: string[];
        };
        setEnabled(Boolean(parsed.enabled));
        if (parsed.targetYield) setTargetYield(parsed.targetYield);
        if (parsed.horizon) setHorizon(parsed.horizon);
        if (parsed.selectedTypes?.length) setSelectedTypes(parsed.selectedTypes);
      }
    } catch {
      // The demo remains usable when browser storage is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("khisht-auto-invest", JSON.stringify({ enabled, targetYield, horizon, selectedTypes }));
  }, [enabled, targetYield, horizon, selectedTypes, hydrated]);

  const toggleType = (type: string) => {
    setSelectedTypes((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type]);
  };

  return (
    <section className="auto-card" aria-labelledby="auto-invest-title">
      <div className="auto-card-head">
        <div>
          <span className="mini-label"><SlidersHorizontal size={14} /> سرمایه‌گذاری خودکار</span>
          <h2 id="auto-invest-title">فرصت مناسب، خودش به تو خبر می‌دهد.</h2>
        </div>
        <button
          type="button"
          className={`toggle ${enabled ? "on" : ""}`}
          aria-label={enabled ? "توقف سرمایه‌گذاری خودکار" : "فعال‌سازی سرمایه‌گذاری خودکار"}
          aria-pressed={enabled}
          onClick={() => setEnabled((value) => !value)}
        >
          <span />
        </button>
      </div>
      <p className="auto-copy">معیارها را انتخاب کن؛ در نسخهٔ واقعی، هنگام انتشار فرصت منطبق، اعلان و تأیید نهایی نمایش داده می‌شود.</p>

      <div className="criteria-grid">
        <label className="tool-field">
          <span>حداقل بازده برآوردی</span>
          <select value={targetYield} onChange={(event) => setTargetYield(event.target.value)}>
            <option>۱۸٪</option>
            <option>۲۴٪</option>
            <option>۳۰٪</option>
          </select>
        </label>
        <label className="tool-field">
          <span>افق نگهداری</span>
          <select value={horizon} onChange={(event) => setHorizon(event.target.value)}>
            <option>کمتر از ۱۲ ماه</option>
            <option>۱۲ تا ۲۴ ماه</option>
            <option>۲۴ ماه به بالا</option>
          </select>
        </label>
      </div>

      <div className="criterion-list">
        <span>نوع پروژهٔ دلخواه</span>
        <div>
          {propertyTypes.map((type) => (
            <button
              type="button"
              key={type}
              className={selectedTypes.includes(type) ? "active" : ""}
              onClick={() => toggleType(type)}
            >
              {selectedTypes.includes(type) && <Check size={12} />}
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={`auto-status ${enabled ? "enabled" : ""}`}>
        {enabled ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
        <span>{enabled ? "قواعد سرمایه‌گذاری خودکار فعال است." : "قواعد ذخیره شده اما هنوز فعال نیست."}</span>
        <small>{selectedTypes.length} نوع پروژه · {targetYield} · {horizon}</small>
      </div>
    </section>
  );
}
