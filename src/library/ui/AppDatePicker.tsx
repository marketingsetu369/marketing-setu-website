"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface AppDatePickerProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string; // Format: YYYY-MM-DD
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onSelectDate?: (dateStr: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
  error?: string;
  helperText?: string;
  align?: "left" | "right";
  className?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function AppDatePicker({
  id,
  name,
  label,
  value,
  defaultValue = "",
  onChange,
  onSelectDate,
  placeholder = "Select date",
  disabled = false,
  required = false,
  min,
  max,
  error,
  helperText,
  align = "left",
  className = "",
}: AppDatePickerProps) {
  const [internalValue, setInternalValue] = useState<string>(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  // Track the view month & year of the calendar popup
  const [viewDate, setViewDate] = useState(() => {
    if (selectedValue) {
      const parsed = new Date(selectedValue);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  });

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
      if (value) {
        const parsed = new Date(value);
        if (!isNaN(parsed.getTime())) {
          setViewDate(parsed);
        }
      }
    }
  }, [value]);

  // Handle click outside to close popover
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleSelectDay = (
    e: React.MouseEvent,
    day: number,
    isCurrentMonth: boolean,
    monthOffset: number = 0
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const targetDate = new Date(viewYear, viewMonth + monthOffset, day);
    const dateStr = targetDate.toISOString().split("T")[0];

    if (min && dateStr < min) return;
    if (max && dateStr > max) return;

    setInternalValue(dateStr);
    if (onChange) {
      onChange({ target: { value: dateStr, name } });
    }
    if (onSelectDate) {
      onSelectDate(dateStr);
    }
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const todayStr = new Date().toISOString().split("T")[0];
    setInternalValue(todayStr);
    setViewDate(new Date());
    if (onChange) {
      onChange({ target: { value: todayStr, name } });
    }
    if (onSelectDate) {
      onSelectDate(todayStr);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInternalValue("");
    if (onChange) {
      onChange({ target: { value: "", name } });
    }
    if (onSelectDate) {
      onSelectDate("");
    }
    setIsOpen(false);
  };

  // Build calendar matrix
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days: Array<{
      day: number;
      isCurrentMonth: boolean;
      monthOffset: number;
      dateStr: string;
      disabled: boolean;
      isToday: boolean;
      isSelected: boolean;
    }> = [];

    const todayStr = new Date().toISOString().split("T")[0];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const d = new Date(viewYear, viewMonth - 1, day);
      const dateStr = d.toISOString().split("T")[0];
      days.push({
        day,
        isCurrentMonth: false,
        monthOffset: -1,
        dateStr,
        disabled: Boolean((min && dateStr < min) || (max && dateStr > max)),
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedValue,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const d = new Date(viewYear, viewMonth, day);
      const dateStr = d.toISOString().split("T")[0];
      days.push({
        day,
        isCurrentMonth: true,
        monthOffset: 0,
        dateStr,
        disabled: Boolean((min && dateStr < min) || (max && dateStr > max)),
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedValue,
      });
    }

    // Next month padding days to complete 42 grid cells (6 rows) or 35 (5 rows)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const d = new Date(viewYear, viewMonth + 1, day);
      const dateStr = d.toISOString().split("T")[0];
      days.push({
        day,
        isCurrentMonth: false,
        monthOffset: 1,
        dateStr,
        disabled: Boolean((min && dateStr < min) || (max && dateStr > max)),
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedValue,
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedValue, min, max]);

  // Formatted display text (e.g. "30 Aug 2026")
  const displayLabel = useMemo(() => {
    if (!selectedValue) return "";
    const parsed = new Date(selectedValue);
    if (isNaN(parsed.getTime())) return selectedValue;
    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [selectedValue]);

  return (
    <div ref={containerRef} className="relative w-full space-y-1.5 font-sans">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-secondary"
        >
          {label} {required && <span className="text-error-main">*</span>}
        </label>
      )}

      {/* Input Trigger Box */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        className={`w-full px-3.5 py-2.5 rounded-lg border bg-transparent text-sm font-medium flex items-center justify-between transition-colors select-none text-left ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-neutral"
            : isOpen
            ? "border-brand-main ring-1 ring-brand-main cursor-pointer"
            : error
            ? "border-error-main cursor-pointer"
            : "border-outline hover:border-brand-main cursor-pointer"
        } ${className}`}
      >
        <span
          className={`truncate ${
            displayLabel ? "text-primary font-medium" : "text-disabled font-normal"
          }`}
        >
          {displayLabel || placeholder}
        </span>

        <span className="text-secondary flex-shrink-0 ml-2">
          <HugeiconsIcon icon={Calendar01Icon} size={18} />
        </span>
      </button>

      {error && <p className="text-xs font-medium text-error-main">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-secondary font-normal">{helperText}</p>
      )}

      {/* Material Design Calendar Popover */}
      {isOpen && (
        <div
          className={`absolute top-full mt-1.5 z-50 w-72 sm:w-80 p-4 bg-paper rounded-2xl border border-outline shadow-dialog ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {/* Header Month / Year Navigator */}
          <div className="flex items-center justify-between pb-3 border-b border-dashed border-outline">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-neutral transition-colors cursor-pointer"
              title="Previous month"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            </button>

            <div className="text-sm font-semibold text-primary">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-neutral transition-colors cursor-pointer"
              title="Next month"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 pt-3 pb-1 text-center">
            {WEEKDAY_NAMES.map((w) => (
              <span
                key={w}
                className="text-[11px] font-semibold text-secondary select-none"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => (
              <button
                key={`${item.dateStr}-${idx}`}
                type="button"
                disabled={item.disabled}
                onClick={(e) =>
                  !item.disabled &&
                  handleSelectDay(e, item.day, item.isCurrentMonth, item.monthOffset)
                }
                className={`h-9 w-full rounded-xl text-xs font-medium transition-colors flex items-center justify-center cursor-pointer relative ${
                  item.disabled
                    ? "text-disabled opacity-30 cursor-not-allowed"
                    : item.isSelected
                    ? "bg-brand-main text-white font-bold shadow-z4"
                    : item.isCurrentMonth
                    ? "text-primary hover:bg-brand-lighter/50 dark:hover:bg-brand-darker/50"
                    : "text-disabled hover:bg-neutral"
                } ${item.isToday && !item.isSelected ? "border border-brand-main text-brand-main" : ""}`}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Bottom Action Shortcuts: Clear & Today */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-dashed border-outline text-xs font-medium">
            <button
              type="button"
              onClick={handleClear}
              className="text-secondary hover:text-error-main transition-colors cursor-pointer"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleSelectToday}
              className="px-3 py-1 rounded-lg bg-brand-lighter text-brand-main hover:bg-brand-main hover:text-white transition-colors cursor-pointer font-semibold"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppDatePicker;
