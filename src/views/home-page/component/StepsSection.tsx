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
}: StepsSectionProps) {
  return (
    <div className="space-y-12">
      <SectionHead eyebrow={eyebrow} heading={heading} />

      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-outline z-0" />

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Step number bubble */}
              <div className="w-20 h-20 rounded-2xl bg-brand-main text-white flex flex-col items-center justify-center mb-6 shadow-z8 group-hover:shadow-z16 group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs font-bold opacity-70 leading-none mb-0.5">STEP</span>
                <span className="text-2xl font-extrabold leading-none">{step.number}</span>
              </div>

              {/* Content */}
              <div className="space-y-2 max-w-xs">
                <h3 className="text-base font-bold text-primary leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
