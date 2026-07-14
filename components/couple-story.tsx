"use client";

import { useRef } from "react";
import { CONFIG } from "@/lib/wedding-config";
import { Divider, SectionHead } from "@/components/divider";
import { useReveal } from "@/hooks/use-reveal";

function Avatar({ initial }: { initial: string }) {
  return (
    <div className="relative mx-auto mb-[18px] flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[var(--gold-light)] bg-gradient-to-br from-[var(--maroon)] to-[var(--teal)] shadow-[var(--shadow)] after:absolute after:inset-2 after:rounded-full after:border after:border-[rgba(228,199,126,0.5)] after:content-['']">
      <span className="font-[Cinzel,serif] text-[3rem] text-[var(--gold-light)]">
        {initial}
      </span>
    </div>
  );
}

export function CoupleStory() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="bg-[var(--ivory)] px-5 py-10 text-center"
    >
      <div className="mx-auto max-w-[920px]">
        {/* <SectionHead label="In Their Words" title="Our Story" /> */}
        <p
          data-reveal
          className="mx-auto mt-11 max-w-[640px] text-[1.2rem] italic leading-[1.7] text-[var(--maroon)]"
        >
          {CONFIG.coupleClosing}
        </p>
        <div
          data-reveal
          className="mb-2 flex flex-col items-center justify-center gap-11"
        >
          <div className="w-[220px]  flex flex-col items-center justify-center">
            <Avatar initial={CONFIG.groomFirst[0]} />
            <div className="font-['Cormorant_Garamond',serif] text-[1.8rem] italic text-[var(--maroon)]">
              {CONFIG.groomFirst}
            </div>
            <p className="mt-2 text-base leading-normal text-[#6b5a4a]">
              {CONFIG.groomQuote}
            </p>
          </div>

          <div className="shrink-0">
            <svg viewBox="0 0 24 24" fill="#C9A24B" className="h-11 w-11">
              <path d="M12 21s-7-4.6-9.5-9.1C1 8.5 2.6 5 6.1 5c2 0 3.4 1.1 4 2.4C10.7 6.1 12.1 5 14.1 5c3.5 0 5.1 3.5 3.6 6.9C15.2 16.4 12 21 12 21z" />
            </svg>
          </div>

          <div className="w-[220px] flex flex-col items-center justify-center">
            <Avatar initial={CONFIG.brideFirst[0]} />
            <div className="font-['Cormorant_Garamond',serif] text-[1.8rem] italic text-[var(--maroon)]">
              {CONFIG.brideFirst}
            </div>
            <p className="mt-2 text-base leading-normal text-[#6b5a4a]">
              {CONFIG.brideQuote}
            </p>
          </div>
        </div>

        <p
          data-reveal
          className="mx-auto mt-11 max-w-[640px] text-[1.2rem] italic leading-[1.7] text-[var(--maroon)]"
        >
          {CONFIG.coupleClosing}{" "}
        </p>
         <Divider />
      </div>
    </section>
  );
}
