// Data barrel — import from "@/views/home-page/data"
export { blogPosts } from "./blogs";
export { WA_NUMBER, WA_DEFAULT_MSG, navLinks, contactInfo } from "./constants";
export { pricingFaqs, contactFaqs } from "./faqs";
export { whyUsFeatures, aboutValues } from "./features";
export { pricingPlans, compareRows } from "./plans";
export { servicesData } from "./services";
export { homeSteps, aboutSteps } from "./steps";
export { testimonialsData } from "./testimonials";
export { translations } from "@/translation";
export { getContactFieldsConfig } from "./contactForm";

// Type re-exports
export type { Language } from "@/translation";
export type { BlogPost } from "./blogs";
export type { FeatureItem } from "./features";
export type { PricingPlan, PlanFeature, CompareRow } from "./plans";
