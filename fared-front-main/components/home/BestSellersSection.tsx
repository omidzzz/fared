"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useRef, useCallback } from "react";

// ==================== SHARED PRODUCT CARD (Outside) ====================
const ProductCard = ({
  product,
  viewAllHref,
  addItem,
}: {
  product: any;
  viewAllHref: string;
  addItem: any;
}) => (
  <Link href={viewAllHref} className="block group">
    <div
      className="relative transition-all duration-300"
      style={{
        borderRadius: 14,
        padding: "14px 14px 18px",
        background:
          "linear-gradient(170deg, rgba(46,22,86,0.62), rgba(22,10,42,0.72))",
        border: "1.5px solid rgba(231,193,111,0.4)",
        boxShadow:
          "0 14px 38px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        direction: "rtl" as const,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px)";
        el.style.borderColor = "rgba(231,193,111,0.75)";
        el.style.boxShadow =
          "0 18px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(120,60,190,0.35)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "rgba(231,193,111,0.4)";
        el.style.boxShadow =
          "0 14px 38px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)";
      }}
    >
      {/* Corner accents */}
      {[0, 1, 2, 3].map((ci) => {
        const pos =
          ci === 0
            ? { top: -2, left: -2 }
            : ci === 1
            ? { top: -2, right: -2 }
            : ci === 2
            ? { bottom: -2, left: -2 }
            : { bottom: -2, right: -2 };
        return (
          <div
            key={ci}
            style={{
              position: "absolute",
              ...pos,
              width: 18,
              height: 18,
              borderLeft:
                ci % 2 === 0 ? "1.5px solid var(--gold-accent)" : "none",
              borderRight:
                ci % 2 === 1 ? "1.5px solid var(--gold-accent)" : "none",
              borderTop: ci < 2 ? "1.5px solid var(--gold-accent)" : "none",
              borderBottom: ci >= 2 ? "1.5px solid var(--gold-accent)" : "none",
              opacity: 0.75,
            }}
          />
        );
      })}

      {/* Image Area */}
      <div
        className="relative overflow-hidden"
        style={{ height: 152, borderRadius: 9 }}
      >
        <Image
          src={product.image || "/images/products/stones/amethyst.webp"}
          alt={product.nameFA || product.name || ""}
          fill
          sizes="(max-width: 768px) 90vw, 25vw"
          unoptimized
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0";
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: product.fallbackColor || "#4B2680",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(18,8,36,0.7) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Name */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--fa)",
          fontSize: 23,
          fontWeight: 700,
          color: "var(--gold-accent)",
          marginTop: 15,
          textShadow: "0 0 14px rgba(231,193,111,0.35)",
        }}
      >
        {product.nameFA || product.name || ""}
      </p>

      {/* Description */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--fa)",
          fontSize: 13.5,
          fontWeight: 300,
          color: "rgba(255,248,238,0.78)",
          lineHeight: 1.5,
          minHeight: 38,
          marginTop: 5,
        }}
      >
        {product.descFA ||
          product.materialFA ||
          product.descriptionFA ||
          (Array.isArray(product.healingProperties)
            ? product.healingProperties[0]
            : "") ||
          ""}
      </p>

      {/* Price + Cart Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 13,
          direction: "ltr",
        }}
      >
        <span
          style={{
            fontFamily: "var(--fa)",
            fontSize: 16,
            fontWeight: 500,
            color: "#F5D79C",
          }}
        >
          {product.priceFA || `$${(product.price || 48).toFixed(2)}`}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem({
              productId: product.id || product.productId,
              productType: "stone",
              name: product.name || product.nameFA || "",
              nameFA: product.nameFA || product.name || "",
              price: product.price || 48,
              currency: "USD",
              quantity: 1,
              image: product.image || "/images/products/stones/amethyst.webp",
            });
          }}
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(160deg, rgba(96,46,160,0.7), rgba(43,18,90,0.8))",
            border: "1px solid rgba(231,193,111,0.55)",
            boxShadow: "0 0 14px rgba(120,60,190,0.3)",
            cursor: "pointer",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5D79C"
            strokeWidth="1.8"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>
    </div>
  </Link>
);

// ==================== MOBILE SLIDER (1 item) ====================
const MobileSlider = ({
  products,
  viewAllHref,
  addItem,
}: {
  products: any[];
  viewAllHref: string;
  addItem: any;
}) => {
  const total = products.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3500);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };
  const handleDot = (i: number) => {
    setActiveIndex(i);
    resetTimer();
  };

  return (
    <div className="md:hidden relative px-4" dir="rtl">
      <div
        key={activeIndex}
        style={{ animation: "fadeSlide 0.35s ease forwards" }}
      >
        <ProductCard
          product={products[activeIndex]}
          viewAllHref={viewAllHref}
          addItem={addItem}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="قبلی"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(96,46,160,0.85), rgba(43,18,90,0.9))",
          border: "1px solid rgba(231,193,111,0.5)",
          boxShadow: "0 0 16px rgba(120,60,190,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5D79C"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="بعدی"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(96,46,160,0.85), rgba(43,18,90,0.9))",
          border: "1px solid rgba(231,193,111,0.5)",
          boxShadow: "0 0 16px rgba(120,60,190,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5D79C"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex
                ? "w-6 bg-gradient-to-r from-[#FECB7D] to-[#f0d090] shadow"
                : "w-1.5 bg-[rgba(231,193,111,0.25)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== TABLET SLIDER (2 items) ====================
const TabletSlider = ({
  products,
  viewAllHref,
  addItem,
}: {
  products: any[];
  viewAllHref: string;
  addItem: any;
}) => {
  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % totalSlides),
    [totalSlides],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + totalSlides) % totalSlides),
    [totalSlides],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };
  const handleDot = (i: number) => {
    setActiveIndex(i);
    resetTimer();
  };

  const currentProducts = [
    products[activeIndex * itemsPerSlide],
    products[activeIndex * itemsPerSlide + 1],
  ].filter(Boolean);

  return (
    <div className="hidden md:block lg:hidden relative px-4" dir="rtl">
      <div
        key={activeIndex}
        className="grid grid-cols-2 gap-[18px]"
        style={{ animation: "fadeSlide 0.35s ease forwards" }}
      >
        {currentProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            viewAllHref={viewAllHref}
            addItem={addItem}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="قبلی"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(96,46,160,0.85), rgba(43,18,90,0.9))",
          border: "1px solid rgba(231,193,111,0.5)",
          boxShadow: "0 0 16px rgba(120,60,190,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5D79C"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="بعدی"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(96,46,160,0.85), rgba(43,18,90,0.9))",
          border: "1px solid rgba(231,193,111,0.5)",
          boxShadow: "0 0 16px rgba(120,60,190,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5D79C"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex
                ? "w-6 bg-gradient-to-r from-[#FECB7D] to-[#f0d090] shadow"
                : "w-1.5 bg-[rgba(231,193,111,0.25)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== DESKTOP GRID ====================
const DesktopGrid = ({
  products,
  viewAllHref,
  addItem,
}: {
  products: any[];
  viewAllHref: string;
  addItem: any;
}) => (
  <div
    className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-[18px] px-4 lg:px-8 mx-auto"
    style={{ maxWidth: 1200 }}
  >
    {products.map((product, i) => (
      <ProductCard
        key={i}
        product={product}
        viewAllHref={viewAllHref}
        addItem={addItem}
      />
    ))}
  </div>
);

// ==================== MAIN COMPONENT ====================
export function BestSellersSection({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "مشاهده همه",
}: {
  title: string;
  subtitle: string;
  products: any[];
  viewAllHref: string;
  viewAllLabel?: string;
}) {
  const { addItem } = useCart();

  return (
    <>
      <MobileSlider
        products={products}
        viewAllHref={viewAllHref}
        addItem={addItem}
      />
      <TabletSlider
        products={products}
        viewAllHref={viewAllHref}
        addItem={addItem}
      />
      <DesktopGrid
        products={products}
        viewAllHref={viewAllHref}
        addItem={addItem}
      />

      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
