import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatCompactToman, formatToman } from "@/lib/data";
import { BlockArt } from "./BlockArt";

export function PropertyCard({ property, featured = false }: { property: Property; featured?: boolean }) {
  return (
    <Link href={`/projects/${property.slug}`} className={`property-card ${featured ? "featured" : ""}`}>
      <div className="property-visual">
        <BlockArt accent={property.accent} compact={featured} image={property.image} alt={`نمای معماری ${property.name}`} />
        <span className="status-pill">{property.status}</span>
        <span className="property-type">{property.type}</span>
      </div>
      <div className="property-content">
        <div className="property-title-row">
          <div>
            <h3>{property.name}</h3>
            <p>{property.location}</p>
          </div>
          <span className="yield-badge">{property.estimatedReturnBase}%</span>
        </div>
        <div className="property-metrics">
          <div>
            <span>قیمت هر توکن خشت</span>
            <strong>{formatToman(property.tokenPriceCurrent)} <small>تومان</small></strong>
          </div>
          <div>
            <span>حداقل ورود</span>
            <strong>{formatCompactToman(property.minimumInvestment)} <small>حداقل</small></strong>
          </div>
          <div>
            <span>ارزش کل پروژه</span>
            <strong>{formatCompactToman(property.projectValuation)}</strong>
          </div>
          <div>
            <span>توکن دریافتی در حداقل ورود</span>
            <strong>{formatToman(property.minimumTokens)} <small>توکن</small></strong>
          </div>
        </div>
        <div className="progress-line">
          <span style={{ width: `${property.progress}%` }} />
        </div>
        <div className="property-meta-line">
          <span>{formatToman(property.totalTokenSupply)} توکن کل · {Math.round(((property.totalTokenSupply - property.availableTokenSupply) / property.totalTokenSupply) * 100)}٪ عرضه‌شده</span>
          <span>{property.riskLevel} ریسک · {property.exitStrategy}</span>
        </div>
        <div className="property-foot">
          <span>
            <Users size={14} /> {new Intl.NumberFormat("fa-IR").format(property.simulatedHolders)} دارندهٔ نمونه
          </span>
          <span className="arrow-link">مشاهدهٔ توکن <ArrowLeft size={15} /></span>
        </div>
      </div>
    </Link>
  );
}
