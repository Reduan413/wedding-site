export function Divider({iconClassName ="w-5.5 h-5.5", iconFill="#C9A24B", viaColor="via-[var(--gold)]"}: {iconClassName?: string, iconFill?: string, viaColor?: string}) {
  return (
    <div className="mx-auto my-[22px] flex w-[min(260px,60%)] items-center justify-center gap-3.5">
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${viaColor} to-transparent`} />
      {/* <svg viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2" className="h-[22px] w-[22px] shrink-0">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
      </svg> */}
      <svg viewBox="0 0 24 24" fill={iconFill} className={`${iconClassName}`}>
        <path d="M12 21s-7-4.6-9.5-9.1C1 8.5 2.6 5 6.1 5c2 0 3.4 1.1 4 2.4C10.7 6.1 12.1 5 14.1 5c3.5 0 5.1 3.5 3.6 6.9C15.2 16.4 12 21 12 21z" />
      </svg>
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${viaColor} to-transparent`} />
    </div>
  );
}

export function SectionHead({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div data-reveal className="mb-14 text-center">
      <div className="label text-[var(--gold)]">{label}</div>
      <h2 className="mt-2 text-[clamp(2rem,4vw,2.6rem)] font-script text-[var(--maroon)]">
        {title}
      </h2>
    </div>
  );
}
