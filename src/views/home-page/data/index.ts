// Data barrel — import from "@/views/home-page/data"
export { blogPosts } from "./blogs";
export { WA_NUMBER, WA_DEFAULT_MSG, navLinks, contactInfo } from "./constants";
export { pricingFaqs, contactFaqs, getPricingFaqs, getContactFaqs } from "./faqs";
export { whyUsFeatures, aboutValues, getWhyUsFeatures, getAboutValues } from "./features";
export { pricingPlans, compareRows, getPricingPlans } from "./plans";
export { servicesData, getServicesData } from "./services";
export { homeSteps, aboutSteps, getHomeSteps, getAboutSteps } from "./steps";
export { testimonialsData, getTestimonialsData } from "./testimonials";
export { translations } from "@/translation";
export { getContactFieldsConfig } from "./contactForm";

// Type re-exports
export type { Language } from "@/translation";
export type { BlogPost } from "./blogs";
export type { FeatureItem } from "./features";
export type { PricingPlan, PlanFeature, CompareRow } from "./plans";
