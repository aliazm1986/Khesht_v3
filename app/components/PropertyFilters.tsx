"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Property } from "@/lib/data";
import { PropertyCard } from "./PropertyCard";

export function PropertyFilters({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("همه");
  const [sort, setSort] = useState<"featured" | "return" | "progress" | "price">("featured");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = properties.filter((property) => {
      const matchesQuery =
        !normalized ||
        `${property.name} ${property.location} ${property.type}`.toLowerCase().includes(normalized);
      const matchesFilter = filter === "همه" || property.type === filter;
      return matchesQuery && matchesFilter;
    });
    return [...result].sort((a, b) => {
      if (sort === "return") return b.estimatedReturnBase - a.estimatedReturnBase;
      if (sort === "progress") return b.progress - a.progress;
      if (sort === "price") return a.tokenPriceCurrent - b.tokenPriceCurrent;
      return properties.indexOf(a) - properties.indexOf(b);
    });
  }, [filter, properties, query, sort]);

  return (
    <>
      <div className="filter-bar">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی شهر یا پروژه" />
        </label>
        <label className="filter-sort">
          <SlidersHorizontal size={17} />
          <span>مرتب‌سازی</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="مرتب‌سازی پروژه‌ها">
            <option value="featured">پیشنهاد خشت</option>
            <option value="return">بیشترین بازدهی برآوردی</option>
            <option value="progress">بیشترین پیشرفت</option>
            <option value="price">کمترین قیمت توکن</option>
          </select>
        </label>
      </div>
      <div className="filter-chips">
        {["همه", "مسکونی", "تفریحی", "اداری", "تجاری", "بازسازی", "ویلایی"].map((item) => (
          <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="property-grid">
        {filtered.map((property) => <PropertyCard key={property.slug} property={property} />)}
      </div>
      {filtered.length === 0 && <div className="empty-state">برای این جست‌وجو فرصتی پیدا نشد.</div>}
    </>
  );
}
