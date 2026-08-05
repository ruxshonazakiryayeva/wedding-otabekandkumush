import { createFileRoute } from "@tanstack/react-router";
import { Heart, Instagram, Pause, Phone, Play, Send, SkipBack, SkipForward } from "lucide-react";

import { PageFrame } from "@/components/wedding/PageFrame";
import { AdminPanel } from "@/components/wedding/AdminPanel";
import { useLang } from "@/lib/i18n";
import { useMusic } from "@/lib/music";
import finale from "@/assets/finale.jpg";

export const Route = createFileRoute("/xayr")({
  head: () => ({
    meta: [
      { title: "Sizni intiqlik bilan kutamiz · Otabek & Kumush" },
      {
        name: "description",
        content: "Otabek & Kumush · 27.07.2027. Sizni to'y oqshomida intiqlik bilan kutamiz.",
      },
      { property: "og:title", content: "Sizni intiqlik bilan kutamiz!" },
      { property: "og:description", content: "Otabek & Kumush · 27.07.2027, Samarqand." },
    ],
  }),
  component: XayrPage,
});

function XayrPage() {
  const { t } = useLang();
  const { playing, toggle } = useMusic();

  return (
    <PageFrame backgroundImage={finale} overlay="soft">
      <div className="flex flex-1 flex-col items-center justify-end text-center animate-rise">
        <h1 className="px-2 font-display text-[2rem] italic leading-tight text-gold-gradient sm:text-[2.5rem]">
          {t("finalTitle")}
          <Heart className="ml-2 inline h-5 w-5 fill-rose text-rose" />
        </h1>

        <div className="mt-8 w-full max-w-md rounded-2xl border border-gold/40 bg-night/70 px-5 py-4 backdrop-blur">
          <p className="text-left font-display text-lg text-gold">{t("musicTitle")}</p>
          <p className="text-left text-xs text-foreground/60">
            {playing ? t("musicSub") : t("musicPaused")}
          </p>
          <div className="mt-3 h-px w-full bg-gold/30" />
          <div className="mt-4 flex items-center justify-center gap-5 text-gold">
            <SkipBack className="h-4 w-4 opacity-60" />
            <SkipBack className="h-4 w-4" />
            <button
              type="button"
              onClick={toggle}
              aria-label={t("musicTitle")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-night/60"
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-gold" />
              ) : (
                <Play className="h-5 w-5 fill-gold" />
              )}
            </button>
            <SkipForward className="h-4 w-4" />
            <SkipForward className="h-4 w-4 opacity-60" />
          </div>
        </div>

        <div className="mt-7 flex items-center gap-4">
          {[Instagram, Send, Phone].map((Icon, i) => (
            <span
              key={i}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold"
            >
              <Icon className="h-5 w-5" />
            </span>
          ))}
        </div>

        <div className="mt-8 mb-2 flex flex-col items-center text-center">
          <p className="text-xs text-gold/70">♥</p>
          <p className="font-display text-xl text-foreground/90">
            {t("groom")} &amp; {t("bride")}
          </p>
          <p className="mt-1 text-sm tracking-widest text-foreground/60">27.07.2027</p>
          <div className="mt-4">
            <AdminPanel />
          </div>
        </div>
      </div>
    </PageFrame>
  );
}