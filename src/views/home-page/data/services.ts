import { ServiceBlockItem } from "../component/ServiceBlock";
import { TranslationDictionary } from "@/translation";

export function getServicesData(t: TranslationDictionary): ServiceBlockItem[] {
  return [
    {
      id: "digital-business-card",
      icon: "🪪",
      badge: "LOCAL DIGITAL IDENTITY",
      title: "Smart Digital Business Page & Google Search Presence",
      lead: "Help customers discover your store instantly on Google and WhatsApp across India. Showcase your products, pricing, photos, and verified shop location on Google Maps with 1-tap call and directions.",
      features: [
        "1-Tap call, WhatsApp chat, and Google Map shop directions",
        "Interactive product & services catalog with local pricing",
        "Optimized for local city searches across India",
        "Custom shareable link and counter QR code for WhatsApp & Instagram",
      ],
      imageUrl: "",
      imageAlt: "Smart Digital Business Page India — MarketingSetu",
    },
    {
      id: "whatsapp-marketing",
      icon: "⚡",
      badge: "WHATSAPP AUTOMATION",
      title: "WhatsApp Missed-Call & Customer Follow-Up Engine",
      lead: "Never lose a customer call during busy shop hours. When a client calls your business phone, MarketingSetu automatically sends your digital greeting, product catalog, and booking link on WhatsApp in seconds.",
      features: [
        "Automatic WhatsApp greeting sent on every missed customer call",
        "Instant delivery of your digital card link and shop catalog",
        "Connects directly with your official WhatsApp mobile number",
        "Convert daily customer phone enquiries into confirmed store sales",
      ],
      imageUrl: "",
      imageAlt: "WhatsApp Auto Messaging India — MarketingSetu",
      reversed: true,
    },
    {
      id: "poster-maker",
      icon: "🎨",
      badge: "DAILY SOCIAL MARKETING",
      title: "Daily Festival Poster & Offer Banner Maker",
      lead: "Build strong brand recall among local customers across India. Download ready festival greetings and sales offer posters automatically branded with your shop logo, business name, phone, and address.",
      features: [
        "Readymade templates for all Indian national & regional festivals",
        "Auto-branding with your shop logo, mobile number & address",
        "1-Click sharing directly to WhatsApp Status and Instagram",
        "Keep your local customers engaged daily without a graphic designer",
      ],
      imageUrl: "",
      imageAlt: "Festival Poster Maker India — MarketingSetu",
    },
    {
      id: "enquiries-manager",
      icon: "📊",
      badge: "LEAD TRACKER & CRM",
      title: "Customer Inquiries & Local Engagement Tracker",
      lead: "Track every customer lead and phone interaction in real time. Know exactly how many nearby customers visited your business page, clicked to call, or sent a WhatsApp message each day.",
      features: [
        "Real-time alerts for customer inquiries from your business page",
        "Monitor page views, call clicks, and WhatsApp chat taps",
        "1-Tap direct WhatsApp and phone call follow-up with leads",
        "Organized customer database for festival broadcasts and sales",
      ],
      imageUrl: "",
      imageAlt: "Enquiry Manager India — MarketingSetu",
      reversed: true,
    },
    {
      id: "advance-bookings",
      icon: "📅",
      badge: "BOOKINGS & APPOINTMENTS",
      title: "Advance Client Bookings & Follow-up Reminders",
      lead: "Ideal for clinics, salons, repair shops, and local service professionals across India. Manage appointment time slots, track client advance payments, and set task reminders on your phone.",
      features: [
        "Manage daily appointment slots and customer booking calendar",
        "Record customer advance payments and pending balance dues",
        "Set custom phone alarm reminders for orders and client tasks",
        "Reduce missed client visits with timely scheduling",
      ],
      imageUrl: "",
      imageAlt: "Advance Bookings & Reminders India — MarketingSetu",
    },
    {
      id: "income-expense-log",
      icon: "📒",
      badge: "DAILY KHATA & PASSBOOK",
      title: "Daily Income & Expense Khata (Business Passbook)",
      lead: "Take total control of your business cashflow. Record every Cash, UPI, and bank transaction in seconds, and track your true monthly profit without expensive accounting software.",
      features: [
        "Log daily cash, Google Pay, PhonePe & UPI payments in seconds",
        "Track customer balances and pending credit (Udhar Khata)",
        "Instant monthly profit and loss summary on your mobile screen",
        "Download clean PDF statements for tax, CA, and loan applications",
      ],
      imageUrl: "",
      imageAlt: "Daily Passbook India — MarketingSetu",
      reversed: true,
    },
  ];
}

export const servicesData: ServiceBlockItem[] = getServicesData({} as any);
