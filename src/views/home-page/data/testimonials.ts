import { Testimonial } from "../component/TestimonialCard";
import { TranslationDictionary } from "@/translation";

export function getTestimonialsData(t: TranslationDictionary): Testimonial[] {
  return [
    {
      stars: "★★★★★",
      text: t.testi_1_text || "MarketingSetu has helped me showcase my fashion designs professionally and connect with more customers. The digital presence and promotional tools have made it much easier to grow Designer Sanu.",
      initials: "SB",
      name: "Sanika Bondre",
      role: t.testi_1_role || "Owner, Designer Sanu",
      image: "/testimonials/sanika-bondre.png"
    },
    {
      stars: "★★★★★",
      text: t.testi_2_text || "MarketingSetu makes it so easy to promote my beauty parlour and stay connected with customers. Our online visibility has improved, and we are getting more enquiries from local customers.",
      initials: "AA",
      name: "Amruta Agrawal",
      role: t.testi_2_role || "Owner, Amruta Beauty Parlour",
      image: "/testimonials/amruta-agrawal.png"
    },
    {
      stars: "★★★★★",
      text: t.testi_3_text || "MarketingSetu has made promoting our latest collections much easier. Customers can quickly discover our offers and products, and we are getting better engagement from our local audience.",
      initials: "SL",
      name: "Swapnil Lakade",
      role: t.testi_3_role || "Owner, VIP Mens Wear",
      image: "/testimonials/swapnil-lakade.png"
    }
  ];
}

export const testimonialsData: Testimonial[] = getTestimonialsData({} as any);
