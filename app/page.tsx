"use client";

import { BackgroundMusic } from "@/components/background-music";
import { BlessingSection } from "@/components/blessing-section";
import { CoupleStory } from "@/components/couple-story";
import { EventsTimeline } from "@/components/events-timeline";
import { Gate } from "@/components/gate";
import { Journey } from "@/components/journey";
import { ParentsBlessing } from "@/components/parents-blessing";
import { Rsvp } from "@/components/rsvp";
import ScratchToReveal from "@/components/ScratchToReveal";
import { Venue } from "@/components/venue";
import { WeddingFooter } from "@/components/wedding-footer";
import { WeddingHero } from "@/components/wedding-hero";
import { useEffect, useState } from "react";

export default function Page() {
  const [gateOpened, setGateOpened] = useState(false);

  // Lock scrolling while the gate is closed
  useEffect(() => {
    document.body.classList.toggle("locked", !gateOpened);
    return () => document.body.classList.remove("locked");
  }, [gateOpened]);

  return (
    <main className="w-full bg-[var(--ivory)]">
      <BackgroundMusic />
      <Gate isOpened={gateOpened} onOpen={() => setGateOpened(true)} />

      {gateOpened && (
        <div>
          <WeddingHero />
          <CoupleStory />

          {/* <Journey /> */}
          <ScratchToReveal
            coupleNames="Emma & Julian"
            eventDate="June 30, 2026"
            eventDay="Tuesday"
            eventTime="10:00 AM"
            venue="The Wildflower Garden"
          />
          <EventsTimeline />
          <ParentsBlessing />
          <BlessingSection />
          <Venue />
          {/* <Rsvp /> */}

          <WeddingFooter />
        </div>
      )}
    </main>
  );
}
