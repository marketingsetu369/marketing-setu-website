"use client";

import {
  CtaBand,
  PageHero,
  PageWrapper,
} from "@/views/home-page/component";
import { getBlogPosts, translations, BlogPost } from "@/views/home-page/data";
import { ApiBlogPost, formatBlogDate } from "@/api/repositories/blogApi";
import Link from "next/link";
import Image from "next/image";
import { useThemeStore } from "@/store/themeStore";

interface BlogViewProps {
  /** Live posts fetched server-side from the API */
  apiPosts?: ApiBlogPost[];
}

export default function BlogView({ apiPosts = [] }: BlogViewProps) {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  // Static fallback posts (hardcoded)
  const staticPosts: BlogPost[] = getBlogPosts(t);

  // Build a unified card list: API posts first, then static fallback posts
  // If API returned posts, show them at the top and hide the "Coming soon" static ones
  const hasApiPosts = apiPosts.length > 0;

  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel={t.blog_hero_breadcrumb}
        eyebrow={t.blog_hero_eyebrow}
        title={t.blog_hero_title}
        lead={t.blog_hero_lead}
      />

      {/* BLOG GRID */}
      <section className="py-16 md:py-24 bg-background border-b border-outline">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">

            {/* ── Live API posts ── */}
            {hasApiPosts &&
              apiPosts.map((post: ApiBlogPost) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="bg-paper text-primary border border-outline rounded-[24px] overflow-hidden h-full flex flex-col shadow-card hover:shadow-z12 hover:-translate-y-1 transition-all duration-350">
                    {/* Thumbnail */}
                    {post.imageUrl ? (
                      <div className="relative w-full h-48 bg-surface overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-brand-purple/10 to-brand-green/10 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}

                    <div className="p-8 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-3">
                        <div className="text-[10px] font-bold text-brand-main tracking-wider uppercase flex items-center gap-2">
                          <span>{formatBlogDate(post.createdAt)}</span>
                          {post.tags && (
                            <>
                              <span>·</span>
                              <span>{post.tags}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-primary leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm text-secondary leading-relaxed font-normal line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-brand-main group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

            {/* ── Static / fallback posts ── */}
            {staticPosts.map((post: BlogPost, index: number) => {
              const cardBody = (
                <div className="bg-paper text-primary border border-outline rounded-[24px] p-8 h-full flex flex-col justify-between shadow-card hover:shadow-z12 hover:-translate-y-1 transition-all duration-350">
                  <div className="space-y-4">
                    <div className="text-[10px] font-bold text-brand-main tracking-wider uppercase">
                      {post.date} · {post.category}
                    </div>
                    <h3 className="text-xl font-bold text-primary leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed font-normal">
                      {post.description}
                    </p>
                  </div>
                </div>
              );

              if (post.href === "#") {
                return (
                  <div key={`static-${index}`} className="block cursor-default opacity-60">
                    {cardBody}
                  </div>
                );
              }

              return (
                <Link key={`static-${index}`} href={post.href} className="block">
                  {cardBody}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <CtaBand
        heading={t.blog_cta_heading}
        description={t.blog_cta_description}
        whatsappMessage="Hi MarketingSetu! Please share marketing tips relevant to my business."
      />
    </PageWrapper>
  );
}
