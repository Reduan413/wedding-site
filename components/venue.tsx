'use client'

import { useRef } from 'react'
import { CONFIG } from '@/lib/wedding-config'
import { SectionHead } from '@/components/divider'
import { useReveal } from '@/hooks/use-reveal'

export function Venue() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id="venue" className="bg-[var(--ivory)] px-5 py-[100px]">
      <div className="mx-auto max-w-[920px]">
        <SectionHead label="Join Us At" title="The Venue" />

        <div
          data-reveal
          className="grid overflow-hidden rounded border border-[#ecdfc4] bg-white shadow-[var(--shadow)] md:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-[38px]">
            <h3 className="mb-2.5 text-[1.6rem] text-[var(--maroon)]">{CONFIG.venue.name}</h3>
            <p className="mb-[18px] text-[1.05rem] leading-relaxed text-[#5a4a3a]">{CONFIG.venue.address}</p>
            <a
              href={CONFIG.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start rounded-[2px] bg-[var(--teal)] px-6 py-3 font-[Poppins,sans-serif] text-[0.75rem] uppercase tracking-[0.12em] text-white no-underline transition-colors duration-300 hover:bg-[#0b2622]"
            >
              Get Directions
            </a>
          </div>

          <div className="flex min-h-[280px] items-center justify-center p-5 text-center text-[var(--maroon)] [background:repeating-linear-gradient(45deg,#eadfc7,#eadfc7_10px,#f3ead4_10px,#f3ead4_20px)]">
            <div>
              <div className="label text-[var(--maroon)]">Map preview</div>
              <p className="mt-2 font-['Cormorant_Garamond',serif] text-base">
                Replace with an embedded Google Map
                <br />
                using your venue&apos;s address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
