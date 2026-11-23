"use client";

import { ContactApi } from "@/api/repositories/contactApi";
import { useThemeStore } from "@/store/themeStore";
import { getContactFieldsConfig, translations } from "@/views/home-page/data";
import { FormInput, FormSelect, FormTextarea } from "@/components/ui";
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
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
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

            return (
              <div key={field.id} className={cellClass}>
                {field.component === "input" && (
                  <FormInput
                    id={field.id}
                    name={field.id}
                    label={field.label}
                    required={field.required}
                    type={field.type}
                    value={value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    disabled={status === "submitting"}
                    error={hasError ? errors[field.id] : undefined}
                  />
                )}

                {field.component === "select" && (
                  <FormSelect
                    id={field.id}
                    name={field.id}
                    label={field.label}
                    required={field.required}
                    value={value}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    options={field.options}
                    error={hasError ? errors[field.id] : undefined}
                  />
                )}

                {field.component === "textarea" && (
                  <FormTextarea
                    id={field.id}
                    name={field.id}
                    label={field.label}
                    required={field.required}
                    value={value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    disabled={status === "submitting"}
                    rows={4}
                    error={hasError ? errors[field.id] : undefined}
                  />
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

