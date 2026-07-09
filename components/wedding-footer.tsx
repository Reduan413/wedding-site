import { CONFIG } from '@/lib/wedding-config'

export function WeddingFooter() {
  return (
    <footer className="bg-[var(--maroon-deep)] px-5 pb-10 pt-14 text-center text-[var(--ivory-deep)]">
      <div className="mb-2.5 font-[Cinzel,serif] text-[1.6rem] text-[var(--gold-light)]">
        {CONFIG.brideFirst[0]} &amp; {CONFIG.groomFirst[0]}
      </div>
      <div className="mb-[18px] font-[Poppins,sans-serif] text-[0.75rem] tracking-[0.15em] text-[var(--gold)]">
        {CONFIG.hashtag}
      </div>
      <div className="text-[0.85rem] text-[#a3897a]">Made with love for our wedding day</div>
    </footer>
  )
}
