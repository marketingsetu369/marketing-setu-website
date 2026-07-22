"use client";

import {
  CtaBand,
  PageHero,
  PageWrapper,
  ProseSection,
} from "@/views/home-page/component";
import { blogPosts } from "@/views/home-page/data";
import Link from "next/link";

export default function BlogView() {
  return (
    <PageWrapper>
      {/* PAGE HERO */}
      <PageHero
        breadcrumbLabel="Blog"
        eyebrow="MarketingSetu Blog"
        title="Practical marketing advice for Indian small businesses"
        lead="Straightforward guides on WhatsApp marketing, local SEO, and growing your business online — no jargon, just what works."
      />

      {/* BLOG GRID */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {blogPosts.map((post, index) => {
              const cardBody = (
                <div className="body">
                  <div className="meta">{post.date} · {post.category}</div>
                  <h3 style={{ fontSize: "19px" }}>{post.title}</h3>
                  <p style={{ fontSize: "14.5px" }}>{post.description}</p>
                </div>
              );

              if (post.href === "#") {
                return (
                  <div key={index} className="blog-card reveal" style={{ display: "block", cursor: "default" }}>
                    {cardBody}
                  </div>
                );
              }

              return (
                <Link key={index} href={post.href} className="blog-card reveal animate-hover" style={{ display: "block" }}>
                  {cardBody}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <CtaBand
        heading="Want marketing tips sent straight to WhatsApp?"
        description="Message us and we'll share practical tips relevant to your specific business type."
        whatsappMessage="Hi MarketingSetu! Please share marketing tips relevant to my business."
      />
    </PageWrapper>
  );
}
