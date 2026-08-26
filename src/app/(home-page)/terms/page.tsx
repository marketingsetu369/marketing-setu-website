import TermsView from "@/views/home-page/TermsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — MarketingSetu",
  description:
    "Read the terms and conditions for using MarketingSetu's website, marketing software, and business growth services.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <TermsView />;
}
