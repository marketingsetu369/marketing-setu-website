import React, { useState } from "react";
import Image from "next/image";
import { ScooterIcon, BoltIcon } from "../svg";
import { AppButton, AppInput, AppTextArea } from "@/components/library";
import { ProductActionType } from "@/enums";
import type { ProductCardItem } from "@/types/businessPage";

export type { ProductCardItem as ProductProps };

interface ProductCardProps {
  product: ProductCardItem;
  mobileNumber?: string;
  businessName?: string;
  slug?: string;
}

export default function ProductCard({ product, mobileNumber, businessName, slug }: ProductCardProps) {
  const isBuy = product.actionType === ProductActionType.Buy;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEnquiryClick = () => {
    setIsModalOpen(true);
  };

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
          productName: product.name,
          productPrice: product.price,
          productDescription: product.description,
          message: visitorMessage,
        }),
      });

      if (response.ok) {
        alert("Enquiry submitted successfully! The business owner will get back to you soon.");
        setIsModalOpen(false);
        setVisitorName("");
        setVisitorPhone("");
        setVisitorMessage("");
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="product-item-card">
        <div className="product-img-box">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="gallery-img-fill"
            />
          ) : isBuy ? (
            <ScooterIcon className="icon-product-primary" />
          ) : (
            <BoltIcon className="icon-product-secondary" />
          )}
        </div>
        <div className="product-details-box">
          <h3 className="product-item-name">{product.name}</h3>
          <p className="product-item-desc">{product.description}</p>
          <div className="product-footer-row">
            {product.showPrice === true && (
              <div className="product-price-stack">
                <span className="product-item-price">{product.price}</span>
                {product.priceSubtext && (
                  <span className="product-item-price-subtext">{product.priceSubtext}</span>
                )}
              </div>
            )}
            <AppButton
              onClick={handleEnquiryClick}
              className="buy-action-btn outline"
            >
              Enquire Now
            </AppButton>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h3 className="modal-title">Quick Enquiry</h3>
            <p className="modal-subtitle">
              Enter your details below to enquire about <strong>{product.name}</strong>
            </p>
            <form onSubmit={handleSubmit} className="modal-form">
              <AppInput
                id="visitorName"
                label="Your Name"
                placeholder="Enter your name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                required
              />
              <AppInput
                id="visitorPhone"
                label="WhatsApp Number"
                placeholder="Enter your WhatsApp number"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                required
              />
              <AppTextArea
                id="visitorMessage"
                label="Message / Requirements (Optional)"
                placeholder="Type your message here..."
                value={visitorMessage}
                onChange={(e) => setVisitorMessage(e.target.value)}
                rows={3}
              />
              <div className="modal-actions">
                <AppButton
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </AppButton>
                <AppButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
