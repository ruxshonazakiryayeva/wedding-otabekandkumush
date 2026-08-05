import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Crest } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";
import heroNight from "@/assets/hero-night.jpg";
import groom from "@/assets/groom.jpg";
import bride from "@/assets/bride.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Otabek & Kumush · To'y taklifnomasi 27.07.2027" },
      {
        name: "description",
        content:
          "Otabek va Kumushning nikoh to'yi taklifnomasi. 27.07.2027, Marg'ilon restorani, Farg'ona.",
      },
      { property: "og:title", content: "Otabek & Kumush · To'y taklifnomasi" },
      {
        property: "og:description",
        content: "Yulduzlar to'la osmon ostida — 27.07.2027, Marg'ilon restorani, Farg'ona.",
      },
    ],
  }),
  component: Index,
});

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-40 w-32 overflow-hidden rounded-[999px_999px_999px_999px] gold-frame">
      <img
        src={src}
        alt={alt}
        width={768}
        height={896}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function Index() {
  const { t } = useLang();

  return (
    <PageFrame backgroundImage={heroNight} overlay="soft" nextTo="/taklif">
      <div className="flex flex-1 flex-col items-center justify-center text-center animate-rise">
        <p className="font-display text-lg italic text-gold/90">{t("heroKicker")}</p>

        <h1 className="mt-2 font-display text-[3.5rem] leading-[1.05] text-gold-gradient">
          {t("groom")}
          <span className="block text-3xl italic text-foreground/85">&amp;</span>
          {t("bride")}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-sm tracking-[0.35em] text-foreground/90">
          <span className="text-gold">✧</span>
          27 · 07 · 2027
          <span className="text-gold">✧</span>
        </div>
        <p className="mt-3 text-[11px] tracking-[0.3em] text-foreground/70">{t("venue")}</p>

        <Crest className="mt-5" />

        <div className="mt-6 flex items-end justify-center gap-4">
          <Portrait src={groom} alt={t("groom")} />
          <Portrait src={bride} alt={t("bride")} />
        </div>

        <Link
          to="/taklif"
          className="mt-8 flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] text-foreground/70 transition-colors hover:text-gold"
        >
          <ChevronDown className="h-4 w-4 animate-bounce text-gold" />
          {t("down")}
        </Link>
      </div>
    </PageFrame>
  );
}
