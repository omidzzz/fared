'use client'

import React from 'react'
import Link from 'next/link'

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  className?: string
  size?: 'small' | 'default' | 'large' | 'fullWidth'
  'aria-label'?: string
  type?: 'button' | 'submit' | 'reset'
}

const FRAME_PATH = 'M522.91 47.4326C516.31 46.5026 512.96 41.0626 512.96 31.2626C512.96 27.4426 511.9 24.6626 509.8 23.0126C508 21.5926 505.9 21.3726 504.49 21.4326C503.68 10.3126 493.3 8.30265 489.68 7.93265C489.48 4.93265 488.5 2.73265 486.75 1.39265C484.36 -0.457353 481.38 0.0126474 480.62 0.172647L43.38 0.172648C42.62 0.012648 39.64 -0.447353 37.25 1.39265C35.5 2.74265 34.52 4.94265 34.32 7.93265C30.7 8.29265 20.32 10.3126 19.51 21.4326C18.1 21.3826 16 21.5926 14.2 23.0126C12.1 24.6626 11.04 27.4426 11.04 31.2626C11.04 41.0626 7.69 46.5026 1.09 47.4326C0.46 47.5226 0 48.0526 0 48.6926C0 49.3326 0.47 49.8626 1.09 49.9526C7.7 50.8826 11.04 56.3226 11.04 66.1226C11.04 69.9426 12.1 72.7226 14.2 74.3726C16 75.7926 18.1 76.0126 19.51 75.9526C20.32 87.0726 30.7 89.0926 34.32 89.4526C34.52 92.4526 35.5 94.6526 37.25 95.9926C38.71 97.1226 40.39 97.3826 41.64 97.3826C42.44 97.3826 43.08 97.2726 43.38 97.2126H480.61C481.37 97.3726 484.35 97.8326 486.74 95.9926C488.49 94.6426 489.47 92.4426 489.67 89.4526C493.29 89.0926 503.67 87.0726 504.48 75.9526C505.89 76.0026 507.99 75.7926 509.79 74.3726C511.89 72.7226 512.95 69.9426 512.95 66.1226C512.95 56.3226 516.3 50.8826 522.9 49.9526C523.53 49.8626 523.99 49.3326 523.99 48.6926C523.99 48.0526 523.52 47.5226 522.9 47.4326H522.91Z'

const HOVER_CSS = `
  .lumina-cta:hover .lumina-cta-svg {
    color: rgba(245, 216, 122, 1.0) !important;
    filter: drop-shadow(0 0 14px rgba(245, 216, 122, 0.5));
  }
  .lumina-cta:hover .lumina-cta-label {
    color: #f5d87a !important;
  }
  .lumina-cta:not([disabled]):hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 10px 28px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(212,175,100,0.3)) !important;
  }
  .lumina-cta:not([disabled]):active {
    transform: translateY(0) scale(0.98);
  }
  .lumina-cta:focus-visible .lumina-cta-svg {
    filter: drop-shadow(0 0 0 3px rgba(245, 216, 122, 0.9));
  }
`

export function CTAButton({
  children, onClick, href, disabled = false, className = '',
  size = 'default', 'aria-label': ariaLabel, type = 'button',
}: CTAButtonProps) {
  const widthMap: Record<string, string> = { small: '220px', default: '320px', large: '380px', fullWidth: '100%' }
  const fontMap: Record<string, string> = { small: '0.72rem', default: '0.82rem', large: '0.88rem', fullWidth: '0.82rem' }

  const containerStyle: React.CSSProperties = {
    position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: widthMap[size], maxWidth: size === 'fullWidth' ? '460px' : undefined,
    height: 'auto', background: 'none', border: 'none', padding: 0, margin: 0,
    textDecoration: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.4)) drop-shadow(0 0 12px rgba(212,175,100,0.15))',
    transition: 'transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease',
  }

  const svgStyle: React.CSSProperties = {
    width: '100%', height: 'auto', display: 'block',
    color: 'rgba(245, 216, 122, 0.65)',
    transition: 'color 0.25s ease, filter 0.25s ease',
  }

  const labelStyle: React.CSSProperties = {
    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Playfair Display', Georgia, serif", fontSize: fontMap[size], fontWeight: 400,
    letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ffffff',
    whiteSpace: 'nowrap', pointerEvents: 'none', transition: 'color 0.25s ease',
  }

  const inner = (
    <>
      <style>{HOVER_CSS}</style>
      <svg width="524" height="98" viewBox="0 0 524 98" fill="none" xmlns="http://www.w3.org/2000/svg"
           className="lumina-cta-svg" style={svgStyle} aria-hidden="true">
        <path d={FRAME_PATH} fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
      <span className="lumina-cta-label" style={labelStyle}>{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`lumina-cta ${className}`} style={containerStyle}
            aria-label={ariaLabel} aria-disabled={disabled}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={`lumina-cta ${className}`} style={containerStyle} onClick={onClick}
            disabled={disabled} aria-label={ariaLabel} type={type}>
      {inner}
    </button>
  )
}

export default CTAButton
