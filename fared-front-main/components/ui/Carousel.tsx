"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useRef, useCallback } from "react";

// ── Default product card (same as before) ──
export function ProductCard({
  product,
  linkHref,
  onAddToCart,
}: {
  product: any;
  linkHref: string;
  onAddToCart?: (product: any) => void;
}) {
  const { addItem } = useCart();
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
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
    }
  };

  return (
    <Link href={linkHref} className="block group">
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
          (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(231,193,111,0.75)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 18px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(120,60,190,0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(231,193,111,0.4)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 14px 38px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)";
        }}
      >
        {/* Corner brackets */}
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
                borderBottom:
                  ci >= 2 ? "1.5px solid var(--gold-accent)" : "none",
                opacity: 0.75,
                borderRadius: 0,
              }}
            />
          );
        })}

        {/* Image */}
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
              zIndex: 0,
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
            onClick={handleAdd}
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
}

// ── Responsive carousel ──
interface ProductCarouselProps {
  products: any[];
  itemsPerView?: number | { [key: number]: number }; // e.g. { 640: 1, 1024: 2, 1280: 3 }
  linkHref: string | ((product: any) => string); // per‑item link
  onAddToCart?: (product: any) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  containerClassName?: string;
}

export function ProductCarousel({
  products,
  itemsPerView = { 0: 1, 640: 2, 1024: 3, 1280: 4 },
  linkHref,
  onAddToCart,
  autoplay = true,
  autoplayInterval = 3500,
  showDots = true,
  showArrows = true,
  containerClassName = "",
}: ProductCarouselProps) {
  const total = products.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerViewState, setItemsPerViewState] = useState(
    typeof itemsPerView === "number" ? itemsPerView : 1,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine items per view based on window width
  useEffect(() => {
    if (typeof itemsPerView === "number") {
      setItemsPerViewState(itemsPerView);
      return;
    }
    const updateItems = () => {
      const width = window.innerWidth;
      const breakpoints = Object.keys(itemsPerView)
        .map(Number)
        .sort((a, b) => a - b);
      let selected = 1;
      for (const bp of breakpoints) {
        if (width >= bp) selected = itemsPerView[bp];
      }
      setItemsPerViewState(selected);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, total - itemsPerViewState);
  const activeIndex = Math.min(currentIndex, maxIndex);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1 > maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 < 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoplay && total > itemsPerViewState) {
      timerRef.current = setInterval(next, autoplayInterval);
    }
  }, [autoplay, autoplayInterval, next, total, itemsPerViewState]);

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
    setCurrentIndex(i);
    resetTimer();
  };

  // Compute the number of slides (dots) = total - itemsPerViewState + 1
  const totalSlides = Math.max(0, total - itemsPerViewState + 1);
  const slideWidth = 100 / itemsPerViewState;
  const translateX = -activeIndex * slideWidth;

  // If there are no products or less than itemsPerView, we don't need arrows/dots
  const showControls = total > itemsPerViewState;

  return (
    <div className={`relative ${containerClassName}`} dir="rtl">
      {/* Carousel track */}
      <div className="overflow-hidden" style={{ margin: "0 -6px" }}>
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {products.map((product, i) => {
            const href =
              typeof linkHref === "function" ? linkHref(product) : linkHref;
            return (
              <div
                key={i}
                className="px-2"
                style={{ flex: `0 0 ${slideWidth}%` }}
              >
                <ProductCard
                  product={product}
                  linkHref={href}
                  onAddToCart={onAddToCart}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows – inside container, not overflowing */}
      {showControls && showArrows && (
        <>
          <button
            onClick={handlePrev}
            aria-label="قبلی"
            className="absolute top-1/2 -translate-y-1/2 left-2 z-10"
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
              cursor: "pointer",
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
            className="absolute top-1/2 -translate-y-1/2 right-2 z-10"
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
              cursor: "pointer",
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
        </>
      )}

      {/* Dot indicators */}
      {showControls && showDots && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`رفتن به اسلاید ${i + 1}`}
              style={{
                height: 5,
                width: i === activeIndex ? 22 : 5,
                borderRadius: 99,
                background:
                  i === activeIndex
                    ? "linear-gradient(90deg, #FECB7D, #f0d090)"
                    : "rgba(231,193,111,0.25)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
                boxShadow:
                  i === activeIndex ? "0 0 8px rgba(254,203,125,0.5)" : "none",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
