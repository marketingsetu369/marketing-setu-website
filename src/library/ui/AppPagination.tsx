"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useMemo } from "react";

export interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  showItemCount?: boolean;
  className?: string;
}

export function AppPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showItemCount = true,
  className = "",
}: AppPaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  // Generate page numbers array with ellipses
  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    const delta = 2; // Number of pages to show around current page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const left = Math.max(2, currentPage - delta);
      const right = Math.min(totalPages - 1, currentPage + delta);

      pages.push(1);

      if (left > 2) {
        pages.push("...");
      }

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const startItem = totalItems !== undefined && itemsPerPage !== undefined
    ? Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)
    : undefined;
  const endItem = totalItems !== undefined && itemsPerPage !== undefined
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : undefined;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-outline font-normal ${className}`}
    >
      {/* Items count summary */}
      {showItemCount && totalItems !== undefined && (
        <p className="text-xs text-secondary font-normal">
          {startItem !== undefined && endItem !== undefined ? (
            <>
              Showing <span className="font-medium text-primary">{startItem}</span> to{" "}
              <span className="font-medium text-primary">{endItem}</span> of{" "}
              <span className="font-medium text-primary">{totalItems}</span> results
            </>
          ) : (
            <>
              Total <span className="font-medium text-primary">{totalItems}</span> items
            </>
          )}
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-normal text-secondary hover:text-primary bg-paper border border-outline hover:bg-neutral disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Previous Page"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={15} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Number Buttons */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-8 h-8 flex items-center justify-center text-xs text-disabled select-none font-normal"
                  >
                    …
                  </span>
                );
              }

              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-xl text-xs font-normal transition-all flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "bg-brand-main text-white shadow-z1"
                      : "bg-paper border border-outline text-secondary hover:text-primary hover:bg-neutral"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-normal text-secondary hover:text-primary bg-paper border border-outline hover:bg-neutral disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Next Page"
          >
            <span className="hidden sm:inline">Next</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

export default AppPagination;
