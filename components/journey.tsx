'use client'

import { useRef } from 'react'
import { CONFIG } from '@/lib/wedding-config'
import { SectionHead } from '@/components/divider'
import { useReveal } from '@/hooks/use-reveal'

const icons = [
  // heart
  <path key="h" d="M12 21s-7-4.6-9.5-9.1C1 8.5 2.6 5 6.1 5c2 0 3.4 1.1 4 2.4C10.7 6.1 12.1 5 14.1 5c3.5 0 5.1 3.5 3.6 6.9C15.2 16.4 12 21 12 21z" />,
  // star
  <path key="s" d="M12 2l1.8 4.6L18 8l-3.6 3 1 4.8L12 13.6 8.6 15.8l1-4.8L6 8l4.2-1.4z" />,
  // clock
  <g key="c">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </g>,
]

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id="story" className="bg-[var(--ivory)] px-5 py-[100px]">
      <div className="mx-auto max-w-[920px]">
        <SectionHead label="The Journey" title="Our Journey" />

        <div className="grid gap-9">
          {CONFIG.story.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              className="grid grid-cols-[48px_1fr] items-start gap-[22px] rounded border border-[#ecdfc4] bg-white px-6 py-[26px] shadow-[var(--shadow)] sm:grid-cols-[64px_1fr]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--maroon)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="#E4C77E" strokeWidth="1.4" className="h-[26px] w-[26px]">
                  {icons[i % icons.length]}
                </svg>
              </div>
              <div>
                <div className="mb-2 font-[Poppins,sans-serif] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--gold)]">
                  {s.meta}
                </div>
                <h3 className="mb-1 text-[1.3rem] text-[var(--teal)]">{s.title}</h3>
                <p className="text-[1.08rem] leading-relaxed text-[#4a3a2c]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
