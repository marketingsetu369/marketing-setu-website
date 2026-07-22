// Formats a URL slug back to a capitalized business name string
export const formatBusinessName = (slug: string, fallbackName?: string): string => {
  if (fallbackName) return fallbackName;
  try {
    return decodeURIComponent(slug)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } catch {
    return slug;
  }
};
