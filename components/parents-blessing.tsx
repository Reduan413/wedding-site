'use client'

import { useRef } from 'react'
import { CONFIG } from '@/lib/wedding-config'
import { useReveal } from '@/hooks/use-reveal'

export function ParentsBlessing() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="parents-blessing"
      className="bg-[var(--maroon-deep)] px-5 py-[100px] text-center text-[var(--ivory)]"
    >
      <div className="mx-auto max-w-[920px]">
        <h2 data-reveal className="mb-11 text-[clamp(1.8rem,4vw,2.6rem)] text-[var(--ivory)]">
          Blessings From
        </h2>

        <div data-reveal className="flex flex-wrap items-center justify-center gap-10">
          <div className="min-w-[200px]">
            <div className="label mb-2.5 text-[var(--gold)]">Groom&apos;s Parents</div>
            <div className="font-['Cormorant_Garamond',serif] text-[1.3rem] text-[var(--ivory-deep)]">
              {CONFIG.groomParents}
            </div>
          </div>

          <div className="h-px w-[60px] bg-[rgba(228,199,126,0.4)] sm:h-[60px] sm:w-px" />

          <div className="min-w-[200px]">
            <div className="label mb-2.5 text-[var(--gold)]">Bride&apos;s Parents</div>
            <div className="font-['Cormorant_Garamond',serif] text-[1.3rem] text-[var(--ivory-deep)]">
              {CONFIG.brideParents}
            </div>
          </div>
        </div>

        <div className="mt-[30px] font-[Poppins,sans-serif] text-[0.8rem] tracking-[0.08em] text-[#a3897a]">
          And Grandparents
        </div>
      </div>
    </section>
  )
}
