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
    <div className="testimonial reveal">
      <div className="stars">{testimonial.stars}</div>
      <p>{testimonial.text}</p>
      <div className="person">
        <div className="avatar">{testimonial.initials}</div>
        <div>
          <b>{testimonial.name}</b>
          <span>{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
