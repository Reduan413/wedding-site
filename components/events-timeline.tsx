'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONFIG } from '@/lib/wedding-config'
import { SectionHead } from '@/components/divider'
import { useReveal } from '@/hooks/use-reveal'

gsap.registerPlugin(ScrollTrigger)

export function EventsTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  // Extra flourish: gold line draws down + dots pop as you scroll
  useEffect(() => {
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-t-line]',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
      gsap.utils.toArray<HTMLElement>('[data-t-dot]').forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2.5)',
          scrollTrigger: { trigger: dot, start: 'top 85%', once: true },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="events"
      className="px-5 py-[100px] [background:linear-gradient(180deg,var(--ivory-deep),var(--ivory))]"
    >
      <div className="mx-auto max-w-[920px]">
        <SectionHead label="The Celebrations" title="Wedding Events" />

        <div data-timeline className="relative mt-5">
          {/* Center gold line (left-aligned on mobile) */}
          <div
            data-t-line
            className="absolute bottom-0 top-0 left-[15px] w-px -translate-x-1/2 [background:linear-gradient(180deg,transparent,var(--gold),transparent)] md:left-1/2"
          />

          {CONFIG.events.map((e, i) => {
            const odd = i % 2 === 0 // first item = left card on desktop
            return (
              <div
                key={e.name}
                className="mb-[50px] grid grid-cols-[30px_1fr] items-center md:grid-cols-[1fr_40px_1fr]"
              >
                {/* Card */}
                <div
                  data-reveal
                  className={`col-start-2 rounded border border-[#ecdfc4] bg-white px-[26px] py-6 text-left shadow-[var(--shadow)] md:row-start-1 ${
                    odd ? 'md:col-start-1 md:text-right' : 'md:col-start-3'
                  }`}
                >
                  <h3 className="text-[1.4rem] text-[var(--maroon)]">{e.name}</h3>
                  <div className="mb-1.5 mt-2 font-[Poppins,sans-serif] text-[0.72rem] uppercase tracking-[0.1em] text-[var(--teal)]">
                    {e.when}
                  </div>
                  <p className="text-[1.02rem] text-[#5a4a3a]">{e.venue}</p>
                  <p className="mt-1.5 text-[0.95rem] text-[#8a7660]">{e.desc}</p>
                </div>

                {/* Dot */}
                <div
                  data-t-dot
                  className="col-start-1 row-start-1 h-3.5 w-3.5 justify-self-center rounded-full border-[3px] border-[var(--ivory)] bg-[var(--gold)] shadow-[0_0_0_1px_var(--gold)] md:col-start-2"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
