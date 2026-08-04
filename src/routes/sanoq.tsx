import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Divider } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";
import heroNight from "@/assets/hero-night.jpg";

export const Route = createFileRoute("/sanoq")({
  head: () => ({
    meta: [
      { title: "To'yga qancha qoldi? · Otabek & Kumush" },
      {
        name: "description",
        content: "27.07.2027 to'y kunigacha qolgan kun, soat, daqiqa va soniyalar sanog'i.",
      },
      { property: "og:title", content: "To'yga qancha qoldi? · Otabek & Kumush" },
      { property: "og:description", content: "Baxtli kungacha sanoq davom etmoqda." },
    ],
  }),
  component: SanoqPage,
});

const TARGET = new Date("2027-07-27T18:00:00+05:00").getTime();

function useCountdown() {
  const [left, setLeft] = useState(() => Math.max(0, TARGET - Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(Math.max(0, TARGET - Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-full border border-gold/50 bg-night/50 backdrop-blur">
      <span className="font-display text-4xl text-gold-gradient">{value}</span>
      <span className="mt-1 text-[10px] tracking-[0.25em] text-foreground/70">{label}</span>
    </div>
  );
}

function SanoqPage() {
  const { t } = useLang();
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <PageFrame backgroundImage={heroNight} nextTo="/galereya">
      <div className="flex-1 animate-rise text-center">
        <h1 className="font-display text-2xl tracking-[0.15em] text-gold">
          {t("countdownTitle")}
        </h1>
        <Divider className="mt-3" />

        <div className="mx-auto mt-8 grid max-w-[19rem] grid-cols-2 gap-4">
          <Cell value={days} label={t("days")} />
          <Cell value={hours} label={t("hours")} />
          <Cell value={minutes} label={t("minutes")} />
          <Cell value={seconds} label={t("seconds")} />
        </div>
      </div>
    </PageFrame>
  );
}