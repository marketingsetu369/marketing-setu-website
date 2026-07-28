import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MarketingSetu — WhatsApp Marketing & Digital Marketing Agency in Pune",
  description: "MarketingSetu is a Pune-based digital marketing agency helping Indian small businesses grow with WhatsApp marketing, auto SMS, landing pages and Google Business setup. Plans from ₹1,999/year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        {children}
        <Toaster position="bottom-right" expand={false} richColors />
      </body>
    </html>
  );
}
