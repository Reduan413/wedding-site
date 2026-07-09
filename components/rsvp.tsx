'use client'

import { useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { SectionHead } from '@/components/divider'
import { useReveal } from '@/hooks/use-reveal'

const fieldLabel =
  'font-[Poppins,sans-serif] text-[0.72rem] uppercase tracking-[0.1em] text-[var(--teal)]'
const fieldInput =
  "font-['Cormorant_Garamond',serif] text-[1.05rem] px-3 py-[11px] border border-[#d9c9a8] rounded-[2px] bg-[var(--ivory)] text-[var(--ink)] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[var(--gold)]"

export function Rsvp() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  useReveal(sectionRef)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Fade the form out, swap to thank-you, pop it in
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power1.in',
      onComplete: () => {
        setSubmitted(true)
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' },
        )
      },
    })
  }

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="px-5 py-[100px] [background:linear-gradient(180deg,var(--ivory),var(--ivory-deep))]"
    >
      <div className="mx-auto max-w-[920px]">
        <SectionHead label="Kindly Respond" title="RSVP" />

        <div
          data-reveal
          ref={cardRef}
          className="mx-auto max-w-[560px] rounded border border-[#ecdfc4] bg-white px-9 py-11 shadow-[var(--shadow)]"
        >
          {submitted ? (
            <div className="px-2.5 py-[30px] text-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5E1220"
                strokeWidth="1.4"
                className="mx-auto mb-3.5 h-11 w-11"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-6" />
              </svg>
              <h3 className="mb-1.5 text-[1.5rem] text-[var(--maroon)]">
                Thank you, {name.trim() || 'friend'}!
              </h3>
              <p className="text-[#6b5a4a]">
                Your response has been noted. We can&apos;t wait to celebrate with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-5 flex flex-col gap-1.5">
                <label htmlFor="r-name" className={fieldLabel}>
                  Full name
                </label>
                <input
                  id="r-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldInput}
                />
              </div>

              <div className="mb-5 flex flex-col gap-1.5">
                <label htmlFor="r-contact" className={fieldLabel}>
                  Email or phone
                </label>
                <input id="r-contact" type="text" required placeholder="you@example.com" className={fieldInput} />
              </div>

              <div className="mb-5 flex flex-col gap-1.5">
                <span className={fieldLabel}>Will you be attending?</span>
                <div className="flex gap-5 font-[Poppins,sans-serif] text-[0.85rem]">
                  <label className="flex items-center gap-1.5 text-[var(--ink)]">
                    <input type="radio" name="attending" value="yes" defaultChecked className="accent-[var(--maroon)]" />
                    Joyfully accepts
                  </label>
                  <label className="flex items-center gap-1.5 text-[var(--ink)]">
                    <input type="radio" name="attending" value="no" className="accent-[var(--maroon)]" />
                    Regretfully declines
                  </label>
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-1.5">
                <label htmlFor="r-guests" className={fieldLabel}>
                  Number of guests (including you)
                </label>
                <select id="r-guests" className={fieldInput} defaultValue="1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>

              <div className="mb-5 flex flex-col gap-1.5">
                <label htmlFor="r-msg" className={fieldLabel}>
                  Message for the couple (optional)
                </label>
                <textarea id="r-msg" rows={3} placeholder="Your wishes..." className={fieldInput} />
              </div>

              <button
                type="submit"
                className="mt-1.5 w-full cursor-pointer rounded-[2px] border-0 bg-[var(--maroon)] p-[15px] font-[Poppins,sans-serif] text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[var(--maroon-deep)]"
              >
                Send RSVP
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
