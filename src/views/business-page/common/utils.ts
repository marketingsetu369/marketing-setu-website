/** Returns a usable image src: proxies local uploads through /uploads/, passes absolute external URLs as-is */
export function getImageUrl(url?: string): string {
  if (!url) return "";
  const match = url.match(/\/uploads\/(.+)$/);
  if (match && match[1]) return `/uploads/${match[1]}`;
  if (
    url.startsWith("http") &&
    !url.includes("localhost") &&
    !url.includes("10.0.2.2") &&
    !url.includes("127.0.0.1")
  ) {
    return url;
  }
  return url;
}

/** Ensures a social handle / partial URL becomes a full https:// URL */
export function formatSocialLink(
  url: string,
  platform: "instagram" | "facebook" | "youtube" | "twitter"
): string {
  if (!url) return "";
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://"))
    return cleanUrl;
  if (cleanUrl.includes(".") || cleanUrl.includes("/"))
    return `https://${cleanUrl}`;
  const baseUrls = {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    twitter: "https://twitter.com/",
  };
  return `${baseUrls[platform]}${cleanUrl}`;
}

/** Extracts an 11-character YouTube video ID from any supported URL format */
export function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const cleanUrl = url.trim();
    if (cleanUrl.includes("youtu.be/")) {
      const parts = cleanUrl.split("youtu.be/");
      if (parts[1]) {
        const id = parts[1].split(/[?#]/)[0];
        if (id.length === 11) return id;
      }
    }
    const paths = ["/shorts/", "/live/", "/embed/", "/v/"];
    for (const path of paths) {
      if (cleanUrl.includes(path)) {
        const parts = cleanUrl.split(path);
        if (parts[1]) {
          const id = parts[1].split(/[?#&]/)[0];
          if (id.length === 11) return id;
        }
      }
    }
    if (cleanUrl.includes("watch?v=")) {
      const parts = cleanUrl.split("watch?v=");
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id.length === 11) return id;
      }
    }
    const urlObj = new URL(cleanUrl);
    const v = urlObj.searchParams.get("v");
    if (v && v.length === 11) return v;
  } catch {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) return match[2];
  }
  return null;
}

/** Returns a Tailwind bg + padding class for each visible section key */
export function getSectionStyle(
  sectionKey: string,
  visibleStates: boolean[]
): string {
  const keys = [
    "stats",
    "video",
    "products",
    "testimonials",
    "gallery",
    "social",
    "enquiry",
    "location",
  ];
  const activeKeys = keys.filter((_, idx) => visibleStates[idx]);
  const index = activeKeys.indexOf(sectionKey);
  if (index === -1) return "bg-white py-12 px-6";

  const bgClass = ["products", "testimonials", "location"].includes(sectionKey)
    ? "bg-[var(--color-grey-100)]"
    : sectionKey === "enquiry"
    ? "bg-white"
    : activeKeys.indexOf("products") !== -1
    ? Math.abs(index - activeKeys.indexOf("products")) % 2 === 0
      ? "bg-[var(--color-grey-100)]"
      : "bg-white"
    : index % 2 !== 0
    ? "bg-[var(--color-grey-100)]"
    : "bg-white";

  return `${bgClass} py-10 px-6`;
}
