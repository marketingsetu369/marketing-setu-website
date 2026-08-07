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
    <div className="bg-white dark:bg-brand-dark/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
      <div>
        <div className="text-yellow-400 text-lg mb-4 select-none">{testimonial.stars}</div>
        <p className="text-brand-dark/90 dark:text-gray-200 text-sm leading-relaxed mb-6 italic">
          "{testimonial.text}"
        </p>
      </div>
      <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50 dark:border-gray-800/60">
        <div className="w-11 h-11 bg-brand-purpleLight dark:bg-brand-purple/10 text-brand-purple dark:text-brand-light rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="text-sm font-bold text-brand-dark dark:text-white">{testimonial.name}</h4>
          <span className="text-xs text-brand-gray dark:text-gray-400">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
