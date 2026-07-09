"use client";

import { Divider } from "@/components/divider";
import { CONFIG } from "@/lib/wedding-config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

function getCountdown(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function WeddingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const target = new Date(CONFIG.weddingDateISO).getTime();
  const [cd, setCd] = useState(() => getCountdown(target));

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // Staggered entrance once the gate opens
  useGSAP(
    () => {
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 26,
        duration: 1,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.9, // let the gate panels slide away first
      });
    },
    { scope: sectionRef },
  );

  const cells = [
    { num: pad(cd.days), cap: "Days" },
    { num: pad(cd.hours), cap: "Hours" },
    { num: pad(cd.minutes), cap: "Minutes" },
    { num: pad(cd.seconds), cap: "Seconds" },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center w-full h-full relative"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/main-bg.png"
          alt=""
          width={2000}
          height={2000}
          priority
          className="h-full w-full object-fit scale-110"
          // style={{
          //   filter: "blur(5px)",
          // }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center   w-full h-screen">
        <div data-hero-item className="label mb-1.5 text-[var(--maroon)]">
          Shubh Vivah
        </div>
        <h1
          data-hero-item
          className="text-[clamp(2.4rem,7vw,4.4rem)] leading-[1.1] text-[var(--maroon)] flex flex-col justify-center items-center gap-2 font-[Cinzel,serif] text-center"
        >
          {CONFIG.brideFirst}
          <span className="my-1.5 block font-['Cormorant_Garamond',serif] text-[0.5em] italic text-[#ffffff]">
            &amp;
          </span>
          {CONFIG.groomFirst}
        </h1>
        <div data-hero-item className="w-full flex justify-center items-center">
          <Divider />
        </div>
        <div
          data-hero-item
          className="mt-[18px] text-[1.35rem] font-medium text-[var(--teal)]"
        >
          {CONFIG.weddingDateDisplay}
        </div>
        <div data-hero-item className="mt-1 text-[1.05rem] text-[#6b5a4a]">
          {CONFIG.place}
        </div>

        <div
          data-hero-item
          className="mt-[42px] flex flex-wrap justify-center gap-[22px]"
        >
          {cells.map((c) => (
            <div key={c.cap} className="min-w-[74px] text-center">
              <div className="font-[Cinzel,serif] text-[2rem] text-[var(--maroon)] tabular-nums">
                {c.num}
              </div>
              <div className="mt-1 font-[Poppins,sans-serif] text-[0.65rem] uppercase tracking-[0.15em] text-[#8a7660]">
                {c.cap}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
