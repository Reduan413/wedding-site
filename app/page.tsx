'use client'

import { useEffect, useState } from 'react'
import { Gate } from '@/components/gate'
import { WeddingHero } from '@/components/wedding-hero'
import { CoupleStory } from '@/components/couple-story'
import { Journey } from '@/components/journey'
import { EventsTimeline } from '@/components/events-timeline'
import { ParentsBlessing } from '@/components/parents-blessing'
import { BlessingSection } from '@/components/blessing-section'
import { Venue } from '@/components/venue'
import { Rsvp } from '@/components/rsvp'
import { WeddingFooter } from '@/components/wedding-footer'
import { BackgroundMusic } from '@/components/background-music'

export default function Page() {
  const [gateOpened, setGateOpened] = useState(false)

  // Lock scrolling while the gate is closed
  useEffect(() => {
    document.body.classList.toggle('locked', !gateOpened)
    return () => document.body.classList.remove('locked')
  }, [gateOpened])

  return (
    <main className="w-full bg-[var(--ivory)]">
      <BackgroundMusic />
      <Gate isOpened={gateOpened} onOpen={() => setGateOpened(true)} />

      {gateOpened && (
        <div>
          <WeddingHero />
          <CoupleStory />
          <Journey />
          <EventsTimeline />
          <ParentsBlessing />
          <BlessingSection />
          <Venue />
          <Rsvp />
          <WeddingFooter />
        </div>
      )}
    </main>
  )
}
