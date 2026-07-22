"use client";

import { useWhatsApp } from "./useWhatsApp";
import { AppButton } from "@/components/library";

interface CtaBandProps {
  heading: string;
  description: string;
  buttonText?: string;
  whatsappMessage?: string;
}

export default function CtaBand({
  heading,
  description,
  buttonText = "💬 Chat on WhatsApp",
  whatsappMessage = "Hi MarketingSetu! I'd like a free consultation.",
}: CtaBandProps) {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section>
      <div className="container">
        <div className="cta-band reveal">
          <h2>{heading}</h2>
          <p>{description}</p>
          <AppButton onClick={() => openWhatsApp(whatsappMessage)} variant="whatsapp">
            {buttonText}
          </AppButton>
        </div>
      </div>
    </section>
  );
}
