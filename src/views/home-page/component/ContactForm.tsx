"use client";

import React, { useState } from "react";
import { ContactApi } from "@/api/repositories/contactApi";
import { useThemeStore } from "@/store/themeStore";
import { translations, getContactFieldsConfig } from "@/views/home-page/data";
import { AppInput, AppSelect, AppTextArea, AppButton } from "@/components/library";
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
      // Validate phone number format (+91 optionally followed by 10 digits starting with 6-9)
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

    // Stop submission if validation errors are found
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

  // Retrieve fields schema configurations from data layer
  const fields = getContactFieldsConfig(t);

  return (
    <div className="space-y-6">
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
        {t.contact_form_title}
      </h3>

      {/* noValidate turns off browser defaults to display premium red error messages */}
      <form onSubmit={handleSubmit} id="contactForm" noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => {
            const commonProps = {
              id: field.id,
              name: field.id,
              label: field.label,
              value: contactForm[field.id as keyof typeof contactForm] || "",
              onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                updateContactField(field.id as any, e.target.value);
                // Clear errors on change
                if (errors[field.id]) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next[field.id];
                    return next;
                  });
                }
              },
              disabled: status === "submitting",
              fullWidth: field.fullWidth,
              error: errors[field.id],
            };

            const cellClass = field.fullWidth ? "col-span-1 sm:col-span-2" : "col-span-1";

            if (field.component === "input") {
              return (
                <div key={field.id} className={cellClass}>
                  <AppInput 
                    {...commonProps}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              );
            }

            if (field.component === "select") {
              return (
                <div key={field.id} className={cellClass}>
                  <AppSelect 
                    {...commonProps}
                    options={field.options || []}
                    required={field.required}
                  />
                </div>
              );
            }

            if (field.component === "textarea") {
              return (
                <div key={field.id} className={cellClass}>
                  <AppTextArea 
                    {...commonProps}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        <div className="pt-2">
          <AppButton 
            type="submit" 
            disabled={status === "submitting"}
            fullWidth
            variant="whatsapp"
          >
            {status === "submitting" ? t.contact_form_submitting : t.contact_form_submit}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

