/** Returns a usable image src: ensures backend /uploads/ paths, objects, or string URLs resolve cleanly */
export function getImageUrl(input?: any): string {
  if (!input) return "";

  // If an object was passed, extract the URL string
  let rawUrl = "";
  if (typeof input === "string") {
    rawUrl = input;
  } else if (typeof input === "object") {
    rawUrl =
      input.url ||
      input.imageUrl ||
      input.image_url ||
      input.secure_url ||
      input.src ||
      input.path ||
      input.uri ||
      input.image ||
      input.avatar ||
      input.photo ||
      input.filename ||
      "";
  }

  if (!rawUrl || typeof rawUrl !== "string") return "";

  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed === "[object Object]") return "";

  const apiUrl = (
    process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com"
  ).replace(/\/$/, "");

  // If it's a relative path starting with /uploads
  if (trimmed.startsWith("/uploads/")) {
    return `${apiUrl}${trimmed}`;
  }

  // If it contains /uploads/ (from localhost, emulator 10.0.2.2, 127.0.0.1, or prod)
  const match = trimmed.match(/\/uploads\/(.+)$/);
  if (match && match[1]) {
    if (
      trimmed.includes("localhost") ||
      trimmed.includes("10.0.2.2") ||
      trimmed.includes("127.0.0.1") ||
      trimmed.startsWith("/")
    ) {
      return `${apiUrl}/uploads/${match[1]}`;
    }
    return trimmed;
  }

  // External HTTP/HTTPS URLs (e.g. S3, Cloudinary, etc.)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (
      trimmed.includes("localhost") ||
      trimmed.includes("10.0.2.2") ||
      trimmed.includes("127.0.0.1")
    ) {
      const uMatch = trimmed.match(/\/uploads\/(.+)$/);
      if (uMatch && uMatch[1]) {
        return `${apiUrl}/uploads/${uMatch[1]}`;
      }
    }
    return trimmed.replace(/^http:\/\//, "https://");
  }

  // If it's a bare filename or relative path (e.g. "174000-image.jpg" or "user/photo.jpg")
  if (!trimmed.startsWith("http") && !trimmed.startsWith("/")) {
    return `${apiUrl}/uploads/${trimmed}`;
  }

  return trimmed;
}

/** Ensures a social handle / partial URL becomes a full https:// URL */
export function formatSocialLink(
  url: string,
  platform: "instagram" | "facebook" | "youtube" | "twitter" | "x"
): string {
  if (!url) return "";
  let cleanUrl = url.trim();
  if (cleanUrl.startsWith("@")) {
    cleanUrl = cleanUrl.substring(1);
  }
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }
  if (cleanUrl.includes(".") || cleanUrl.includes("/")) {
    return `https://${cleanUrl}`;
  }
  const baseUrls: Record<string, string> = {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    twitter: "https://twitter.com/",
    x: "https://x.com/",
  };
  return `${baseUrls[platform] || "https://"}${cleanUrl}`;
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
    if (cleanUrl.length === 11 && !cleanUrl.includes("/")) {
      return cleanUrl;
    }
  } catch {
    return null;
  }
  return null;
}

/** Formats date into readable string */
export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/** Section background styles helper */
export function getSectionStyle(sectionKey: string, _visibleStates?: boolean[]): string {
  const isAlt = ["products", "testimonials", "location"].includes(sectionKey);
  return isAlt ? "bg-[#F8F9FD] dark:bg-slate-900/40 py-10 px-6" : "bg-white dark:bg-slate-900 py-10 px-6";
}
