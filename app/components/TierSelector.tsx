"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, LockKeyhole } from "lucide-react";
import { tiers, type InvestorTier } from "@/lib/data";

export function TierSelector() {
  const [selected, setSelected] = useState<InvestorTier>("bronze");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("khest-tier") as InvestorTier | null;
    if (stored && tiers.some((tier) => tier.id === stored)) setSelected(stored);
  }, []);

  const save = () => {
    window.localStorage.setItem("khest-tier", selected);
    setSaved(true);
  };

  return (
    <div>
      <div className="tier-grid">
        {tiers.map((tier) => (
          <button type="button" key={tier.id} className={`tier-card ${selected === tier.id ? "active" : ""}`} onClick={() => { setSelected(tier.id); setSaved(false); }}>
            <span className="tier-gem" style={{ background: tier.color }} />
            <span className="tier-check">{selected === tier.id ? <Check size={14} /> : null}</span>
            <strong>{tier.name}</strong><b>{tier.detail}</b><small>{tier.access}</small>
          </button>
        ))}
      </div>
      <div className="tier-actions"><button type="button" className="button button-red" onClick={save}>ذخیرهٔ سطح نمایشی <ArrowLeft size={16} /></button>{saved && <span className="sim-success"><Check size={14} /> سطح تجربه ذخیره شد.</span>}</div>
      <p className="tier-disclaimer"><LockKeyhole size={14} /> ارتقای سطح در این محیط صرفاً برای نمایش تجربهٔ کاربری است و به‌معنای احراز صلاحیت قانونی یا مالی نیست.</p>
    </div>
  );
}
