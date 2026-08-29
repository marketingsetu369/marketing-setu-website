import { StepItem } from "../component/StepsSection";
import { TranslationDictionary } from "@/translation";

export function getHomeSteps(t: TranslationDictionary): StepItem[] {
  return [
    { number: "01", title: t.how_s1_title || "Contact Us", description: t.how_s1_desc || "Reach out via WhatsApp or our form — tell us about your business." },
    { number: "02", title: t.how_s2_title || "We Plan & Execute", description: t.how_s2_desc || "Our team crafts a tailored strategy and launches your campaigns quickly." },
    { number: "03", title: t.how_s3_title || "Watch It Grow", description: t.how_s3_desc || "Track results, get reports, and see your customer base grow year after year." },
  ];
}

export function getAboutSteps(t: TranslationDictionary): StepItem[] {
  return [
    { number: "01", title: t.about_step_1_title || "Understand your business", description: t.about_step_1_desc || "A short WhatsApp or call conversation to learn what you sell, who buys it, and where leads currently slip through." },
    { number: "02", title: t.about_step_2_title || "Set up your Setu", description: t.about_step_2_desc || "We configure WhatsApp automation, your landing page, and Google Business profile — usually within days, not weeks." },
    { number: "03", title: t.about_step_3_title || "Support & grow", description: t.about_step_3_desc || "Ongoing support, seasonal campaign ideas, and simple reporting so you always know what's working." },
  ];
}

export const homeSteps: StepItem[] = getHomeSteps({} as any);
export const aboutSteps: StepItem[] = getAboutSteps({} as any);
