import { fetchBlogBySlug, fetchPublishedBlogs, formatBlogDate } from "@/api/repositories/blogApi";
import { PageWrapper } from "@/views/home-page/component";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) return { title: "Blog | MarketingSetu" };

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchPublishedBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) return notFound();

  return (
    <PageWrapper>
      <article className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-main transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-primary font-medium truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Category + Date */}
        <div className="text-[11px] font-bold text-brand-main tracking-widest uppercase mb-4 flex items-center gap-2">
          {post.tags && <span>{post.tags}</span>}
          {post.tags && <span>·</span>}
          <span>{formatBlogDate(post.createdAt)}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-secondary leading-relaxed mb-8 font-normal">
          {post.summary}
        </p>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-[20px] overflow-hidden mb-10 border border-outline">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral max-w-none text-primary leading-relaxed space-y-4">
          {post.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className="text-base text-secondary leading-7">
                {paragraph}
              </p>
            ) : null
          )}
        </div>

        {/* Author */}
        {post.authorName && (
          <div className="mt-12 pt-8 border-t border-outline">
            <p className="text-sm text-disabled">
              Written by{" "}
              <span className="font-semibold text-primary">{post.authorName}</span>
              {" · "}
              <span>{formatBlogDate(post.createdAt)}</span>
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-main hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </PageWrapper>
  );
}
