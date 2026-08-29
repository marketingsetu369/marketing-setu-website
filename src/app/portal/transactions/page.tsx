"use client";

import {
  UserDashboardApi,
  UserTransactionItem,
  UserTransactionsSummary,
} from "@/api/repositories/userDashboardApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function UserTransactionsPage() {
  const [data, setData] = useState<UserTransactionsSummary>({
    transactions: [],
    totalExpenses: 0,
    totalIncome: 0,
    netBalance: 0,
  });
  const [loading, setLoading] = useState(true);

  // ── Exact Filter State (matched with mobile app) ─────────────────────────
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [dateOption, setDateOption] = useState<"all" | "this_month" | "last_month" | "last_6_months" | "custom">("all");
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [paymentModeFilter, setPaymentModeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ── Modal State (Add / Edit) ─────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UserTransactionItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Form State ───────────────────────────────────────────────────────────
  const [formType, setFormType] = useState<"income" | "expense">("income");
  const [formAmount, setFormAmount] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Sales");
  const [formPaymentMode, setFormPaymentMode] = useState("cash");
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [formDescription, setFormDescription] = useState("");

  // ── Standard Default Categories (from UserTransactionsController) ────────
  const defaultIncomeCategories = [
    "Sales",
    "Service",
    "Commission",
    "Rental",
    "Interest",
    "Dividend",
    "Royalty",
    "Refund",
    "Investment",
    "Other Income",
  ];

  const defaultExpenseCategories = [
    "Rent",
    "Salary",
    "Utilities",
    "Marketing",
    "Travel",
    "Supplies",
    "Software / SaaS",
    "Taxes",
    "Insurance",
    "Professional Services",
    "Office Stationery",
    "Food & Dining",
    "Other Expense",
  ];

  const paymentModes = ["cash", "upi", "bank transfer", "card", "cheque"];

  const loadTransactions = async () => {
    try {
      setLoading(true);
      let fromDate: string | undefined;
      let toDate: string | undefined;
      const now = new Date();

      if (dateOption === "this_month") {
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
      } else if (dateOption === "last_month") {
        fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
        toDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString();
      } else if (dateOption === "last_6_months") {
        fromDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).toISOString();
        toDate = now.toISOString();
      } else if (dateOption === "custom") {
        if (customFromDate) fromDate = new Date(customFromDate).toISOString();
        if (customToDate) toDate = new Date(customToDate + "T23:59:59").toISOString();
      }

      const res = await UserDashboardApi.getTransactions({
        fromDate,
        toDate,
        type: typeFilter === "all" ? undefined : typeFilter,
      });

      if (res.data) {
        setData(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [typeFilter, dateOption, customFromDate, customToDate]);

  const resetFilters = () => {
    setTypeFilter("all");
    setDateOption("all");
    setCustomFromDate("");
    setCustomToDate("");
    setCategoryFilter("all");
    setPaymentModeFilter("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    typeFilter !== "all" ||
    dateOption !== "all" ||
    categoryFilter !== "all" ||
    paymentModeFilter !== "all" ||
    searchQuery.trim() !== "";

  // ── Open Add / Edit Modal ────────────────────────────────────────────────
  const openAddModal = () => {
    setEditingItem(null);
    setFormType("income");
    setFormAmount("");
    setFormTitle("");
    setFormCategory("Sales");
    setFormPaymentMode("cash");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: UserTransactionItem) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormAmount(item.amount.toString());
    setFormTitle(item.title);
    setFormCategory(item.category || (item.type === "income" ? "Sales" : "Rent"));
    setFormPaymentMode(item.paymentMode ? item.paymentMode.toLowerCase() : "cash");
    setFormDate(
      item.date ? new Date(item.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]
    );
    setFormDescription(item.description || "");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(formAmount);
    if (!formTitle.trim()) {
      toast.error("Please enter a transaction title");
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    try {
      setSubmitting(true);
      if (editingItem) {
        await UserDashboardApi.updateTransaction(editingItem.id, {
          type: formType,
          amount: numAmount,
          title: formTitle.trim(),
          category: formCategory,
          paymentMode: formPaymentMode,
          date: formDate,
          description: formDescription.trim() || undefined,
        });
        toast.success("Transaction updated successfully!");
      } else {
        await UserDashboardApi.createTransaction({
          type: formType,
          amount: numAmount,
          title: formTitle.trim(),
          category: formCategory,
          paymentMode: formPaymentMode,
          date: formDate,
          description: formDescription.trim() || undefined,
        });
        toast.success("Transaction recorded successfully!");
      }
      setIsModalOpen(false);
      loadTransactions();
    } catch (err: any) {
      toast.error(err.message || "Failed to save transaction");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction record?")) return;
    try {
      await UserDashboardApi.deleteTransaction(id);
      toast.success("Transaction deleted successfully");
      loadTransactions();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete transaction");
    }
  };

  const handleExportCSV = () => {
    if (data.transactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }
    const headers = ["Date", "Type", "Title", "Category", "Payment Mode", "Amount (INR)", "Notes"];
    const rows = filteredList.map((t) => [
      new Date(t.date || t.createdAt || "").toLocaleDateString("en-IN"),
      t.type.toUpperCase(),
      `"${(t.title || "").replace(/"/g, '""')}"`,
      `"${(t.category || "").replace(/"/g, '""')}"`,
      (t.paymentMode || "").toUpperCase(),
      t.type === "income" ? t.amount : -t.amount,
      `"${(t.description || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  // ── Client-side Filtered Transactions (Category, Payment Mode, Search) ───
  const filteredList = useMemo(() => {
    return data.transactions.filter((t) => {
      // Category filter
      if (categoryFilter !== "all" && t.category !== categoryFilter) {
        return false;
      }
      // Payment mode filter
      if (
        paymentModeFilter !== "all" &&
        (t.paymentMode || "").toLowerCase() !== paymentModeFilter.toLowerCase()
      ) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          t.title.toLowerCase().includes(q) ||
          (t.category && t.category.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q)) ||
          (t.paymentMode && t.paymentMode.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [data.transactions, categoryFilter, paymentModeFilter, searchQuery]);

  // All unique categories present for filter dropdown
  const allAvailableCategories = useMemo(() => {
    const set = new Set<string>();
    defaultIncomeCategories.forEach((c) => set.add(c));
    defaultExpenseCategories.forEach((c) => set.add(c));
    data.transactions.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [data.transactions]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Transactions & Bookkeeping 💸
          </h1>
          <p className="text-sm text-[#667085] dark:text-slate-400 font-normal max-w-2xl leading-relaxed">
            Record customer earnings, sales revenue, and business expenses with instant reporting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#F8F9FD] text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#667085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Net Balance */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Net Cash Balance
              </span>
              <div
                className={`text-3xl font-bold tracking-tight mt-0.5 ${
                  data.netBalance >= 0 ? "text-slate-900 dark:text-white" : "text-rose-600"
                }`}
              >
                ₹{data.netBalance.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#F0EEFF] text-[#6C5CE7] flex items-center justify-center shrink-0">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#6C5CE7] uppercase flex items-center gap-1">
            <span>Income minus expenses</span>
          </div>
        </div>

        {/* Total Income */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Total Income
              </span>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5">
                +₹{data.totalIncome.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E6FAF5] text-[#059669] flex items-center justify-center shrink-0">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#059669] uppercase flex items-center gap-1">
            <span>↗ Customer earnings</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[132px]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Total Expenses
              </span>
              <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 tracking-tight mt-0.5">
                -₹{data.totalExpenses.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center shrink-0">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#D92D20] uppercase flex items-center gap-1">
            <span>↘ Business spending</span>
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Filter Bar (Same Filters as Mobile User App) */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
        <div className="space-y-4">
          {/* Top Filter Controls: Type Segment + Date Quick Chips */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Type Segmented Pill */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start">
              <button
                type="button"
                onClick={() => setTypeFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  typeFilter === "all"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-[#667085] hover:text-slate-900"
                }`}
              >
                All ({data.transactions.length})
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter("income")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  typeFilter === "income"
                    ? "bg-[#E6FAF5] text-[#059669] shadow-xs"
                    : "text-[#667085] hover:text-slate-900"
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter("expense")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  typeFilter === "expense"
                    ? "bg-[#FEE4E2] text-[#D92D20] shadow-xs"
                    : "text-[#667085] hover:text-slate-900"
                }`}
              >
                Expenses
              </button>
            </div>

            {/* Date Quick Filter Chips (All Time, This Month, Last Month, Last 6 Months, Custom) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: "all", label: "All Time" },
                { id: "this_month", label: "This Month" },
                { id: "last_month", label: "Last Month" },
                { id: "last_6_months", label: "Last 6 Months" },
                { id: "custom", label: "Custom Range" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDateOption(opt.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    dateOption === opt.id
                      ? "bg-[#6C5CE7] text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Range Pickers (Visible when custom is selected) */}
          {dateOption === "custom" && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center gap-4 animate-fade-in border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Date Range:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={customFromDate}
                  onChange={(e) => setCustomFromDate(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold outline-none focus:border-[#6C5CE7]"
                />
                <span className="text-xs text-slate-400">to</span>
                <input
                  type="date"
                  value={customToDate}
                  onChange={(e) => setCustomToDate(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold outline-none focus:border-[#6C5CE7]"
                />
              </div>
            </div>
          )}

          {/* Secondary Controls: Category, Payment Mode, Search Query, and Reset */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Category Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-semibold">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-[#6C5CE7]"
                >
                  <option value="all">All Categories</option>
                  {allAvailableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Mode Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-semibold">Payment:</span>
                <select
                  value={paymentModeFilter}
                  onChange={(e) => setPaymentModeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-[#6C5CE7] capitalize"
                >
                  <option value="all">All Modes</option>
                  {paymentModes.map((mode) => (
                    <option key={mode} value={mode} className="capitalize">
                      {mode.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#6C5CE7] hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search description, title..."
                className="pl-8 pr-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#6C5CE7] w-full sm:w-56"
              />
              <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4. Transactions List */}
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#6C5CE7] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Loading entries...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#F0EEFF] text-[#6C5CE7] flex items-center justify-center mx-auto">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching transactions</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {hasActiveFilters
                ? "No entries match your selected filter criteria. Try resetting the filters."
                : 'Click "Record Transaction" above to log your first income or expense.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredList.map((item) => {
              const isIncome = item.type === "income";
              const formattedDate = new Date(item.date || item.createdAt || "").toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-3.5">
                    {/* Squircle indicator */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isIncome ? "bg-[#E6FAF5] text-[#059669]" : "bg-[#FEE4E2] text-[#D92D20]"
                      }`}
                    >
                      {isIncome ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      )}
                    </div>

                    {/* Title and metadata */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white capitalize">
                          {item.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded-[6px] bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                          {item.category || "General"}
                        </span>
                        {item.paymentMode && (
                          <span className="px-2 py-0.5 rounded-[6px] bg-blue-50 dark:bg-blue-950/40 text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase">
                            {item.paymentMode}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <span>{formattedDate}</span>
                        {item.description && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-md italic">{item.description}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount & Actions */}
                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div
                        className={`text-base font-bold tracking-tight ${
                          isIncome ? "text-[#059669]" : "text-[#D92D20]"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹{item.amount.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {item.type}
                      </span>
                    </div>

                    {/* Row Actions */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-xl text-slate-500 hover:text-[#6C5CE7] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit transaction"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete transaction"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Modal: Add / Edit Transaction */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingItem ? "Edit Transaction Record" : "Record New Transaction"}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {editingItem ? "Update payment details" : "Add an income or business expense entry"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setFormType("income");
                    if (!defaultIncomeCategories.includes(formCategory)) setFormCategory("Sales");
                  }}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    formType === "income"
                      ? "bg-white dark:bg-slate-900 text-[#059669] shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>↗</span>
                  <span>Income / Sales</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormType("expense");
                    if (!defaultExpenseCategories.includes(formCategory)) setFormCategory("Rent");
                  }}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    formType === "expense"
                      ? "bg-white dark:bg-slate-900 text-[#D92D20] shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>↘</span>
                  <span>Expense / Spending</span>
                </button>
              </div>

              {/* Amount & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="e.g. 2500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold outline-none focus:border-[#6C5CE7]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Transaction Title / Item <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder={formType === "income" ? "e.g. Order payment, Consulting fee" : "e.g. Raw materials, Office electricity bill"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
                />
              </div>

              {/* Category & Payment Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold outline-none focus:border-[#6C5CE7]"
                  >
                    {(formType === "income" ? defaultIncomeCategories : defaultExpenseCategories).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Payment Mode
                  </label>
                  <select
                    value={formPaymentMode}
                    onChange={(e) => setFormPaymentMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold outline-none focus:border-[#6C5CE7] capitalize"
                  >
                    {paymentModes.map((m) => (
                      <option key={m} value={m} className="capitalize">
                        {m.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Notes / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Additional invoice reference, bill number, or notes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-[#6C5CE7] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Saving..." : editingItem ? "Update Record" : "Save Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
