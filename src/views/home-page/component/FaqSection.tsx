import React from "react";
import SectionHead from "./SectionHead";

export interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

interface FaqSectionProps {
  eyebrow?: string;
  heading: string;
  items: FaqItem[];
  backgroundColor?: string;
}

export default function FaqSection({
  eyebrow = "FAQ",
  heading,
  items,
  backgroundColor = "var(--blue-mist)",
}: FaqSectionProps) {
  return (
    <section style={{ background: backgroundColor }}>
      <div className="container" style={{ maxWidth: "820px" }}>
        <SectionHead eyebrow={eyebrow} heading={heading} />
        {items.map((item, index) => (
          <details key={index} className="faq-item" open={item.open}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
