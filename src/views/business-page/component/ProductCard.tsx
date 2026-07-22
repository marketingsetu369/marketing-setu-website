import React from "react";
import Image from "next/image";
import { ScooterIcon, BoltIcon } from "../svg";
import { AppButton } from "@/components/library";
import { ProductActionType } from "@/enums";
import type { ProductCardItem } from "@/types/businessPage";

export type { ProductCardItem as ProductProps };

interface ProductCardProps {
  product: ProductCardItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isBuy = product.actionType === ProductActionType.Buy;

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
          <AppButton className={`buy-action-btn ${isBuy ? "primary" : "outline"}`}>
            {isBuy ? "Buy Now" : "Enquiry"}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
