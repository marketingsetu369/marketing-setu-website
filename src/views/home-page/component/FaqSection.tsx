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
  backgroundColor,
}: FaqSectionProps) {
  return (
    <section className="py-24 bg-brand-grayLight dark:bg-brand-dark/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={eyebrow} heading={heading} />
        <div className="space-y-4 mt-12">
          {items.map((item, index) => (
            <details 
              key={index} 
              className="group bg-white dark:bg-brand-dark/60 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden" 
              open={item.open}
            >
              <summary className="flex justify-between items-center p-6 text-lg font-semibold text-brand-dark dark:text-white cursor-pointer select-none">
                {item.question}
                <span className="ml-1.5 flex-shrink-0 rounded-full bg-gray-50 dark:bg-brand-dark p-1.5 text-brand-purple transition duration-300 group-open:-rotate-180">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-brand-gray dark:text-gray-300 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
