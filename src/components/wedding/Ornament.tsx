export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="52" height="12" viewBox="0 0 52 12" fill="none" aria-hidden="true">
        <path
          d="M2 6c8-6 14 6 24 0s16 6 24 0"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold"
        />
        <circle cx="26" cy="6" r="2" className="fill-gold" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`h-14 w-14 text-gold/70 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 78V22C2 11 11 2 22 2h56" stroke="currentColor" strokeWidth="1" />
      <path d="M10 78V26c0-9 7-16 16-16h52" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function Crest({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      className={`h-9 w-28 text-gold ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 4c-4 6-12 8-20 6-10-2-18 2-20 10 6-4 14-4 20 2 5 5 13 7 20 2 7 5 15 3 20-2 6-6 14-6 20-2-2-8-10-12-20-10-8 2-16 0-20-6Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <circle cx="60" cy="26" r="3" fill="currentColor" />
      <path d="M20 34h80" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}