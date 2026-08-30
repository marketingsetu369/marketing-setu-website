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
    default: "MarketingSetu – #1 Digital Business Card & WhatsApp Automation Platform India",
    template: "%s | MarketingSetu",
  },
  description:
    "MarketingSetu helps small businesses grow online with smart digital business cards, WhatsApp marketing automation, custom landing pages, Google Business map SEO, and daily cash flow ledger app in Pune, Satara, Maharashtra & India.",
  keywords: [
    "marketing setu",
    "marketingsetu",
    "digital business card India",
    "digital visiting card app Pune",
    "NFC business card Pune Satara",
    "WhatsApp marketing automation software India",
    "WhatsApp auto reply bot",
    "custom landing page builder Pune",
    "Google Business Profile local map SEO",
    "small business digital marketing Maharashtra",
    "business income expense ledger app",
    "online business promotion India",
    "Pune",
    "Hinjawadi",
    "Satara",
    "Sangli",
    "Kolhapur",
    "Maharashtra",
  ],
  authors: [{ name: "MarketingSetu Team", url: baseUrl }],
  creator: "MarketingSetu",
  publisher: "MarketingSetu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/?lang=hi",
      "mr-IN": "/?lang=mr",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "MarketingSetu",
    title: "MarketingSetu – #1 Digital Business Card & WhatsApp Automation Platform India",
    description:
      "MarketingSetu helps small businesses grow online with smart digital business cards, WhatsApp marketing automation, custom landing pages, Google Business map SEO, and daily cash flow ledger app.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MarketingSetu Digital Growth Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MarketingSetu – #1 Digital Business Card & WhatsApp Automation Platform India",
    description:
      "MarketingSetu helps small businesses grow online with smart digital business cards, WhatsApp marketing automation, custom landing pages, Google Business map SEO, and daily cash flow ledger app.",
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
    "geo.placename": "Hinjawadi, Pune, Satara, Sangli, Kolhapur, Maharashtra, India",
    "geo.position": "18.5912;73.7389",
    "ICBM": "18.5912, 73.7389",
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
        "telephone": "+91 9172415858",
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
      "telephone": "+91 9172415858",
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
      "@type": "FAQPage",
      "@id": "https://marketingsetu.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is MarketingSetu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "MarketingSetu is an all-in-one digital growth platform for small businesses that provides Smart Digital Business Cards, WhatsApp Auto Messaging, Custom Landing Pages, Google Map SEO, and Income Expense Ledger software."
          }
        },
        {
          "@type": "Question",
          "name": "How does MarketingSetu Digital Business Card work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "MarketingSetu creates a mobile-friendly digital business profile page with 1-tap contact saving, WhatsApp direct messages, photo gallery, products showcase, and Google map location directions in 15 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use WhatsApp Auto Reply for missed customer calls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! MarketingSetu automatically sends personalized WhatsApp messages and digital catalog links whenever a customer calls your business line."
          }
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
      <body className="bg-background text-primary antialiased selection:bg-brand-main selection:text-white min-h-screen">
        {children}
        <Toaster position="bottom-right" expand={false} richColors />
      </body>
    </html>
  );
}
