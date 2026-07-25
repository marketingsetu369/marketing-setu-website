import React from "react";
import Image from "next/image";
import { ScooterIcon, BoltIcon } from "../svg";
import { AppButton } from "@/components/library";
import { ProductActionType } from "@/enums";
import type { ProductCardItem } from "@/types/businessPage";

export type { ProductCardItem as ProductProps };

interface ProductCardProps {
  product: ProductCardItem;
  mobileNumber?: string;
  businessName?: string;
}

export default function ProductCard({ product, mobileNumber, businessName }: ProductCardProps) {
  const isBuy = product.actionType === ProductActionType.Buy;

  const handleEnquiry = () => {
    if (!mobileNumber) return;

    // Clean phone number format (remove non-digits and add 91 country code if 10-digit)
    let cleanPhone = mobileNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    const message = `Hello ${businessName || "there"}!\n\nI am interested in inquiring about the following product listed on your website:\n\n*Product Name:* ${product.name}\n*Price:* ${product.price}\n*Description:* ${product.description || "N/A"}\n\nCould you please provide more details? Thank you!`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
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
          <div className="product-price-stack">
            <span className="product-item-price">{product.price}</span>
            {product.priceSubtext && (
              <span className="product-item-price-subtext">{product.priceSubtext}</span>
            )}
          </div>
          <AppButton 
            onClick={handleEnquiry}
            className={`buy-action-btn ${isBuy ? "primary" : "outline"}`}
          >
            {product.buttonName || (isBuy ? "Buy Now" : "Enquiry")}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
