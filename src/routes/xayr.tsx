import { createFileRoute } from "@tanstack/react-router";
import { Heart, Instagram, Pause, Phone, Play, Send, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

import { PageFrame } from "@/components/wedding/PageFrame";
import { useLang } from "@/lib/i18n";
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
  const [playing, setPlaying] = useState(true);

  return (
    <PageFrame backgroundImage={finale} overlay="soft">
      <div className="flex flex-1 flex-col items-center justify-end text-center animate-rise">
        <h1 className="font-display text-4xl italic leading-tight text-gold-gradient">
          {t("finalTitle")}
          <Heart className="ml-2 inline h-5 w-5 fill-rose text-rose" />
        </h1>

        <div className="mt-8 w-full rounded-2xl border border-gold/40 bg-night/70 px-5 py-4 backdrop-blur">
          <p className="text-left font-display text-lg text-gold">{t("musicTitle")}</p>
          <p className="text-left text-xs text-foreground/60">{t("musicSub")}</p>
          <div className="mt-3 h-px w-full bg-gold/30" />
          <div className="mt-4 flex items-center justify-center gap-5 text-gold">
            <SkipBack className="h-4 w-4 opacity-60" />
            <SkipBack className="h-4 w-4" />
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
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

        <div className="mt-8 mb-2 text-center">
          <p className="text-xs text-gold/70">♥</p>
          <p className="font-display text-xl text-foreground/90">
            {t("groom")} &amp; {t("bride")}
          </p>
          <p className="mt-1 text-sm tracking-widest text-foreground/60">27.07.2027</p>
        </div>
      </div>
    </PageFrame>
  );
}