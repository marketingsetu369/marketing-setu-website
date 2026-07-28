import React from "react";
import SectionHead from "./SectionHead";

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface StepsSectionProps {
  eyebrow: string;
  heading: string;
  steps: StepItem[];
  backgroundColor?: string;
}

export default function StepsSection({
  eyebrow,
  heading,
  steps,
  backgroundColor = "var(--blue-mist)",
}: StepsSectionProps) {
  return (
    <section style={{ background: backgroundColor }}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} heading={heading} />
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step reveal">
              <div className="num">STEP {step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
