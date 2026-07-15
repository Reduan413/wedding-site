"use client";

import { useRef } from "react";
import { CONFIG } from "@/lib/wedding-config";
import { useReveal } from "@/hooks/use-reveal";
import parentsBlessingBg from "@/public/parents-blessing-bg.png";
import Image from "next/image";

export function ParentsBlessing() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="parents-blessing"
      className=" relative "
    >
      <Image src={parentsBlessingBg} alt=""  className=" absolute top-0 left-0 w-full h-full z-0"/>
      <div className="mx-auto max-w-[920px] z-20 relative py-9 text-center px-2">
        <h2
          data-reveal
          className="mb-11 text-[clamp(2rem,4vw,2.6rem)] text-[#b7830f] font-script"
        >
          Blessings From
        </h2>

        <div
          data-reveal
          className="flex flex-col items-center justify-center gap-5 !mt-1"
        >
          <div className="min-w-[200px]">
            <div className="label mb-2.5 text-[#62471b]">
              Groom&apos;s Parents
            </div>
            <div className="font-['Cormorant_Garamond',serif] text-[1.3rem] text-[#62471b]">
              {CONFIG.groomParents}
            </div>
          </div>

          <div className="h-px w-[30%] bg-gradient-to-r from-transparent via-[#62471bab] to-transparent sm:h-[60px] sm:w-px" />

          <div className="min-w-[200px] pb-4">
            <div className="label mb-2.5 text-[#62471b]">
              Bride&apos;s Parents
            </div>
            <div className="font-['Cormorant_Garamond',serif] text-[1.3rem] text-[#62471b]">
              {CONFIG.brideParents}
            </div>
          </div>
        </div>

        {/* <div className="mt-[30px] font-[Poppins,sans-serif] text-[0.8rem] tracking-[0.08em] text-[#a3897a]">
          And Grandparents
        </div> */}
      </div>
    </section>
  );
}
