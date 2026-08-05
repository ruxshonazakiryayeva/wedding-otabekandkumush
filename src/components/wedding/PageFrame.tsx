import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronUp, Music2, Pause } from "lucide-react";
import { useMemo, type ReactNode } from "react";

import { useLang, type Lang } from "@/lib/i18n";
import { useMusic } from "@/lib/music";

export const pageOrder = [
  "/",
  "/taklif",
  "/hikoya",
  "/marosim",
  "/sanoq",
  "/galereya",
  "/tasdiqlash",
  "/xayr",
] as const;

const langs: Lang[] = ["uz", "en", "ru"];

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: i % 5 === 0 ? 2.5 : 1.5,
        delay: (i % 8) * 0.5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full bg-gold-bright"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function TopBar() {
  const { lang, setLang, t } = useLang();

  return (
    <div className="relative z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 pt-5 sm:px-6">
      <Link
        to="/"
        className="flex w-max min-w-0 items-center gap-1.5 rounded-full border border-gold/40 bg-night/60 px-3 py-1.5 text-[11px] tracking-wide text-foreground/90 backdrop-blur transition-colors hover:border-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-gold" />
        <span className="truncate">{t("home")}</span>
      </Link>

      <div className="flex shrink-0 items-center gap-1 rounded-full border border-gold/30 bg-night/60 p-1 backdrop-blur">
        {langs.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${
              lang === l
                ? "bg-gold text-primary-foreground"
                : "text-foreground/70 hover:text-gold"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

type PagePath = (typeof pageOrder)[number];

function BottomBar({ nextTo }: { nextTo?: PagePath | undefined }) {
  const { t } = useLang();
  const { playing, toggle } = useMusic();

  return (
    <div className="relative z-20 flex items-end justify-between px-4 pb-6 sm:px-6">
      {nextTo ? (
        <Link
          to={nextTo}
          aria-label={t("next")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-night/70 text-gold backdrop-blur transition-transform hover:-translate-y-0.5"
        >
          <ChevronUp className="h-5 w-5" />
        </Link>
      ) : (
        <span className="h-11 w-11" />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={t("musicTitle")}
        aria-pressed={playing}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-night/70 text-gold backdrop-blur transition-transform hover:-translate-y-0.5 ${
          playing ? "border-gold shadow-[0_0_20px_-4px_var(--gold)]" : "border-gold/50"
        }`}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
      </button>
    </div>
  );
}

export function PageFrame({
  children,
  backgroundImage,
  nextTo,
  overlay = "strong",
}: {
  children: ReactNode;
  backgroundImage?: string;
  nextTo?: PagePath | undefined;
  overlay?: "strong" | "soft" | "none";
}) {
  return (
    <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col sm:max-w-xl lg:max-w-2xl">
      <div
        className="fixed inset-0"
        style={{ background: "var(--gradient-night)" }}
        aria-hidden="true"
      />
      {backgroundImage ? (
        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : null}
      {overlay !== "none" ? (
        <div
          className="fixed inset-0"
          aria-hidden="true"
          style={{
            background:
              overlay === "strong"
                ? "linear-gradient(180deg, oklch(0.12 0.045 266 / 0.75), oklch(0.12 0.045 266 / 0.9))"
                : "linear-gradient(180deg, oklch(0.12 0.045 266 / 0.45), oklch(0.12 0.045 266 / 0.75))",
          }}
        />
      ) : null}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <Stars />
      </div>

      <TopBar />
      <div className="relative z-10 flex flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
        {children}
      </div>
      <BottomBar nextTo={nextTo} />
    </main>
  );
}