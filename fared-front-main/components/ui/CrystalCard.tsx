'use client'

import { useRef, useState, useLayoutEffect, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import type { Stone } from '@/lib/mock-data'

const NATIVE_W = 463.37
const NATIVE_H = 727.24
const DEFAULT_SCALE = 260 / NATIVE_W // ≈ 0.5611 (matches hero card maxWidth)

interface CrystalCardProps {
  stone: Stone
}

export default function CrystalCard({ stone }: CrystalCardProps) {
  const { addItem } = useCart()
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(DEFAULT_SCALE)
  const clipId = useId()

  useLayoutEffect(() => {
    const el = frameRef.current
    if (!el) return
    const update = () => {
      if (frameRef.current) {
        setScale(frameRef.current.offsetWidth / NATIVE_W)
      }
    }
    update()
    const c = frameRef.current?.querySelector('.crystal-card-content')
    if (c) console.log('[card]', stone.name,
      'clip:', getComputedStyle(c).clipPath,
      'matches in doc:', document.querySelectorAll(`clipPath`).length)
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const invScale = 1 / (scale || DEFAULT_SCALE)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: stone.id,
      productType: 'stone',
      name: stone.name,
      nameFA: stone.nameFA,
      price: stone.price,
      currency: 'USD' as const,
      quantity: 1,
      image: stone.image,
    })
  }

  return (
    <Link href={`/shop/stones/${stone.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        ref={frameRef}
        className="crystal-card-frame"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${NATIVE_W} / ${NATIVE_H}`,
          overflow: 'visible',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,195,173,0.25)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Hidden clipPath — userSpaceOnUse, coordinates match the native SVG viewBox */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path
                d="M226.96,725.03c-66.52-.17-131.45-.12-197.98-.29,0,0-2.1-3.71-10.1-13.71s-16-17-16-17c0,0-2-652,0-657s17.64-11.84,23.5-25.5C30.89,1.03,40.49,2.03,40.49,2.03c127.47.07,249.03.64,376.5.71,0,0,15.5-1.5,20,9,5.86,13.66,21.5,20.5,23.5,25.5s0,657,0,657c0,0-8,7-16,17s-10.5,13.5-10.5,13.5l-197.57.5-9.45-.21Z"
                transform="translate(231.685, 363.62) scale(0.993) translate(-231.685, -363.62)"
              />
            </clipPath>
          </defs>
        </svg>

        {/* Clip container — hides the native-size overflow, keeps the button outside */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {/* Scale wrapper — renders at native SVG size, scaled to fit the frame */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${NATIVE_W}px`,
              height: `${NATIVE_H}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            {/* Tint fill — silhouette-perfect gem-shaped tint, sits below content, independent of clip-path */}
            <svg
              viewBox={`0 0 ${NATIVE_W} ${NATIVE_H}`}
              width={NATIVE_W}
              height={NATIVE_H}
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
              }}
              aria-hidden="true"
            >
              <path
                d="M226.96,725.03c-66.52-.17-131.45-.12-197.98-.29,0,0-2.1-3.71-10.1-13.71s-16-17-16-17c0,0-2-652,0-657s17.64-11.84,23.5-25.5C30.89,1.03,40.49,2.03,40.49,2.03c127.47.07,249.03.64,376.5.71,0,0,15.5-1.5,20,9,5.86,13.66,21.5,20.5,23.5,25.5s0,657,0,657c0,0-8,7-16,17s-10.5,13.5-10.5,13.5l-197.57.5-9.45-.21Z"
                fill="rgba(26, 10, 61, 0.35)"
                stroke="none"
              />
            </svg>

            {/* Content — clipped to frame shape, font sizes scaled to compensate for transform */}
            <div
              className="crystal-card-content"
              style={{
                position: 'absolute',
                inset: 0,
                width: `${NATIVE_W}px`,
                height: `${NATIVE_H}px`,
                clipPath: `url(#${clipId})`,
                zIndex: 1,
              }}
            >
              {/* Image layer — plain rectangle inside the already-clipped parent */}
              <div
                className="card-image-wrapper"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '62%',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={stone.image}
                  alt={stone.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                  background: 'linear-gradient(to top, rgba(26,10,61,0.35) 0%, transparent 100%)',
                }} />
              </div>

              {/* Info section — positioned below the image layer */}
              <div
                className="crystal-card-info"
                style={{
                  position: 'absolute',
                  top: '62%',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '12px 24px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  textAlign: 'center',
                  overflow: 'hidden',
                }}
              >
                <h3
                  className="crystal-card-name"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: `${0.95 * invScale}rem`,
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {stone.name}
                </h3>

                <p
                  className="crystal-card-props"
                  style={{
                    fontSize: `${0.7 * invScale}rem`,
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                  }}
                >
                  · {stone.properties?.join(' · ')} ·
                </p>

                <p
                  className="crystal-card-price"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: `${1.1 * invScale}rem`,
                    fontWeight: 600,
                    color: '#d4af64',
                    margin: '4px 0 0',
                  }}
                >
                  ${stone.price.toFixed(2)}
                </p>

                {/* Divider */}
                <div
                  className="crystal-card-divider"
                  style={{
                    width: 'calc(100% - 32px)',
                    margin: '10px 0 0',
                    borderTop: '1px solid rgba(212,175,100,0.25)',
                  }}
                />
              </div>
            </div>

            {/* Gem-frame SVG — visible stroke at native size, rendered above content */}
            <svg
              className="crystal-card-frame-svg"
              viewBox={`0 0 ${NATIVE_W} ${NATIVE_H}`}
              width={NATIVE_W}
              height={NATIVE_H}
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
              }}
              aria-hidden="true"
            >
              <path
                d="M226.96,725.03c-66.52-.17-131.45-.12-197.98-.29,0,0-2.1-3.71-10.1-13.71s-16-17-16-17c0,0-2-652,0-657s17.64-11.84,23.5-25.5C30.89,1.03,40.49,2.03,40.49,2.03c127.47.07,249.03.64,376.5.71,0,0,15.5-1.5,20,9,5.86,13.66,21.5,20.5,23.5,25.5s0,657,0,657c0,0-8,7-16,17s-10.5,13.5-10.5,13.5l-197.57.5-9.45-.21Z"
                fill="none"
                stroke="#ffc3ad"
                strokeMiterlimit="10"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        {/* [+] button — outside the clip container, centers on frame bottom edge */}
        <button
          onClick={handleAdd}
          className="crystal-card-cart-btn"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 195, 173, 0.6)',
            background: 'rgba(10, 5, 30, 0.8)',
            backdropFilter: 'blur(4px)',
            color: 'rgba(255, 195, 173, 0.9)',
            fontSize: '14px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,195,173,0.2)'
            e.currentTarget.style.borderColor = 'rgba(255,195,173,1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(10,5,30,0.8)'
            e.currentTarget.style.borderColor = 'rgba(255,195,173,0.6)'
          }}
          aria-label={`Add ${stone.name} to cart`}
        >
          +
        </button>
      </div>
    </Link>
  )
}
