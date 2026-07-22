export const getContactFieldsConfig = (t: any) => [
  {
    id: "name",
    component: "input" as const,
    type: "text",
    label: t.contact_form_name,
    placeholder: t.contact_form_name_placeholder,
    required: true,
    fullWidth: false,
  },
  {
    id: "phone",
    component: "input" as const,
    type: "tel",
    label: t.contact_form_phone,
    placeholder: t.contact_form_phone_placeholder,
    required: true,
    fullWidth: false,
  },
  {
    id: "business",
    component: "input" as const,
    type: "text",
    label: t.contact_form_business,
    placeholder: t.contact_form_business_placeholder,
    required: true,
    fullWidth: true,
  },
  {
    id: "plan",
    component: "select" as const,
    label: t.contact_form_plan,
    required: true,
    fullWidth: true,
    options: [
      { value: "", label: t.contact_form_plan_select },
      { value: "Starter", label: t.contact_form_plan_starter },
      { value: "Growth", label: t.contact_form_plan_growth },
      { value: "Pro", label: t.contact_form_plan_pro },
      { value: "Not sure", label: t.contact_form_plan_not_sure }
    ],
  },
  {
    id: "message",
    component: "textarea" as const,
    label: t.contact_form_message,
    placeholder: t.contact_form_msg_placeholder,
    required: true,
    fullWidth: true,
  }
];
