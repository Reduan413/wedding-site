'use client'

import { useRef } from 'react'
import { CONFIG } from '@/lib/wedding-config'
import { useReveal } from '@/hooks/use-reveal'

export function BlessingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id="blessing" className="bg-[var(--maroon)] px-5 py-[100px] text-center text-[var(--ivory)]">
      <div className="mx-auto max-w-[920px]">
        <svg
          data-reveal
          viewBox="0 0 40 40"
          fill="none"
          stroke="#E4C77E"
          strokeWidth="1"
          className="mx-auto mb-[22px] h-10 w-10"
        >
          <circle cx="20" cy="20" r="18" />
          <path d="M20 6v28M6 20h28" strokeWidth="0.6" />
          <circle cx="20" cy="20" r="4" />
        </svg>
        <p
          data-reveal
          className="mx-auto max-w-[640px] font-['Cormorant_Garamond',serif] text-[clamp(1.3rem,3vw,1.8rem)] italic leading-normal text-[var(--ivory-deep)]"
        >
          {CONFIG.blessing}
        </p>
        <div
          data-reveal
          className="mt-[18px] font-[Poppins,sans-serif] text-[0.72rem] uppercase tracking-[0.2em] text-[var(--gold-light)]"
        >
          With love, our families
        </div>
      </div>
    </section>
  )
}
