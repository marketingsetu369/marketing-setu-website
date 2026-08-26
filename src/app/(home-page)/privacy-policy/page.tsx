import PrivacyPolicyView from "@/views/home-page/PrivacyPolicyView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — MarketingSetu",
  description:
    "Read the MarketingSetu privacy policy. Learn how we collect, handle, and safeguard your personal information and business data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PrivacyPolicyView />;
}
