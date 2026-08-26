import React from "react";

export interface Testimonial {
  stars: string;
  text: string;
  initials: string;
  name: string;
  role: string;
  image?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-paper rounded-2xl p-8 shadow-card hover:shadow-z12 transition-all duration-300 flex flex-col justify-between break-inside-avoid mb-6">
      {/* Quote Icon */}
      <div className="text-brand-main text-5xl font-serif leading-none mb-4 select-none">&ldquo;</div>

      <div className="flex-1">
        {/* Stars */}
        <div className="text-warning-main text-base mb-3 select-none tracking-wider">
          {testimonial.stars}
        </div>
        {/* Review text */}
        <p className="text-secondary text-sm leading-relaxed">
          {testimonial.text}
        </p>
      </div>

      {/* Author footer */}
      <div className="flex items-center gap-3 pt-6 mt-6 border-t border-outline">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-11 h-11 rounded-full object-cover border border-outline flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 bg-brand-lighter text-brand-dark dark:bg-brand-dark dark:text-brand-lighter rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
            {testimonial.initials}
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-primary leading-tight">{testimonial.name}</h4>
          <span className="text-xs text-disabled">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
