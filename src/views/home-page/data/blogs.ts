export interface BlogPost {
  href: string;
  date: string;
  category: string;
  title: string;
  description: string;
}

export const blogPosts: BlogPost[] = [
  {
    href: "/blog/whatsapp-marketing-guide",
    date: "12 Jul 2026",
    category: "WhatsApp Marketing",
    title: "WhatsApp Marketing for Small Businesses: A Practical Guide",
    description:
      "How Indian small businesses can use WhatsApp broadcasts and automation to turn everyday enquiries into repeat customers.",
  },
  {
    href: "#",
    date: "Coming soon",
    category: "Local SEO",
    title: "5 Ways to Get Your Business Found on Google Maps",
    description:
      "A simple checklist for setting up and optimising your Google Business Profile so nearby customers find you first.",
  },
  {
    href: "#",
    date: "Coming soon",
    category: "Automation",
    title: "Missed Call, Missed Sale? Fixing the Gap With Auto-SMS",
    description:
      "Why missed-call automation is one of the highest-ROI tools for busy shop owners and service businesses.",
  },
];
