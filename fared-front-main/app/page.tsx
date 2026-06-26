"use client";

import { HeroShimmer } from "@/components/ui/HeroShimmer";
import CTAButton from "@/components/ui/CTAButton";
import FeatureBadges from "@/components/home/FeatureBadges";
import { BestSellersSection } from "@/components/home/BestSellersSection";
import QuoteOfTheDay from "@/components/home/QuoteOfTheDay";
import Footer from "@/components/layout/Footer";
import {
  MOCK_STONES,
  MOCK_CANDLES,
  MOCK_ACCESSORIES,
  MOCK_CLOTHES,
} from "@/lib/mock-data";
import Image from "next/image";


const SECTIONS = [
  {
    title: "منتخب کریستال‌های انرژی",
    subtitle: "هر کریستال، داستانی از زمین و نوری از کیهان است",
    products: MOCK_STONES.slice(0, 4) as any[],
    viewAllHref: "/shop/stones",
    viewAllLabel: "مشاهده همه سنگ‌ها",
  },
  {
    title: "شمع‌های آیینی",
    subtitle: "هر شمع، نوری برای روشن‌کردن مسیر درون",
    products: MOCK_CANDLES.slice(0, 4) as any[],
    viewAllHref: "/shop/candles",
    viewAllLabel: "مشاهده همه شمع‌ها",
  },
  {
    title: "اکسسوری‌های انرژی",
    subtitle: "زیورآلاتی که انرژی و زیبایی را در هم می‌آمیزند",
    products: MOCK_ACCESSORIES.slice(0, 4) as any[],
    viewAllHref: "/shop/accessories",
    viewAllLabel: "مشاهده همه اکسسوری‌ها",
  },
  {
    title: "پوشاک آیینی",
    subtitle: "لباس‌هایی که با روح شما هماهنگ می‌شوند",
    products: MOCK_CLOTHES.slice(0, 4) as any[],
    viewAllHref: "/shop/clothes",
    viewAllLabel: "مشاهده همه پوشاک",
  },
];

// ── Divider component using Tailwind classes ──
const Divider = () => (
  <div className="flex items-center gap-3 px-6 sm:px-10 lg:px-14 w-full">
    <div className="flex-1 h-px bg-gold/10" />
    <span className="text-gold/20 text-xs">✦</span>
    <div className="flex-1 h-px bg-gold/10" />
  </div>
);

export default function Home() {
  return (
    // ── Top‑level wrapper to prevent horizontal overflow ──
    <div className="w-full max-w-full overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section
        className="pt-10 relative sm:pt-0 relative"
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
        }}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-backgrounds/home-page-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 42%",
            }}
          />
        </div>
        <HeroShimmer />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(7,7,20,0.65) 0%, rgba(7,7,20,0.40) 45%, rgba(7,7,20,0.05) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(88,42,107,0.20) 0%, transparent 70%)",
          }}
        />

        {/* Hero text */}
        <div className="relative z-10 flex items-center flex-1 px-4 sm:px-8 lg:px-0">
          <section className="flex items-center w-full" dir="ltr">
            <div
              className="flex flex-col justify-center items-center lg:items-start lg:pr-16 xl:pr-24 w-full lg:w-1/2 lg:pl-8 text-center lg:text-right mt-20 sm:mt-24 lg:mt-0"
              dir="rtl"
            >
              <h1
                className="font-farsi font-bold leading-snug mb-4 mt-4 lg:mt-0"
                style={{
                  fontSize: "clamp(2rem, 6vw, 5.5rem)",
                  background:
                    "linear-gradient(140deg, #FECB7D 0%, #f5dfa0 40%, #f0ebe3 65%, #FECB7D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                انرژی کیهان
                <br className="hidden md:inline" /> در دستان توست
              </h1>
              <div
                className="flex items-center justify-center lg:justify-start gap-2 mb-4 opacity-70"
                style={{ direction: "ltr" }}
              >
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(to right, rgba(254,203,125,0.8), transparent)",
                  }}
                />
                <svg width={80} height={14} viewBox="0 0 80 14" fill="none">
                  <path
                    d="M0 7 Q10 0 20 7 Q30 14 40 7 Q50 0 60 7 Q70 14 80 7"
                    stroke="#FECB7D"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                  <circle cx={40} cy={7} r={2.5} fill="#FECB7D" opacity="0.9" />
                  <circle cx={10} cy={6} r={1.2} fill="#FECB7D" opacity="0.5" />
                  <circle cx={70} cy={6} r={1.2} fill="#FECB7D" opacity="0.5" />
                </svg>
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background:
                      "linear-gradient(to left, rgba(254,203,125,0.8), transparent)",
                  }}
                />
              </div>
              <p
                className="font-farsi text-[--text-secondary] leading-relaxed mb-8 mx-auto lg:mx-0"
                style={{
                  fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                  maxWidth: 420,
                }}
              >
                کریستال‌های طبیعی ما کانال‌هایی از انرژی خالص هستند که به تعادل،
                آرامش و موفقیت درون شما کمک می‌کنند.
              </p>
              <CTAButton href="/shop">✦ اکنون کشف کن</CTAButton>
            </div>
          </section>
        </div>

        {/* ── Feature badges – fixed ── */}
        <div
          className="relative z-10 px-0 sm:px-6 lg:px-10"
          style={{ marginTop: 80, marginBottom: -60 }}
        >
          <div className="relative z-10 mt-12 sm:mt-0">
            <FeatureBadges />
          </div>
        </div>
      </section>

      {/* ── REST OF PAGE ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #490070 0%, #5d0c99 16.7%, #7822ce 33.3%, #8f30f6 50%, #9d29fb 66.7%, #9b14db 83.3%, #8b02a6 100%)",
        }}
        className="relative z-1 pt-20 pb-10"
      >
        <QuoteOfTheDay />

        {SECTIONS.map((section, i) => (
          <div key={section.viewAllHref}>
            {i > 0 && <Divider />}
            <section className="py-6 sm:py-8">
              <div className="text-center mb-6 sm:mb-8 px-4" dir="rtl">
                <div className="flex items-center justify-center gap-[14px] sm:gap-[18px] mb-3">
                  <span
                    style={{
                      color: "var(--gold-accent)",
                      fontSize: 16,
                      letterSpacing: 4,
                      filter: "drop-shadow(0 0 7px rgba(231,193,111,0.7))",
                    }}
                  >
                    ❖
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--fa)",
                      fontSize: "clamp(1.25rem, 4vw, 2.063rem)",
                      fontWeight: 700,
                      color: "var(--gold-accent)",
                      textShadow: "0 0 16px rgba(231,193,111,0.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {section.title}
                  </h2>
                  <span
                    style={{
                      color: "var(--gold-accent)",
                      fontSize: 16,
                      letterSpacing: 4,
                      filter: "drop-shadow(0 0 7px rgba(231,193,111,0.7))",
                    }}
                  >
                    ❖
                  </span>
                </div>
                <p
                  className="font-farsi"
                  style={{
                    fontWeight: 300,
                    color: "rgba(255,248,238,0.82)",
                    marginTop: 13,
                    fontSize: "clamp(0.85rem, 2vw, 1.063rem)",
                  }}
                >
                  {section.subtitle}
                </p>
              </div>

              <BestSellersSection
                title={section.title}
                subtitle={section.subtitle}
                products={section.products}
                viewAllHref={section.viewAllHref}
                viewAllLabel={section.viewAllLabel}
              />
            </section>
          </div>
        ))}

        <div className="flex justify-center px-4" style={{ marginTop: 42 }}>
          <CTAButton href="/shop" size="large">
            ✦ VIEW ALL ✦
          </CTAButton>
        </div>
      </div>

      <Footer />
    </div>
  );
}
