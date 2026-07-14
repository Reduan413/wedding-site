"use client";

import { useRef } from "react";
import { CONFIG } from "@/lib/wedding-config";
import { SectionHead } from "@/components/divider";
import { useReveal } from "@/hooks/use-reveal";

export function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="bg-[var(--ivory)] px-5 py-[100px]"
    >
      <div className="mx-auto max-w-[920px]">
        <SectionHead label="Join Us At" title="The Venue" />

        <div
          data-reveal
          className="grid overflow-hidden rounded border border-[#ecdfc4] bg-white shadow-[var(--shadow)] md:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-[38px]">
            <h3 className="mb-2.5 text-[1.6rem] text-[var(--maroon)]">
              {CONFIG.venue.name}
            </h3>
            <p className="mb-[18px] text-[1.05rem] leading-relaxed text-[#5a4a3a]">
              {CONFIG.venue.address}
            </p>
            <a
              href={CONFIG.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start rounded-[2px] bg-[var(--teal)] px-6 py-3 font-[Poppins,sans-serif] text-[0.75rem] uppercase tracking-[0.12em] text-white no-underline transition-colors duration-300 hover:bg-[#0b2622]"
            >
              Get Directions
            </a>
          </div>

          <div className="flex  items-center justify-center p-5 text-center text-[var(--maroon)] [background:repeating-linear-gradient(45deg,#eadfc7,#eadfc7_10px,#f3ead4_10px,#f3ead4_20px)]">
            <div className="w-full ">
              <div className="label text-[var(--maroon)]">Map preview</div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.028407437024!2d91.8527855!3d22.352556200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad27002ffae819%3A0xac1cfe92f9f6dcb!2sAhad%20Convention%20Hall!5e0!3m2!1sen!2sbd!4v1784020238821!5m2!1sen!2sbd"
                className="w-full min-h-[250px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
