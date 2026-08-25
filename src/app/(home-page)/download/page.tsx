import DownloadView from "@/views/home-page/DownloadView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download MarketingSetu App | Automatic WhatsApp Missed-Call Marketing",
  description:
    "Download the official MarketingSetu Android app to automate your business customer follow-ups on missed calls, manage business inquiries, and grow your sales on autopilot.",
};

export default function DownloadPage() {
  return <DownloadView />;
}
