"use client";

import React, { useState, useRef, useEffect } from "react";
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

function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  // Stagger-in mount animation
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(timeout);
  }, [index]);

  // Sync height when open state changes
  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight ?? 0);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="bg-paper border border-outline rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-z4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.4s ease ${index * 60}ms, transform 0.4s ease ${index * 60}ms, box-shadow 0.2s ease`,
      }}
    >
      {/* Question / Header */}
      <button
        type="button"
        className="w-full flex justify-between items-center px-6 py-5 text-left cursor-pointer select-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-primary leading-snug pr-4">
          {item.question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-xl bg-neutral flex items-center justify-center text-secondary"
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Answer / Animated panel */}
      <div
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef}>
          <div className="px-8 pb-8 pt-4 border-t border-outline">
            <p className="text-sm text-secondary leading-relaxed">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({
  eyebrow = "FAQ",
  heading,
  items,
  backgroundColor,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.findIndex((i) => i.open) ?? null
  );

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 bg-gray-100 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={eyebrow} heading={heading} />
        <div className="space-y-3 mt-12">
          {items.map((item, index) => (
            <FaqAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
