import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Map, MapPin } from "lucide-react";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Crest } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/marosim")({
  head: () => ({
    meta: [
      { title: "To'y marosimi · 27.07.2027 Navro'z Saroyi" },
      {
        name: "description",
        content: "To'y marosimi: 27.07.2027, seshanba, 18:00, Marg’ilon Restorani (To’yxona), Farg'ona shahri.",
      },
      { property: "og:title", content: "To'y marosimi · Otabek & Kumush" },
      {
        property: "og:description",
        content: "27.07.2027, 18:00 — Marg’ilon Restorani (To’yxona), Farg'ona shahri.",
      },
    ],
  }),
  component: MarosimPage,
});

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gold-deep/40 bg-paper/40 px-4 py-3">
      <span className="mt-1 text-ink-soft">{icon}</span>
      <div>
        <p className="text-[10px] tracking-[0.25em] text-ink-soft">{label}</p>
        <div className="mt-1 font-display text-lg leading-tight text-ink">{children}</div>
      </div>
    </div>
  );
}

function MarosimPage() {
  const { t } = useLang();

  return (
    <PageFrame nextTo="/sanoq">
      <div className="flex flex-1 flex-col justify-center animate-rise">
        <div className="paper-card rounded-[2rem] px-5 py-7">
          <Crest className="mx-auto text-gold-deep" />
          <h1 className="mt-2 text-center font-display text-2xl tracking-[0.15em] text-ink">
            {t("ceremonyTitle")}
          </h1>

          <div className="mt-6 space-y-3">
            <Row icon={<CalendarDays className="h-5 w-5" />} label={t("date")}>
              {t("dateVal")}
              <span className="block text-sm text-ink-soft">{t("weekday")}</span>
            </Row>
            <Row icon={<Clock className="h-5 w-5" />} label={t("time")}>
              {t("timeVal")}
            </Row>
            <Row icon={<MapPin className="h-5 w-5" />} label={t("place")}>
              {t("placeVal")}
              <span className="block text-sm text-ink-soft">{t("placeVal2")}</span>
            </Row>
            <Row icon={<Map className="h-5 w-5" />} label={t("map")}>
              <a
                href="https://yandex.uz/maps/-/CTC~iM8H"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex rounded-full bg-night px-4 py-2 text-xs tracking-wide text-gold transition-colors hover:bg-night-deep"
              >
                {t("mapBtn")}
              </a>
            </Row>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
