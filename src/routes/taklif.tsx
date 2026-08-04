import { createFileRoute } from "@tanstack/react-router";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Corner, Divider } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";
import garden from "@/assets/garden.jpg";

export const Route = createFileRoute("/taklif")({
  head: () => ({
    meta: [
      { title: "Taklifnoma · Otabek & Kumush" },
      {
        name: "description",
        content: "Aziz mehmonimiz, farzandlarimizning nikoh to'yiga lutfan taklif etamiz.",
      },
      { property: "og:title", content: "Taklifnoma · Otabek & Kumush" },
      {
        property: "og:description",
        content: "Aziz mehmonimiz, to'y oqshomiga lutfan taklif etamiz.",
      },
    ],
  }),
  component: TaklifPage,
});

function TaklifPage() {
  const { t } = useLang();

  return (
    <PageFrame nextTo="/hikoya">
      <div className="relative flex-1 animate-rise">
        <Corner className="absolute -left-2 -top-2" />
        <Corner className="absolute -right-2 -top-2 -scale-x-100" />

        <div className="paper-card mt-4 rounded-[2rem] px-6 py-8">
          <p className="mx-auto w-max rounded-full bg-night px-4 py-1.5 text-[10px] tracking-[0.25em] text-gold">
            {t("guest")}
          </p>

          <p className="mt-6 text-center font-display text-2xl leading-snug text-ink">
            {t("inviteA")}{" "}
            <span className="italic text-rose">{t("inviteB")}</span> {t("inviteC")}
          </p>

          <Divider className="mt-6 text-ink" />

          <img
            src={garden}
            alt="Samarqand bog'i"
            width={768}
            height={1024}
            loading="lazy"
            className="mt-6 h-64 w-full rounded-2xl border border-gold-deep/60 object-cover"
          />
        </div>

        <Corner className="absolute -bottom-2 -left-2 -scale-y-100" />
        <Corner className="absolute -bottom-2 -right-2 -scale-100" />
      </div>
    </PageFrame>
  );
}