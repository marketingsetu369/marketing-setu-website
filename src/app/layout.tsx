import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marketingsetu.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Marketing Setu – Digital Marketing Platform for Small Businesses",
    template: "%s | Marketing Setu",
  },
  description:
    "Marketing Setu helps small businesses grow online with digital business cards, WhatsApp automation, landing pages, social media tools, Google Business management, and income & expense tracking.",
  keywords: [
    "digital marketing platform",
    "digital marketing for small businesses",
    "small business marketing platform",
    "all in one marketing platform",
    "business marketing software",
    "digital business card",
    "digital visiting card",
    "digital business card India",
    "NFC business card",
    "WhatsApp marketing for business",
    "WhatsApp automation for business",
    "landing page builder",
    "social media management for small business",
    "Google Business Profile management",
    "local business marketing",
    "business promotion platform",
    "small business marketing software",
    "business income expense tracker",
    "online business promotion",
    "business growth platform",
    "digital marketing platform India",
    "digital marketing for small business India",
    "business promotion platform India",
    "small business marketing India",
    "NFC visiting card India",
    "WhatsApp marketing India",
    "social media marketing India",
    "local business marketing India",
    "online business promotion India",
    "marketing software India",
    "small business software India",
    "Pune",
    "Viman Nagar",
    "Satara",
    "Sangli",
    "Kolhapur",
    "Maharashtra",
  ],
  authors: [{ name: "Marketing Setu Team", url: baseUrl }],
  creator: "Marketing Setu",
  publisher: "Marketing Setu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Marketing Setu",
    title: "Marketing Setu – Digital Marketing Platform for Small Businesses",
    description:
      "Marketing Setu helps small businesses grow online with digital business cards, WhatsApp automation, landing pages, social media tools, Google Business management, and income & expense tracking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Marketing Setu Digital Growth Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Setu – Digital Marketing Platform for Small Businesses",
    description:
      "Marketing Setu helps small businesses grow online with digital business cards, WhatsApp automation, landing pages, social media tools, Google Business management, and income & expense tracking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Viman Nagar, Pune, Satara, Sangli, Kolhapur, Maharashtra, India",
    "geo.position": "18.5011;73.7508",
    "ICBM": "18.5011, 73.7508",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://marketingsetu.com/#organization",
      "name": "MarketingSetu",
      "alternateName": ["Marketing Setu", "MarketingSetu App"],
      "url": "https://marketingsetu.com",
      "logo": "https://marketingsetu.com/logo.svg",
      "image": "https://marketingsetu.com/logo.svg",
      "description": "Digital Marketing, WhatsApp Automation and Local SEO platform for businesses in Hinjawadi, Pune, Satara, Sangli, Kolhapur, Maharashtra and India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hinjawadi - Wakad Road, Hinjawadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411057",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-99999-99999",
        "email": "support@marketingsetu.com",
        "contactType": "customer service",
        "areaServed": [
          "Maharashtra",
          "Pune",
          "Hinjawadi",
          "Satara",
          "Sangli",
          "Kolhapur",
          "IN"
        ],
        "availableLanguage": ["English", "Marathi", "Hindi"]
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://marketingsetu.com/#localbusiness",
      "name": "MarketingSetu",
      "alternateName": "MarketingSetu App | Smart Digital Business Card",
      "image": "https://marketingsetu.com/logo.svg",
      "logo": "https://marketingsetu.com/logo.svg",
      "url": "https://marketingsetu.com",
      "telephone": "+91-99999-99999",
      "email": "support@marketingsetu.com",
      "priceRange": "₹₹",
      "areaServed": [
        { "@type": "City", "name": "Pune" },
        { "@type": "City", "name": "Hinjawadi" },
        { "@type": "City", "name": "Satara" },
        { "@type": "City", "name": "Sangli" },
        { "@type": "City", "name": "Kolhapur" },
        { "@type": "AdministrativeArea", "name": "Maharashtra" },
        { "@type": "Country", "name": "India" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hinjawadi - Wakad Road, Hinjawadi",
        "addressLocality": "Pune",
        "addressRegion": "MH",
        "postalCode": "411057",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.5912,
        "longitude": 73.7389
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://marketingsetu.com/#website",
      "url": "https://marketingsetu.com",
      "name": "MarketingSetu",
      "alternateName": ["Marketing Setu", "MarketingSetu App"],
      "description": "WhatsApp Marketing, Custom Business Pages & Local SEO Automation for Indian Businesses",
      "publisher": {
        "@id": "https://marketingsetu.com/#organization"
      },
      "inLanguage": ["en-IN", "hi-IN", "mr-IN"]
    },
    {
      "@type": "ItemList",
      "@id": "https://marketingsetu.com/#sitelinks",
      "name": "MarketingSetu Navigation",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Pricing",
          "description": "Affordable plans starting at ₹3,499/year for businesses across Maharashtra.",
          "url": "https://marketingsetu.com/pricing"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "About Us",
          "description": "Serving thousands of businesses across industries in Maharashtra.",
          "url": "https://marketingsetu.com/about"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Services",
          "description": "WhatsApp automation, custom digital cards, and Google local SEO.",
          "url": "https://marketingsetu.com/services"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Contact",
          "description": "Let's talk about your business needs. Reach out to our team.",
          "url": "https://marketingsetu.com/contact"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Application",
          "description": "Powerful marketing tools for modern business. Download our Android app.",
          "url": "https://marketingsetu.com/download"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Reviews",
          "description": "Read real customer stories and reviews from local business owners.",
          "url": "https://marketingsetu.com/testimonials"
        }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://marketingsetu.com/#application",
      "name": "MarketingSetu App",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Android, Web",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "3499",
        "priceCurrency": "INR",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock"
      },
      "description": "Automated WhatsApp marketing, digital business cards, instant landing pages, and lead tracking software."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" expand={false} richColors />
      </body>
    </html>
  );
}
