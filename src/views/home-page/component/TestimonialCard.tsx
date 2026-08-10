import React from "react";

export interface Testimonial {
  stars: string;
  text: string;
  initials: string;
  name: string;
  role: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-paper text-primary border border-outline rounded-[24px] p-8 shadow-card hover:shadow-z12 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="text-warning-main text-lg mb-4 select-none">{testimonial.stars}</div>
        <p className="text-secondary text-sm leading-relaxed mb-6 italic">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3.5 pt-4 border-t border-outline">
        <div className="w-11 h-11 bg-brand-lighter text-brand-dark dark:bg-brand-dark dark:text-brand-lighter rounded-full flex items-center justify-center text-sm font-bold shadow-xs">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">{testimonial.name}</h4>
          <span className="text-xs text-disabled">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}

