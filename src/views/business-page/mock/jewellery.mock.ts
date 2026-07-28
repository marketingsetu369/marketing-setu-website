import type { BusinessPageData } from "@/types/businessPage";

export const jewelleryMock: BusinessPageData = {
  slug: "preview-jewellery",
  business_name: "Sona Jewellers",
  business_category: "Heritage Gold & Diamond Jewellery",
  about_us: "Crafted to be passed down generations — discover our heritage collection of pure gold, pristine diamonds, and exquisite silver ornaments by master artisans since 1974.",
  mobile_number: "919111222333",
  email_address: "enquiry@sonajewellers.in",
  location_address: "Laxmi Road, Sadashiv Peth, Pune – 411030",
  logo_url: "",
  theme_color_hex: "#b45309",
  facebook_link: "https://facebook.com",
  instagram_link: "https://instagram.com",
  products: [
    { name: "Bridal Gold Necklace Set",   description: "22K handcrafted necklace with matching earrings and maang tikka.",   price: "₹1,85,000", buttonName: "Enquiry"  },
    { name: "Diamond Solitaire Ring",     description: "0.50 carat certified diamond ring in 18K white gold setting.",       price: "₹42,000",   buttonName: "Enquiry"  },
    { name: "Traditional Temple Set",     description: "South Indian inspired temple jewellery in pure gold with rubies.",   price: "₹95,000",   buttonName: "Enquiry"  },
    { name: "Silver Payal (Pair)",        description: "925 sterling silver anklets with intricate filigree work.",          price: "₹3,500",    buttonName: "Buy Now"  },
  ],
  template_data: {
    jewellery: {
      eyebrow: "Since 1974 — The Gold Standard",
      gold_rates: [
        { label: "24K Gold Rate Today", value: "₹7,450 / gm",  subtext: "Updated daily" },
        { label: "22K Gold Rate Today", value: "₹6,830 / gm",  subtext: "Updated daily" },
        { label: "Silver Rate Today",   value: "₹92 / gm",     subtext: "Updated daily" },
      ],
    },
  },
};
