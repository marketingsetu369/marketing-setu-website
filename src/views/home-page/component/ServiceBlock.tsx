import React, { ReactNode } from "react";
import Image from "next/image";

export interface ServiceBlockItem {
  id: string;
  icon: ReactNode;
  title: string;
  lead: string;
  badge?: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  reversed?: boolean;
}

interface ServiceBlockProps {
  service: ServiceBlockItem;
}

export default function ServiceBlock({ service }: ServiceBlockProps) {
  const contentOrder = service.reversed ? 2 : undefined;
  const imageOrder = service.reversed ? 1 : undefined;

  return (
    <section id={service.id}>
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "center", gap: "56px" }}>
          <div className="reveal" style={{ order: contentOrder }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "4px",
              background: "rgba(13, 110, 253, 0.1)",
              color: "var(--blue)",
              marginBottom: "20px",
            }}>
              {service.icon}
            </div>
            {service.badge && <span className="badge">{service.badge}</span>}
            <h2 style={{ fontSize: "30px" }}>{service.title}</h2>
            <p className="lead" style={{ fontSize: "16px" }}>
              {service.lead}
            </p>
            {service.features.map((feat, i) => (
              <div key={i} className="feature-row">
                <div className="icon">✓</div>
                <div>
                  <p style={{ margin: 0 }}>{feat}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal service-visual" style={{ order: imageOrder }}>
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "320px", borderRadius: "12px", overflow: "hidden" }}>
              <Image
                src={service.imageUrl}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
