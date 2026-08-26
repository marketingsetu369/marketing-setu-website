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
    default: "MarketingSetu — Digital Marketing, WhatsApp Automation & Business Pages in Maharashtra",
    template: "%s | MarketingSetu",
  },
  description:
    "MarketingSetu helps local businesses across Pune, Satara, Sangli, Kolhapur, and all over Maharashtra grow with WhatsApp marketing automation, custom business landing pages, Google Business setup, and local SEO. Plans from ₹1,999/year.",
  keywords: [
    "Digital Marketing Agency Maharashtra",
    "WhatsApp Marketing Pune",
    "Digital Marketing Satara",
    "Digital Marketing Sangli",
    "Digital Marketing Kolhapur",
    "Local SEO Maharashtra",
    "Local SEO Kolhapur",
    "Local SEO Satara",
    "Local SEO Sangli",
    "Business Landing Page Maker",
    "Auto SMS Followup",
    "Google Business Profile Setup",
    "MarketingSetu",
    "Small Business Marketing Maharashtra",
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
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "MarketingSetu",
    title: "MarketingSetu — WhatsApp Marketing & Local SEO Agency in Maharashtra",
    description:
      "Empower your local business in Pune, Satara, Sangli, Kolhapur & across Maharashtra with automated WhatsApp marketing, instant digital business pages, and Google local SEO ranking.",
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
    title: "MarketingSetu — WhatsApp Marketing & Local SEO Agency in Maharashtra",
    description:
      "Automated WhatsApp marketing, instant digital business pages, and Google local SEO ranking for businesses in Pune, Satara, Sangli, Kolhapur & Maharashtra.",
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
    "geo.placename": "Pune, Satara, Sangli, Kolhapur, Maharashtra, India",
    "geo.position": "18.5204;73.8567",
    "ICBM": "18.5204, 73.8567",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://marketingsetu.com/#organization",
      "name": "MarketingSetu",
      "url": "https://marketingsetu.com",
      "logo": "https://marketingsetu.com/logo.svg",
      "description": "Digital Marketing, WhatsApp Automation and Local SEO platform for businesses in Pune, Satara, Sangli, Kolhapur, Maharashtra and India.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "customer service",
        "areaServed": [
          "Maharashtra",
          "Pune",
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
      "image": "https://marketingsetu.com/logo.svg",
      "url": "https://marketingsetu.com",
      "telephone": "+91-9876543210",
      "priceRange": "₹₹",
      "areaServed": [
        { "@type": "City", "name": "Pune" },
        { "@type": "City", "name": "Satara" },
        { "@type": "City", "name": "Sangli" },
        { "@type": "City", "name": "Kolhapur" },
        { "@type": "AdministrativeArea", "name": "Maharashtra" },
        { "@type": "Country", "name": "India" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pune",
        "addressLocality": "Pune",
        "addressRegion": "MH",
        "postalCode": "411001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.5204,
        "longitude": 73.8567
      },
      "openingHoursSpecification": {
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
    },
    {
      "@type": "WebSite",
      "@id": "https://marketingsetu.com/#website",
      "url": "https://marketingsetu.com",
      "name": "MarketingSetu",
      "description": "WhatsApp Marketing, Custom Business Pages & Local SEO Automation for Indian Businesses",
      "publisher": {
        "@id": "https://marketingsetu.com/#organization"
      },
      "inLanguage": ["en-IN", "hi-IN", "mr-IN"]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://marketingsetu.com/#application",
      "name": "MarketingSetu",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Android, Web",
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
