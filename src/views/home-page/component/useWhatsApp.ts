import { WA_NUMBER, WA_DEFAULT_MSG } from "@/views/home-page/data/constants";

export function useWhatsApp() {
  const openWhatsApp = (message?: string) => {
    const msg = message ?? WA_DEFAULT_MSG;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return { openWhatsApp, WA_NUMBER };
}
