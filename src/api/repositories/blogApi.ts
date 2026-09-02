const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com";
const BASE_URL = `${API_ORIGIN.replace(/\/$/, "")}/api/v1`;

export interface ApiBlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl?: string;
  authorId?: string;
  authorName?: string;
  status: "published" | "draft";
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogApiResponse {
  success: boolean;
  message: string;
  data: ApiBlogPost[];
}

export async function fetchPublishedBlogs(): Promise<ApiBlogPost[]> {
  try {
    const res = await fetch(`${BASE_URL}/blogs`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) return [];

    const json: BlogApiResponse = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    // Return only published posts
    return json.data.filter((p) => p.status === "published");
  } catch {
    return [];
  }
}

/** Fetch a single blog post by slug (filters from the list endpoint) */
export async function fetchBlogBySlug(slug: string): Promise<ApiBlogPost | null> {
  const posts = await fetchPublishedBlogs();
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Format ISO date string to readable e.g. "02 Sep 2026" */
export function formatBlogDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
