export function Divider() {
  return (
    <div className="mx-auto my-[22px] flex w-[min(260px,60%)] items-center justify-center gap-3.5">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2" className="h-[22px] w-[22px] shrink-0">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </div>
  )
}

export function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div data-reveal className="mb-14 text-center">
      <div className="label text-[var(--gold)]">{label}</div>
      <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] text-[var(--maroon)]">{title}</h2>
    </div>
  )
}
