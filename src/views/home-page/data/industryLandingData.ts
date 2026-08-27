export interface IndustryLandingInfo {
  slug: string;
  industryName: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  subtitle: string;
  badge: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const industryLandingMap: Record<string, IndustryLandingInfo> = {
  "digital-marketing-for-salons": {
    slug: "digital-marketing-for-salons",
    industryName: "Salons & Beauty Parlours",
    title: "Digital Marketing Platform for Salons & Beauty Parlours | Marketing Setu",
    metaDescription: "Grow your salon business with digital business cards, WhatsApp appointment automation, festival offer posts, Google Maps ranking, and income & expense tracking.",
    keywords: ["salon marketing", "salon digital marketing", "salon marketing software", "beauty parlour marketing", "digital marketing for salons", "WhatsApp booking for salons"],
    h1: "Digital Marketing Platform for Salons & Beauty Parlours",
    subtitle: "Showcase your beauty services, automate appointment enquiries on WhatsApp, boost your Google Business ranking, and track daily parlour income.",
    badge: "For Salons & Beauty Parlours",
    benefits: [
      "Digital Service Catalogue with prices and photos",
      "Instant WhatsApp appointment enquiry button",
      "Google Maps local SEO setup for top ranking in your city",
      "Festival social media post templates for beauty offers",
      "Income & expense tracker for salon sales"
    ],
    faqs: [
      {
        question: "How does Marketing Setu help my beauty parlour get more customers?",
        answer: "Marketing Setu provides a Digital Business Card with your service menu, Google Maps ranking, and automated WhatsApp replies so clients can easily book appointments."
      },
      {
        question: "Can I share my salon menu on WhatsApp?",
        answer: "Yes! Your digital card contains your complete service list with prices, which clients can open and share on WhatsApp in one click."
      }
    ]
  },
  "digital-marketing-for-restaurants": {
    slug: "digital-marketing-for-restaurants",
    industryName: "Restaurants & Cafes",
    title: "Digital Marketing Platform for Restaurants & Cafes | Marketing Setu",
    metaDescription: "Boost your restaurant & cafe sales with digital QR menu cards, WhatsApp order enquiries, Google Business profile optimization, and social media promotion.",
    keywords: ["restaurant marketing", "restaurant digital marketing", "restaurant promotion", "restaurant marketing software", "digital marketing for restaurants"],
    h1: "Digital Marketing Platform for Restaurants & Cafes",
    subtitle: "Publish interactive digital menus, get instant food enquiries via WhatsApp, collect Google reviews, and attract local foodies.",
    badge: "For Restaurants, Cafes & Catering",
    benefits: [
      "QR Code Digital Menu for table scanning and WhatsApp ordering",
      "Google Business Profile optimization for 'Restaurants near me'",
      "Automated WhatsApp broadcasts for daily specials and festival offers",
      "Customer review collection automation",
      "Track daily food sales and expense management"
    ],
    faqs: [
      {
        question: "How does the Digital Menu work for restaurants?",
        answer: "Customers scan a QR code or click your link to view your menu with photos, prices, and a direct WhatsApp order button."
      }
    ]
  },
  "digital-marketing-for-retail-shops": {
    slug: "digital-marketing-for-retail-shops",
    industryName: "Retail Shops & Stores",
    title: "Digital Marketing Platform for Retail Shops | Marketing Setu",
    metaDescription: "Empower your retail store with digital product cards, WhatsApp customer broadcasts, Google Map ranking, and daily expense tracking.",
    keywords: ["retail shop marketing", "shop promotion online", "retail digital marketing", "small shop marketing", "local shop marketing"],
    h1: "Digital Marketing Platform for Retail Shops",
    subtitle: "Showcase your newest stock, send offer updates to customers on WhatsApp, and dominate local search in your neighborhood.",
    badge: "For Retail Stores & Clothing Shops",
    benefits: [
      "Digital Product Showcase Card with WhatsApp buy enquiry button",
      "WhatsApp broadcast templates for festival discounts and new arrivals",
      "Google Maps local SEO optimization",
      "Customer engagement tools to drive repeat footfall",
      "Shop income & expense tracking"
    ],
    faqs: [
      {
        question: "Can I update my product offers anytime?",
        answer: "Yes, you can update your digital catalogue and prices anytime, and send WhatsApp offer updates to your customers."
      }
    ]
  },
  "digital-marketing-for-doctors": {
    slug: "digital-marketing-for-doctors",
    industryName: "Doctors & Clinics",
    title: "Digital Marketing Platform for Doctors & Clinics | Marketing Setu",
    metaDescription: "Professional digital profile cards, WhatsApp appointment follow-ups, Google Maps clinic ranking, and missed call auto-replies for doctors.",
    keywords: ["doctor marketing", "clinic marketing", "digital marketing for doctors", "clinic appointment software", "healthcare marketing India"],
    h1: "Digital Marketing Platform for Doctors & Clinics",
    subtitle: "Help patients find your clinic on Google Maps, book appointments via WhatsApp, and receive automated clinic updates.",
    badge: "For Clinics, Doctors & Healthcare",
    benefits: [
      "Professional Digital Profile Card with timing and location",
      "WhatsApp auto-reply for appointment enquiries",
      "Google Business Profile optimization for top local search ranking",
      "Missed-call SMS & WhatsApp recovery system",
      "Clean digital presence for single & multi-specialty clinics"
    ],
    faqs: [
      {
        question: "Can patients get clinic directions and timing easily?",
        answer: "Yes, your digital card includes direct tap-to-call, clinic timings, and one-tap Google Maps directions."
      }
    ]
  },
  "digital-marketing-for-real-estate": {
    slug: "digital-marketing-for-real-estate",
    industryName: "Real Estate Agents & Brokers",
    title: "Digital Marketing Platform for Real Estate Agents | Marketing Setu",
    metaDescription: "Showcase property listings with digital cards, capture property buyer leads on WhatsApp, and build your brand online.",
    keywords: ["real estate marketing", "real estate agent software", "digital marketing for real estate", "property consultant marketing"],
    h1: "Digital Marketing Platform for Real Estate Agents",
    subtitle: "Share property photos, floor plans, and pricing in one tap — collect high-intent WhatsApp buyer leads instantly.",
    badge: "For Real Estate & Property Consultants",
    benefits: [
      "Property Showcase Digital Card with photo galleries and prices",
      "Direct WhatsApp enquiry button for high-value leads",
      "Personalized branding for property brokers and agents",
      "Social media post templates for property deals",
      "Lead management & follow-up tools"
    ],
    faqs: [
      {
        question: "How do property buyers view listings on my card?",
        answer: "Buyers click your digital card link to view featured properties, photos, location highlights, and chat with you directly on WhatsApp."
      }
    ]
  },
  "digital-marketing-for-freelancers": {
    slug: "digital-marketing-for-freelancers",
    industryName: "Freelancers & Consultants",
    title: "Digital Marketing Platform for Freelancers | Marketing Setu",
    metaDescription: "Stand out with a modern digital portfolio card, direct WhatsApp hire button, client testimonial showcase, and project expense tracker.",
    keywords: ["freelancer marketing", "digital card for freelancers", "freelance portfolio maker", "digital marketing for freelancers"],
    h1: "Digital Marketing Platform for Freelancers",
    subtitle: "Share your portfolio, client reviews, and service rates with a sleek digital card designed to get you hired faster.",
    badge: "For Freelancers & Independent Creators",
    benefits: [
      "Portfolio Digital Business Card with work samples",
      "Direct WhatsApp & email contact buttons",
      "Client reviews & testimonials section",
      "Income & expense tracking for freelance projects",
      "QR code for networking and events"
    ],
    faqs: [
      {
        question: "Can I add links to my social profiles and portfolio?",
        answer: "Yes! You can link your LinkedIn, Instagram, website, and portfolio directly on your card."
      }
    ]
  },
  "digital-marketing-for-photographers": {
    slug: "digital-marketing-for-photographers",
    industryName: "Photographers & Studios",
    title: "Digital Marketing Platform for Photographers | Marketing Setu",
    metaDescription: "Showcase wedding & event photo portfolios, automate booking enquiries via WhatsApp, and manage studio income & expenses.",
    keywords: ["photographer marketing", "studio marketing", "digital marketing for photographers", "wedding photography leads"],
    h1: "Digital Marketing Platform for Photographers",
    subtitle: "Display stunning photo portfolios, capture wedding & event shoot bookings on WhatsApp, and stand out locally.",
    badge: "For Photography & Video Studios",
    benefits: [
      "High-resolution Photo Portfolio Digital Card",
      "Package & pricing display with WhatsApp booking enquiry",
      "Google Business Profile optimization for local studio ranking",
      "Festival and wedding season promo templates",
      "Studio income & expense manager"
    ],
    faqs: [
      {
        question: "Can clients book wedding shoots through WhatsApp?",
        answer: "Yes, clients can view your shoot packages and click the WhatsApp button to enquire about dates and booking."
      }
    ]
  },
  "digital-marketing-for-fashion-designers": {
    slug: "digital-marketing-for-fashion-designers",
    industryName: "Fashion Designers & Boutiques",
    title: "Digital Marketing Platform for Fashion Designers | Marketing Setu",
    metaDescription: "Promote designer collections, boutique outfits, WhatsApp order enquiries, and social media marketing for fashion designers.",
    keywords: ["fashion designer marketing", "boutique marketing", "digital marketing for fashion designers", "designer wear marketing"],
    h1: "Digital Marketing Platform for Fashion Designers",
    subtitle: "Showcase custom outfits, bridal collections, and designer wear — receive direct WhatsApp order enquiries from clients.",
    badge: "For Fashion Designers & Boutiques",
    benefits: [
      "Digital Lookbook Card featuring custom collections and prices",
      "Instant WhatsApp order and custom fitting enquiry button",
      "Google Maps local SEO for boutique footfall",
      "Social media post designs for new collection launches",
      "Sales & expense tracking tool"
    ],
    faqs: [
      {
        question: "How does the Digital Lookbook work?",
        answer: "Your clients can browse your fashion designs on their phone and order or enquire on WhatsApp instantly."
      }
    ]
  },
  "digital-marketing-for-electric-vehicle-dealers": {
    slug: "digital-marketing-for-electric-vehicle-dealers",
    industryName: "EV Dealers & Showrooms",
    title: "Digital Marketing Platform for EV Dealers | Marketing Setu",
    metaDescription: "Promote electric scooters & vehicles, capture test-drive leads on WhatsApp, and rank #1 on Google Maps for local EV buyers.",
    keywords: ["EV dealer marketing", "electric vehicle marketing", "EV showroom promotion", "digital marketing for EV dealers"],
    h1: "Digital Marketing Platform for EV Dealers",
    subtitle: "Showcase EV models, specs, and prices — capture test drive requests on WhatsApp and dominate local Google searches.",
    badge: "For Electric Vehicle Dealerships",
    benefits: [
      "EV Model Showcase Card with specs, battery range & prices",
      "WhatsApp Test Drive booking & enquiry button",
      "Google Maps local SEO for 'EV showroom near me'",
      "Automated follow-ups for prospective vehicle buyers",
      "Dealership sales & expense management"
    ],
    faqs: [
      {
        question: "Can customers book EV test drives through WhatsApp?",
        answer: "Yes, customers can view your EV scooter or vehicle specs and submit a test drive enquiry directly on WhatsApp."
      }
    ]
  }
};
