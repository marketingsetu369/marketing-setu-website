import { FaqItem } from "../component/FaqSection";
import { TranslationDictionary } from "@/translation";

export function getPricingFaqs(t: TranslationDictionary): FaqItem[] {
  return [
    {
      question: t.faq_pricing_q1 || "Can I upgrade my plan later?",
      answer: t.faq_pricing_a1 || "Yes. You can upgrade from Starter to Growth or Pro at any time — we simply adjust the difference for the remaining months of your year.",
      open: true,
    },
    {
      question: t.faq_pricing_q2 || "Is there a setup fee?",
      answer: t.faq_pricing_a2 || "No. All plan prices are all-inclusive for the year, with no separate setup or onboarding fee.",
    },
    {
      question: t.faq_pricing_q3 || "Do I need my own WhatsApp Business number?",
      answer: t.faq_pricing_a3 || "You can use your existing number — we help you set it up for WhatsApp Business and connect the automation tools included in your plan.",
    },
    {
      question: t.faq_pricing_q4 || "What happens after one year?",
      answer: t.plan_renew_notice || "Your plan renews annually. We send a reminder in advance, and you can switch plans at renewal if your needs have changed.",
    },
  ];
}

export function getContactFaqs(t: TranslationDictionary): FaqItem[] {
  return [
    {
      question: t.faq_contact_q1 || "How fast will I get a reply?",
      answer: t.faq_contact_a1 || "We aim to respond to every WhatsApp message and form submission within 1 hour during business hours (Mon–Sat, 9am–7pm IST).",
      open: true,
    },
    {
      question: t.faq_contact_q2 || "Do you work with businesses outside Maharashtra?",
      answer: t.faq_contact_a2 || "Yes — while we're based in Pune, we work remotely with small businesses across India via WhatsApp, phone, and email.",
    },
    {
      question: t.faq_contact_q3 || "Is the consultation free?",
      answer: t.faq_contact_a3 || "Yes, the first consultation call or chat is completely free, with no obligation to sign up.",
    },
  ];
}

export const pricingFaqs: FaqItem[] = getPricingFaqs({} as any);
export const contactFaqs: FaqItem[] = getContactFaqs({} as any);
