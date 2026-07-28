import type { BusinessPageData } from "@/types/businessPage";

export const gymMock: BusinessPageData = {
  slug: "preview-gym",
  business_name: "IronForge Fitness",
  business_category: "High Performance Gym & Training Center",
  about_us:
    "Train harder, move faster, and own every rep. IronForge is built for peak performance — from beginner to elite athlete.",
  mobile_number: "919900112233",
  email_address: "train@ironforge.in",
  location_address: "Wakad, Pune – 411057",
  logo_url: "",
  theme_color_hex: "#facc15",
  instagram_link: "https://instagram.com",
  products: [
    { name: "Monthly Membership",    description: "Unlimited gym access, locker, and two personal training sessions included.", price: "₹1,999/month",  buttonName: "Enquiry"  },
    { name: "Quarterly Plan",        description: "Save more with 3 months of full access plus nutrition consultation.",          price: "₹4,999",       buttonName: "Buy Now"  },
    { name: "Personal Training",     description: "1-on-1 coaching sessions tailored to your specific fitness goals.",            price: "₹800/session", buttonName: "Book Now" },
    { name: "CrossFit Bootcamp",     description: "High-intensity group training — 45 minutes, 5 days a week.",                  price: "₹2,500/month", buttonName: "Enquiry"  },
  ],
  template_data: {
    gym: {
      stats: [
        { value: "80+",  label: "Weekly Classes"       },
        { value: "2K+",  label: "Active Members"        },
        { value: "98%",  label: "Satisfaction Rate"     },
        { value: "1:1",  label: "Coaching Ratio"        },
      ],
      programs_intro: "Choose the right program to match your strength goals and fitness level.",
      focus_cards: [
        { title: "Strength Lab",         desc: "Free weights, barbells, and structured lifting programming for every stage.",         variant: "default" },
        { title: "Performance Circuit",  desc: "Fast-paced conditioning drills powered by energy, precision, and expert guidance.", variant: "bright"   },
        { title: "Cardio & Endurance",   desc: "Treadmills, assault bikes, rowing machines, and HIIT formats for peak stamina.",    variant: "default"  },
      ],
    },
  },
};
