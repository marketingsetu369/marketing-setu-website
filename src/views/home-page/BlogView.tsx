"use client";

import {
  CtaBand,
  PageHero,
  PageWrapper,
} from "@/views/home-page/component";
import { blogPosts, translations } from "@/views/home-page/data";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

export default function BlogView() {
  const { language } = useThemeStore();
  const t = translations[language] || translations.en;

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
            {blogPosts.map((post, index) => {
              const cardBody = (
                <div className="bg-paper text-primary border border-outline rounded-[24px] p-8 h-full flex flex-col justify-between shadow-card hover:shadow-z12 hover:-translate-y-1 transition-all duration-350">
                  <div className="space-y-4">
                    <div className="text-[10px] font-bold text-brand-main tracking-wider uppercase">
                      {post.date === "Coming soon" && language === "mr" ? "लवकरच येत आहे" : post.date === "Coming soon" && language === "hi" ? "जल्द आ रहा है" : post.date} · {post.category}
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
                  <div key={index} className="block cursor-default">
                    {cardBody}
                  </div>
                );
              }

              return (
                <Link key={index} href={post.href} className="block">
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

