"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { PublicBookingSlot, usePublicBookings } from "../hooks";

// Helper to convert "14:00" or "09:30" to 12-hour format like "2:00 PM" or "6 PM"
function format12Hour(timeStr?: string): string {
  if (!timeStr) return "";
  const parts = timeStr.trim().split(":");
  if (parts.length < 2) return timeStr;

  let hour = parseInt(parts[0], 10);
  const min = parseInt(parts[1], 10);
  if (isNaN(hour) || isNaN(min)) return timeStr;

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  const minStr = min > 0 ? `:${String(min).padStart(2, "0")}` : "";
  return `${hour}${minStr} ${ampm}`;
}

// Helper to format slot range "14:00 - 18:30" -> "2 PM - 6:30 PM"
function formatSlotRange(slot: PublicBookingSlot): string {
  if (slot.startTime && slot.endTime) {
    return `${format12Hour(slot.startTime)} - ${format12Hour(slot.endTime)}`;
  }
  if (slot.displaySlot && slot.displaySlot.includes("-")) {
    const [start, end] = slot.displaySlot.split("-").map((s) => s.trim());
    return `${format12Hour(start)} - ${format12Hour(end)}`;
  }
  return slot.displaySlot || "";
}

export function BookingsAvailabilitySection({ slug }: { slug: string }) {
  const { primaryColor } = useBusinessPageTheme();
  const { slots, loading } = usePublicBookings(slug);

  const [mounted, setMounted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());
  const [selectedDayBookings, setSelectedDayBookings] = useState<{
    dateStr: string;
    slots: PublicBookingSlot[];
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll and lock position when modal or popup is open
  useEffect(() => {
    const isOpen = isCalendarOpen || selectedDayBookings !== null;
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCalendarOpen, selectedDayBookings]);

  // Group bookings by YYYY-MM-DD
  const bookingsByDate = useMemo(() => {
    const map = new Map<string, PublicBookingSlot[]>();
    for (const slot of slots) {
      if (!map.has(slot.date)) {
        map.set(slot.date, []);
      }
      map.get(slot.date)!.push(slot);
    }
    return map;
  }, [slots]);

  // Today string YYYY-MM-DD in local time
  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  // Filter upcoming & today events for horizontal reel
  const upcomingEvents = useMemo(() => {
    return slots
      .filter((s) => s.date >= todayStr)
      .sort((a, b) => (a.date === b.date ? a.startTime.localeCompare(b.startTime) : a.date.localeCompare(b.date)));
  }, [slots, todayStr]);

  // Calendar month calculation
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{
      dateStr: string;
      dayNum: number;
      isCurrentMonth: boolean;
      status: "past" | "today" | "upcoming" | "none";
      hasBookings: boolean;
      slots: PublicBookingSlot[];
    }> = [];

    // Empty lead cells
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        dateStr: "",
        dayNum: 0,
        isCurrentMonth: false,
        status: "none",
        hasBookings: false,
        slots: [],
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const daySlots = bookingsByDate.get(dateStr) || [];
      const hasBookings = daySlots.length > 0;

      let status: "past" | "today" | "upcoming" = "upcoming";
      if (dateStr < todayStr) {
        status = "past";
      } else if (dateStr === todayStr) {
        status = "today";
      } else {
        status = "upcoming";
      }

      days.push({
        dateStr,
        dayNum: day,
        isCurrentMonth: true,
        status,
        hasBookings,
        slots: daySlots,
      });
    }

    return days;
  }, [currentMonthDate, bookingsByDate, todayStr]);

  const handlePrevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const monthLabel = currentMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  if (loading && slots.length === 0) return null;

  return (
    <div className="pt-2 pb-6 px-4 md:px-8">
      {/* ── Top Header with "View Calendar" Button ── */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200/80 p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                📅 Availability & Booked Dates
              </h3>
              <p className="text-xs text-gray-500">
                Check schedule and reserved slots
              </p>
            </div>
          </div>

          {/* VIEW CALENDAR BUTTON ON TOP */}
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xs hover:opacity-95 transition-all cursor-pointer shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            <span>View Calendar</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
              {slots.length}
            </span>
          </button>
        </div>

        {/* ── Quick Legend Bar ── */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-4 text-[11px] text-gray-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span>Past</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Upcoming</span>
          </div>
        </div>

        {/* ── BELOW: Horizontal Scroll of Upcoming Event Details ── */}
        {upcomingEvents.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800">
                Upcoming Reserved Slots
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                {upcomingEvents.length} upcoming
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth">
              {upcomingEvents.map((slot) => {
                const dateObj = new Date(slot.date);
                const dateLabel = isNaN(dateObj.getTime())
                  ? slot.date
                  : dateObj.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });

                return (
                  <button
                    key={slot.id}
                    onClick={() => {
                      const daySlots = bookingsByDate.get(slot.date) || [slot];
                      setSelectedDayBookings({
                        dateStr: slot.date,
                        slots: daySlots,
                      });
                    }}
                    className="shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white shadow-xs hover:border-gray-300 hover:shadow-sm transition-all text-left group cursor-pointer"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    >
                      ⏰
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-800">
                        {dateLabel}
                      </span>
                      <span className="text-[11px] text-gray-600 font-medium">
                        {formatSlotRange(slot)}
                      </span>
                    </div>
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-bold">
                      Booked
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Calendar Modal Overlay (Rendered into body with createPortal for true fixed positioning) ── */}
      {mounted && isCalendarOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCalendarOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Bookings Calendar
                </h3>
                <p className="text-xs text-gray-500">
                  Select any date to see scheduled slots
                </p>
              </div>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between py-3 shrink-0">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold transition-all cursor-pointer"
              >
                ◀
              </button>
              <span className="text-sm font-bold text-gray-900">
                {monthLabel}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold transition-all cursor-pointer"
              >
                ▶
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 py-1 shrink-0">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 py-2 overflow-y-auto">
              {calendarDays.map((day, idx) => {
                if (!day.isCurrentMonth) {
                  return <div key={`empty-${idx}`} className="h-10" />;
                }

                // Circle status colors:
                // Past: Gray
                // Today: Blue
                // Upcoming: Green
                let circleBadgeClass = "";
                if (day.hasBookings) {
                  if (day.status === "past") {
                    circleBadgeClass = "bg-gray-400 text-white ring-2 ring-gray-200";
                  } else if (day.status === "today") {
                    circleBadgeClass = "bg-blue-600 text-white ring-2 ring-blue-200 shadow-sm";
                  } else {
                    circleBadgeClass = "bg-emerald-500 text-white ring-2 ring-emerald-200 shadow-sm";
                  }
                }

                const isTodayDate = day.dateStr === todayStr;

                return (
                  <button
                    key={day.dateStr}
                    disabled={!day.hasBookings}
                    onClick={() => {
                      if (day.hasBookings) {
                        setSelectedDayBookings({
                          dateStr: day.dateStr,
                          slots: day.slots,
                        });
                      }
                    }}
                    className={`h-11 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                      day.hasBookings
                        ? "cursor-pointer hover:scale-105 active:scale-95"
                        : "cursor-default text-gray-500 opacity-60"
                    } ${
                      isTodayDate && !day.hasBookings
                        ? "border border-blue-400 bg-blue-50/40"
                        : ""
                    }`}
                  >
                    {day.hasBookings ? (
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${circleBadgeClass}`}
                      >
                        {day.dayNum}
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-gray-700">
                        {day.dayNum}
                      </span>
                    )}

                    {day.hasBookings && (
                      <span className="text-[9px] font-bold text-gray-500 mt-0.5 leading-none">
                        {day.slots.length} slot{day.slots.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Summary / Legend */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-around text-[11px] font-semibold text-gray-600 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                Past
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                Today
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Upcoming
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Day Bookings Detail Popup (Rendered into body with createPortal for fixed viewport centering) ── */}
      {mounted && selectedDayBookings && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDayBookings(null);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            style={{ height: "80vh", maxHeight: "80vh" }}
          >
            {/* Popup Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/70">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Bookings for Day
                </span>
                <h4 className="text-base sm:text-lg font-bold text-gray-900">
                  {new Date(selectedDayBookings.dateStr).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
              </div>

              <button
                onClick={() => setSelectedDayBookings(null)}
                className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Slots Scrollable List (Internal Scroll with flex-1 min-h-0) */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center justify-between pb-1 text-xs font-semibold text-gray-500">
                <span>{selectedDayBookings.slots.length} Reserved Slot(s)</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 font-bold">
                  Status: Reserved
                </span>
              </div>

              {selectedDayBookings.slots.map((slot, index) => (
                <div
                  key={slot.id || index}
                  className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    >
                      ⏰
                    </div>
                    <div>
                      {/* 12-Hour formatted timing (e.g. 2 PM - 6:30 PM) */}
                      <div className="text-sm font-bold text-gray-900">
                        {formatSlotRange(slot)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format12Hour(slot.startTime)} to {format12Hour(slot.endTime)}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60 shrink-0">
                    Reserved
                  </span>
                </div>
              ))}

              <div className="pt-3">
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  💡 <strong>Need this date?</strong> Please contact or submit an enquiry to check if slots outside these booked hours can be arranged.
                </div>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-100 shrink-0 bg-gray-50/70 flex items-center justify-end">
              <button
                onClick={() => setSelectedDayBookings(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer hover:opacity-95 transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
