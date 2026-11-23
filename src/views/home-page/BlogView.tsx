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
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Book02Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

interface BlogViewProps {
  /** Live posts fetched server-side from the API */
  apiPosts?: ApiBlogPost[];
}

export default function BlogView({ apiPosts = [] }: BlogViewProps) {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

  // Static fallback posts (hardcoded)
  const staticPosts: BlogPost[] = getBlogPosts(t);

  const hasApiPosts = apiPosts.length > 0;

  return (
    <PageWrapper>
      {/* PAGE HERO (Centered with Brand Secondary Accents) */}
      <PageHero
        breadcrumbLabel="Blog"
        eyebrow="TUTORIALS & GUIDES • PAN INDIA"
        center
        title={
          <>
            Actionable Guides to <span className="text-brand-secondary">Grow Your Business</span>
          </>
        }
        lead={
          <>
            Practical strategies, WhatsApp automation tips, and local marketing guides designed specifically for{" "}
            <span className="text-brand-secondary font-medium">small businesses across India</span>.
          </>
        }
      />

      {/* BLOG GRID */}
      <section className="py-12 md:py-14 bg-background border-t border-outline/40">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">

            {/* ── Live API posts ── */}
            {hasApiPosts &&
              apiPosts.map((post: ApiBlogPost) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group h-full"
                >
                  <div className="bg-paper border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-main dark:hover:border-brand-secondary rounded-[22px] overflow-hidden h-full flex flex-col justify-between shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                    <div>
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
                        <div className="w-full h-44 bg-brand-light flex items-center justify-center text-brand-main dark:text-brand-secondary">
                          <HugeiconsIcon icon={Book02Icon} size={40} />
                        </div>
                      )}

                      <div className="p-6 sm:p-7 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-brand-secondary bg-brand-light border border-brand-secondary/20 uppercase tracking-wider">
                            {post.tags || "Growth Guide"}
                          </span>
                          <span className="text-[11px] text-secondary flex items-center gap-1 font-medium">
                            <HugeiconsIcon icon={Calendar01Icon} size={12} />
                            {formatBlogDate(post.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-primary group-hover:text-brand-main transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-secondary leading-relaxed font-normal line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-outline/30 flex items-center justify-between text-xs font-bold text-primary group-hover:text-brand-secondary transition-colors">
                      <span>Read Full Guide</span>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}

            {/* ── Static / fallback posts ── */}
            {staticPosts.map((post: BlogPost, index: number) => {
              const isComingSoon = post.href === "#";
              const cardContent = (
                <div className={`bg-paper border-2 border-dashed border-gray-300 dark:border-gray-700 ${!isComingSoon ? "hover:border-brand-main dark:hover:border-brand-secondary hover:shadow-card hover:-translate-y-1" : "opacity-75"} rounded-[22px] p-6 sm:p-7 h-full flex flex-col justify-between shadow-xs transition-all duration-300`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-brand-secondary bg-brand-light border border-brand-secondary/20 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-secondary flex items-center gap-1 font-medium">
                        <HugeiconsIcon icon={Calendar01Icon} size={12} />
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary leading-snug group-hover:text-brand-main transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-secondary leading-relaxed font-normal">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-outline/30 flex items-center justify-between text-xs font-bold">
                    {isComingSoon ? (
                      <span className="text-secondary italic">Coming Soon</span>
                    ) : (
                      <>
                        <span className="text-primary group-hover:text-brand-secondary transition-colors">Read Full Guide</span>
                        <HugeiconsIcon icon={ArrowRight01Icon} size={15} className="text-primary group-hover:text-brand-secondary group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </div>
              );

              if (isComingSoon) {
                return (
                  <div key={`static-${index}`} className="block cursor-default">
                    {cardContent}
                  </div>
                );
              }

              return (
                <Link key={`static-${index}`} href={post.href} className="block group h-full">
                  {cardContent}
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
