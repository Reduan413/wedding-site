"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CONFIG } from "@/lib/wedding-config";
import { WeddingHero } from "./wedding-hero";
import Image from "next/image";
import { CoupleStory } from "./couple-story";
import { Journey } from "./journey";

gsap.registerPlugin(useGSAP);

interface GateProps {
  isOpened: boolean;
  onOpen: () => void;
}

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`absolute h-16 w-16 opacity-85 ${className}`}
    >
      <path
        d="M2 2 Q2 40 40 40 Q30 40 30 30 Q30 20 40 20"
        fill="none"
        stroke="#C9A24B"
        strokeWidth="1.2"
      />
      <circle cx="2" cy="2" r="3" fill="#C9A24B" />
    </svg>
  );
}

export function Gate({ isOpened, onOpen }: GateProps) {
  const gateRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entrance shimmer on load
  useGSAP(
    () => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 24,
        duration: 1.1,
        ease: "power2.out",
        delay: 0.2,
      });
    },
    { scope: gateRef },
  );

  // Door-opening timeline
  useGSAP(
    () => {
      if (!isOpened) return;
      const tl = gsap.timeline();
      tl.to(
        contentRef.current,
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        0,
      )
        .to(
          panelLeftRef.current,
          { xPercent: -104, duration: 3.1, ease: "power3.inOut" },
          0.15,
        )
        .to(
          panelRightRef.current,
          { xPercent: 104, duration: 3.1, ease: "power3.inOut" },
          0.15,
        );
      // .set(gateRef.current, { visibility: 'hidden', pointerEvents: 'none' })
    },
    { dependencies: [isOpened], scope: gateRef },
  );

  return (
    <div
      ref={gateRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-transparent"
      aria-hidden={isOpened}
    >
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_50%,rgba(201,162,75,0.08),transparent_60%)]" />

      {/* Left panel */}
      <div
        ref={panelLeftRef}
        className="absolute bottom-0 top-0 left-0 flex w-[50%]  z-20"
      >
        {/* <div className="ml-auto mr-[26px] h-4/5 w-0.5 self-center opacity-70 [background:repeating-linear-gradient(180deg,var(--gold)_0_6px,transparent_6px_14px)]" />
        <div className="pointer-events-none absolute inset-[18px] border border-[rgba(201,162,75,0.35)]">
          <CornerOrnament className="left-2.5 top-2.5" />
          <CornerOrnament className="bottom-2.5 left-2.5 -scale-y-100" />
        </div> */}
        <Image
          src="/hero_img_left_sm.jpeg"
          alt=""
          fill
          className="pointer-events-none object-fill brightness-90 contrast-75"
        />
      </div>

      {/* Right panel */}
      <div
        ref={panelRightRef}
        className="absolute bottom-0 top-0 right-0 flex w-[50%]  z-20  h-full"
      >
        {/* <div className="pointer-events-none absolute inset-[18px] border border-[rgba(201,162,75,0.35)]">
          <CornerOrnament className="right-2.5 top-2.5 -scale-x-100" />
          <CornerOrnament className="bottom-2.5 right-2.5 -scale-100" />
        </div>
        <div className="ml-[26px] mr-auto h-4/5 w-0.5 self-center opacity-70 [background:repeating-linear-gradient(180deg,var(--gold)_0_6px,transparent_6px_14px)]" /> */}
        <Image
          src="/hero_img_right_sm.jpeg"
          alt=""
          fill
          className="pointer-events-none object-fill brightness-90 contrast-75"
        />
      </div>

      {/* Center content */}
      <div
        ref={contentRef}
        className="absolute z-30 max-w-[520px] p-10 text-center text-[var(--ivory)]"
      >
        <div className="label text-[#FFF8EA]">
          Together with their families
        </div>
        <div className="my-[18px] mb-2 flex items-center justify-center gap-4 font-[Cinzel,serif] text-[clamp(4rem,15vw,8rem)] text-[#f1c914]">
          {CONFIG.brideFirst[0]}
          <span className="font-['Cormorant_Garamond',serif] text-[0.6em] italic text-[#F4C96B]">
            &amp;
          </span>
          {CONFIG.groomFirst[0]}
        </div>
        <div className="mb-[34px] text-[1.15rem] italic text-[var(--ivory-deep)]">
          request the honour of your presence
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="relative cursor-pointer rounded-sm border-0 bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)]  font-[Poppins,sans-serif] text-[0.78rem] font-medium uppercase tracking-[0.18em]  shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--ivory)] px-5 py-2 "
        >
          Open Invitation
        </button>
        {/* <div
          aria-hidden="true"
          className="absolute left-1/2 top-[calc(100%+40px)] h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-[gatePulse_2.6s_ease-in-out_infinite] rounded-full border border-[rgba(228,199,126,0.5)]"
        /> */}
      </div>
      {/* <WeddingHero />
      <CoupleStory />
      <Journey /> */}
    </div>
  );
}
