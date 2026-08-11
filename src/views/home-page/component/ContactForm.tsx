"use client";

import { ContactApi } from "@/api/repositories/contactApi";
import { useThemeStore } from "@/store/themeStore";
import { getContactFieldsConfig, translations } from "@/views/home-page/data";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const { contactForm, updateContactField, resetContactForm, language } = useThemeStore();
  const t = translations[language] || translations.en;

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field validations
    const newErrors: Record<string, string> = {};

    if (!contactForm.name?.trim()) {
      newErrors.name = t.error_name_required;
    }

    if (!contactForm.phone?.trim()) {
      newErrors.phone = t.error_phone_required;
    } else {
      const cleanPhone = contactForm.phone.replace(/[\s\-]/g, "");
      const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = t.error_phone_invalid;
      }
    }

    if (!contactForm.business?.trim()) {
      newErrors.business = t.error_business_required;
    }

    if (!contactForm.plan?.trim()) {
      newErrors.plan = t.error_plan_required;
    }

    if (!contactForm.message?.trim()) {
      newErrors.message = t.error_message_required;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t.error_form_invalid);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      await ContactApi.submitContact({
        name: contactForm.name,
        phone: contactForm.phone,
        business: contactForm.business || undefined,
        plan: contactForm.plan || undefined,
        message: contactForm.message || undefined,
      });
      setStatus("idle");
      toast.success(t.contact_form_success);
      resetContactForm();
    } catch (error: any) {
      setStatus("idle");
      const err = error?.message || "Failed to send message. Please try again.";
      toast.error(err);
    }
  };

  const fields = getContactFieldsConfig(t);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
          {t.contact_form_title}
        </h3>
        <p className="text-secondary text-sm">
          {t.contact_info_subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} id="contactForm" noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map((field) => {
            const hasError = !!errors[field.id];
            const value = contactForm[field.id as keyof typeof contactForm] || "";

            const handleChange = (
              e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
            ) => {
              updateContactField(field.id as any, e.target.value);
              if (errors[field.id]) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next[field.id];
                  return next;
                });
              }
            };

            const cellClass = field.fullWidth ? "col-span-1 sm:col-span-2" : "col-span-1";

            // Common class for inputs/selects/textareas for solid premium styling with clearly visible borders
            const inputBaseClass = `
              w-full px-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-grey-900/50 
              text-primary placeholder:text-secondary/50 font-medium text-sm
              transition-all duration-300 outline-none
              ${hasError 
                ? "border-red-500/80 focus:border-red-500" 
                : "border-gray-300 dark:border-gray-700 focus:border-brand-main"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `.trim().replace(/\s+/g, " ");

            return (
              <div key={field.id} className={`${cellClass} flex flex-col gap-2`}>
                <label 
                  htmlFor={field.id} 
                  className="text-sm font-bold text-primary tracking-wide"
                >
                  {field.label}
                  {field.required && <span className="text-error-main ml-1">*</span>}
                </label>

                {field.component === "input" && (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    disabled={status === "submitting"}
                    className={inputBaseClass}
                  />
                )}

                {field.component === "select" && (
                  <select
                    id={field.id}
                    name={field.id}
                    value={value}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className={`${inputBaseClass} appearance-none cursor-pointer`}
                  >
                    {(field.options || []).map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-background text-primary">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.component === "textarea" && (
                  <textarea
                    id={field.id}
                    name={field.id}
                    value={value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    disabled={status === "submitting"}
                    rows={4}
                    className={`${inputBaseClass} resize-none`}
                  />
                )}

                {hasError && (
                  <span className="text-xs font-semibold text-error-main animate-fade-in">
                    {errors[field.id]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full px-6 py-4 bg-brand-main hover:bg-brand-dark text-white font-semibold text-base rounded-xl shadow-z12 hover:shadow-z20 transition-all ease-out flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? t.contact_form_submitting : t.contact_form_submit}
          </button>
        </div>
      </form>
    </div>
  );
}

