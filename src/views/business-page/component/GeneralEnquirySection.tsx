"use client";

import React, { useState } from "react";
import { AppButton, AppInput, AppTextArea } from "@/components/library";

interface GeneralEnquirySectionProps {
  slug?: string;
  businessName?: string;
}

export default function GeneralEnquirySection({ slug, businessName }: GeneralEnquirySectionProps) {
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) {
      alert("Name and Phone Number are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/v1/business-page/public/${slug}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: visitorName,
          phone: visitorPhone,
          message: visitorMessage,
          isProduct: false,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setVisitorName("");
        setVisitorPhone("");
        setVisitorMessage("");
        // Reset after 4s
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="general-enquiry-card">
      <div className="general-enquiry-header">
        <div className="general-enquiry-icon">✉️</div>
        <div>
          <h3 className="general-enquiry-title">Send an Enquiry</h3>
          <p className="general-enquiry-subtitle">
            Have a question? We&apos;ll get back to you shortly.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="general-enquiry-success">
          <span className="general-enquiry-success-icon">✅</span>
          <p>Your enquiry has been sent! {businessName ?? "The business"} will reach out to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="general-enquiry-form">
          <AppInput
            id="genVisitorName"
            label="Your Name"
            placeholder="Enter your name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            required
          />
          <AppInput
            id="genVisitorPhone"
            label="WhatsApp / Phone Number"
            placeholder="Enter your number"
            value={visitorPhone}
            onChange={(e) => setVisitorPhone(e.target.value)}
            required
          />
          <AppTextArea
            id="genVisitorMessage"
            label="Message (Optional)"
            placeholder="What would you like to know?"
            value={visitorMessage}
            onChange={(e) => setVisitorMessage(e.target.value)}
            rows={3}
          />
          <AppButton type="submit" disabled={isSubmitting} className="general-enquiry-submit-btn">
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </AppButton>
        </form>
      )}
    </div>
  );
}
