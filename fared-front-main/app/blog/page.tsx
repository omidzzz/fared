"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import CTAButton from "@/components/ui/CTAButton";

const DARK_BG = "#0a0520";
const DEEP_PURPLE = "#120b38";
const CARD_BG = "rgba(18,11,56,0.72)";
const BORDER = "rgba(120,80,220,0.28)";
const CREAM = "#f0eaff";
const TEXT_DIM = "#a090c8";
const GOLD = "#fecb7d";
const TEAL = "#7fd4dc";
const PURPLE_GLOW = "#9b5cf6";

const LATEST_ARTICLES = [
  {
    id: 1,
    title: "The Power of Inner Stillness",
    date: "May 18, 2024",
    readTime: "6 min read",
    image: "/images/hero-backgrounds/blog-hero.webp",
    slug: "inner-stillness",
  },
  {
    id: 2,
    title: "Crystals That Raise Your Vibration",
    date: "May 15, 2024",
    readTime: "5 min read",
    image: "/images/hero-backgrounds/blog-hero.webp",
    slug: "crystals-vibration",
  },
  {
    id: 3,
    title: "New Moon Rituals for Fresh Beginnings",
    date: "May 12, 2024",
    readTime: "7 min read",
    image: "/images/hero-backgrounds/blog-hero.webp",
    slug: "new-moon-rituals",
  },
  {
    id: 4,
    title: "How to Connect with Your Higher Self",
    date: "May 10, 2024",
    readTime: "8 min read",
    image: "/images/hero-backgrounds/blog-hero.webp",
    slug: "higher-self",
  },
];

const FEATURED = {
  title: "Remembering Who You Truly Are",
  excerpt:
    "A soul-deep journey into awakening your true essence and living in alignment with your highest truth.",
  image: "/images/hero-backgrounds/blog-hero.webp",
  author: "Luna Elise",
  authorAvatar: "/images/hero-backgrounds/blog-hero.webp",
  date: "May 20, 2024",
  readTime: "9 min read",
  slug: "remembering-who-you-are",
};

const DAILY_INSPIRATION =
  "You are the universe, expressing itself as a beautiful soul.";

const INSIGHTS = [
  {
    title: "Meditation",
    subtitle: "Find peace within the present moment",
    icon: "🧘",
  },
  {
    title: "Energy Healing",
    subtitle: "Balance your energy, transform your life",
    icon: "❄️",
  },
  {
    title: "Moon Wisdom",
    subtitle: "Align with lunar cycles and natural rhythms",
    icon: "🌙",
  },
];

export default function BlogV2Page() {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) return
    setSubLoading(true)
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      if (!res.ok) throw new Error('Failed')
      setSubscribed(true)
      toast.success('Subscribed successfully ✦')
      setEmail('')
    } catch {
      toast.error('Subscription failed. Try again.')
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <main dir="ltr" style={{ background: DARK_BG, minHeight: "100vh", position: "relative" }}>

      {/* Fixed full-screen background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero-backgrounds/blog-hero.webp"
          alt=""
          fill
          unoptimized
          priority
          className="object-cover object-top"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,5,32,0.25) 0%, rgba(10,5,32,0) 35%, rgba(10,5,32,0.7) 75%, rgba(10,5,32,1) 100%)",
        }} />
      </div>

      {/* Scrollable content layer */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Hero title block — overlaid on the upper portion of the background */}
        <section style={{ height: 420, position: "relative", display: "flex", alignItems: "flex-start", paddingTop: 96 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
            <div style={{ maxWidth: 620 }}>
              <h1 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(40px, 5vw, 68px)",
                fontWeight: 600,
                lineHeight: 1.05,
                marginBottom: 20,
              }}>
                <span style={{ color: "#c9a8f0" }}>Stories </span>
                <span style={{ fontStyle: "italic", color: CREAM }}>for the </span>
                <span style={{ color: TEAL }}>Soul</span>
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, opacity: 0.8 }}>
                <div style={{ height: 1, width: 70, background: "linear-gradient(to right, " + GOLD + ", transparent)" }} />
                <span style={{ color: GOLD, fontSize: 10, letterSpacing: 4 }}>◆◆◆</span>
              </div>
              <p style={{ color: CREAM, fontSize: 18, lineHeight: 1.6, maxWidth: 520, opacity: 0.9 }}>
                Explore wisdom, healing, and higher truths to uplift your spirit and illuminate your path.
              </p>
            </div>
          </div>
        </section>

      {/* ── THREE-COLUMN CONTENT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "-60px auto 0",
          padding: "0 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Latest Articles ── */}
        <div
          style={{
            background: CARD_BG,
            border: "1px solid " + BORDER,
            borderRadius: 16,
            padding: 20,
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span style={{ color: GOLD, fontSize: 12 }}>★</span>
            <span
              style={{
                color: GOLD,
                fontFamily: "Jost, sans-serif",
                fontSize: 12,
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              Latest Articles
            </span>
          </div>
          {LATEST_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={"/blog/" + article.slug}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(120,80,220,0.15)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "rgba(120,80,220,0.2)",
                  }}
                >
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: CREAM,
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </div>
                  <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 3 }}>
                    {article.date} · {article.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div style={{ marginTop: 16 }}>
            <CTAButton href="/blog" size="fullWidth">VIEW ALL ARTICLES</CTAButton>
          </div>
        </div>

        {/* ── CENTER: Featured Story ── */}
        <div
          style={{
            background: CARD_BG,
            border: "1px solid " + BORDER,
            borderRadius: 20,
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              padding: "16px 20px 0",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: GOLD }}>◇</span>
            <span
              style={{
                color: GOLD,
                fontFamily: "Jost, sans-serif",
                fontSize: 12,
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              Featured Story
            </span>
          </div>
          <div style={{ position: "relative", height: 320, background: "linear-gradient(135deg, rgba(120,80,220,0.4), rgba(60,30,120,0.6))" }}>
            <Image
              src={FEATURED.image}
              alt=""
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: PURPLE_GLOW,
                color: "#fff",
                fontFamily: "Jost, sans-serif",
                fontSize: 11,
                borderRadius: 20,
                padding: "4px 12px",
              }}
            >
              ★ FEATURED
            </div>
          </div>
          <div style={{ padding: "16px 20px 20px" }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                color: CREAM,
                fontSize: 22,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {FEATURED.title}
            </h2>
            <p
              style={{
                color: TEXT_DIM,
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              {FEATURED.excerpt}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    position: "relative",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "rgba(120,80,220,0.3)",
                  }}
                >
                  <Image
                    src={FEATURED.authorAvatar}
                    alt=""
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <div style={{ color: CREAM, fontSize: 13 }}>
                    {FEATURED.author}
                  </div>
                  <div style={{ color: TEXT_DIM, fontSize: 12 }}>
                    {FEATURED.date} · {FEATURED.readTime}
                  </div>
                </div>
              </div>
              <CTAButton href={"/blog/" + FEATURED.slug} size="small">READ STORY</CTAButton>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Spiritual Insights + Daily Inspiration ── */}
        <div>
          {/* Spiritual Insights */}
          <div
            style={{
              background: CARD_BG,
              border: "1px solid " + BORDER,
              borderRadius: 16,
              padding: 20,
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span style={{ color: TEAL, fontSize: 14 }}>○</span>
              <span
                style={{
                  color: GOLD,
                  fontFamily: "Jost, sans-serif",
                  fontSize: 12,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                Spiritual Insights
              </span>
            </div>
            {INSIGHTS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(120,80,220,0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(120,80,220,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{ color: CREAM, fontSize: 14, fontWeight: 500 }}
                    >
                      {item.title}
                    </div>
                    <div style={{ color: TEXT_DIM, fontSize: 12 }}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <span style={{ color: TEXT_DIM, fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>

          {/* Daily Inspiration */}
          <div
            style={{
              background: CARD_BG,
              border: "1px solid " + BORDER,
              borderRadius: 16,
              padding: 20,
              backdropFilter: "blur(10px)",
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span style={{ color: GOLD, fontSize: 12 }}>✦</span>
              <span
                style={{
                  color: GOLD,
                  fontFamily: "Jost, sans-serif",
                  fontSize: 12,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                Daily Inspiration
              </span>
            </div>
            <p
              style={{
                color: CREAM,
                fontFamily: '"Playfair Display", serif',
                fontSize: 15,
                fontStyle: "italic",
                lineHeight: 1.7,
                textAlign: "center",
                padding: "0 8px",
              }}
            >
              &ldquo;{DAILY_INSPIRATION}&rdquo;
            </p>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <span style={{ color: PURPLE_GLOW, fontSize: 18 }}>♥</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER BANNER ── */}
      <section
        style={{
          background:
            "linear-gradient(90deg, rgba(30,10,80,0.9) 0%, rgba(15,8,50,0.95) 100%)",
          border: "1px solid rgba(100,60,200,0.3)",
          borderRadius: 20,
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          maxWidth: 1152,
          margin: "40px auto 60px",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          💜
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: '"Playfair Display", serif',
              color: CREAM,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Stay Connected with the Light
          </div>
          <div style={{ color: TEXT_DIM, fontSize: 13, marginTop: 4 }}>
            Receive soulful insights and spiritual guidance straight to your
            inbox.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(120,80,220,0.35)",
              borderRadius: 10,
              color: CREAM,
              padding: "10px 16px",
              fontSize: 14,
              width: 240,
              outline: "none",
            }}
          />
          <CTAButton size="small" onClick={handleSubscribe} disabled={subLoading || subscribed}>
                {subLoading ? 'SUBSCRIBING...' : subscribed ? '✓ SUBSCRIBED' : 'SUBSCRIBE ✦'}
              </CTAButton>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
