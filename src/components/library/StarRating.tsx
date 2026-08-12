import React from "react";

interface StarRatingProps {
  /** Rating value between 0 and 5. Supports decimal values like 4.7. */
  rating: number;
  /** Size of each star in pixels. Defaults to 24 (w-6 h-6). */
  size?: "sm" | "md" | "lg";
  /** Extra class names applied to the wrapper div. */
  className?: string;
}

const SIZE_MAP = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

/**
 * StarRating
 *
 * Renders a row of 5 stars with support for fractional (decimal) ratings.
 * - Full star: rating >= i
 * - Partial star: i-1 < rating < i  (uses a linear-gradient SVG fill)
 * - Empty star: rating <= i-1
 *
 * @example
 * <StarRating rating={4.7} />        // 4 full + 70% partial + 1 empty
 * <StarRating rating={3}   size="sm" />
 */
const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = "md",
  className = "",
}) => {
  const clampedRating = Math.min(5, Math.max(0, rating));
  const sizeClass = SIZE_MAP[size];
  const stars: React.ReactNode[] = [];

  for (let i = 1; i <= 5; i++) {
    if (clampedRating >= i) {
      // Full star
      stars.push(
        <svg
          key={i}
          className={`${sizeClass} text-yellow-400`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (clampedRating > i - 1 && clampedRating < i) {
      // Partial star — fill percentage based on the fractional part
      const fillPercent = Math.round((clampedRating - (i - 1)) * 100);
      const gradId = `sr-grad-${i}-${fillPercent}`;
      stars.push(
        <svg
          key={i}
          className={`${sizeClass} text-yellow-400`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${fillPercent}%`} stopColor="currentColor" />
              <stop offset={`${fillPercent}%`} stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gradId})`}
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg
          key={i}
          className={`${sizeClass} text-gray-200`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
  }

  return (
    <div
      className={`flex gap-1.5 mt-3 mb-4 ${className}`}
      role="img"
      aria-label={`Rating: ${clampedRating} out of 5 stars`}
    >
      {stars}
    </div>
  );
};

export default StarRating;
