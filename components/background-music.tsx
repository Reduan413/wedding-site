'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { Volume2, VolumeX } from 'lucide-react'

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Play/pause is driven directly by the user's click — no effects needed,
  // which also satisfies browser autoplay policies.
  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    gsap.to(buttonRef.current, { rotation: '+=360', duration: 0.6, ease: 'back.out(1.7)' })

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)) // browser blocked playback
    }
  }

  return (
    <>
      <audio ref={audioRef} loop src="/wedding-music.mp3" preload="none" />

      <button
        ref={buttonRef}
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-[1100] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--ivory)] shadow-[var(--shadow)] transition-transform duration-300 hover:scale-110"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        title={isPlaying ? 'Mute' : 'Play Music'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  )
}
