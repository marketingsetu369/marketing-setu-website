import { TranslationDictionary } from "@/translation";

export interface BlogPost {
  href: string;
  date: string;
  category: string;
  title: string;
  description: string;
}

export function getBlogPosts(t: TranslationDictionary): BlogPost[] {
  return [
    {
      href: "/blog/whatsapp-marketing-guide",
      date: "12 Jul 2026",
      category: t.blog_cat_wa || "WhatsApp Marketing",
      title: t.blog_p1_title || "WhatsApp Marketing for Small Businesses: A Practical Guide",
      description:
        t.blog_p1_desc ||
        "How Indian small businesses can use WhatsApp broadcasts and automation to turn everyday enquiries into repeat customers.",
    },
    {
      href: "#",
      date: t.blog_date_coming_soon || "Coming soon",
      category: t.blog_cat_seo || "Local SEO",
      title: t.blog_p2_title || "5 Ways to Get Your Business Found on Google Maps",
      description:
        t.blog_p2_desc ||
        "A simple checklist for setting up and optimising your Google Business Profile so nearby customers find you first.",
    },
    {
      href: "#",
      date: t.blog_date_coming_soon || "Coming soon",
      category: t.blog_cat_auto || "Automation",
      title: t.blog_p3_title || "Missed Call, Missed Sale? Fixing the Gap With Auto-SMS",
      description:
        t.blog_p3_desc ||
        "Why missed-call automation is one of the highest-ROI tools for busy shop owners and service businesses.",
    },
  ];
}

export const blogPosts: BlogPost[] = getBlogPosts({} as any);
