import { createFileRoute } from "@tanstack/react-router";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Divider } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";
import couple from "@/assets/couple.jpg";

export const Route = createFileRoute("/hikoya")({
  head: () => ({
    meta: [
      { title: "Bizning hikoyamiz · Otabek & Kumush" },
      {
        name: "description",
        content: "Ikki qalbning uchrashuvi — Otabek va Kumushning muhabbat hikoyasi.",
      },
      { property: "og:title", content: "Bizning hikoyamiz · Otabek & Kumush" },
      {
        property: "og:description",
        content: "Sevgi — sabr bilan go'zal, vafo bilan abadiy bo'lur.",
      },
    ],
  }),
  component: HikoyaPage,
});

function HikoyaPage() {
  const { t } = useLang();

  return (
    <PageFrame nextTo="/marosim">
      <div className="flex flex-1 flex-col justify-center animate-rise text-center">
        <h1 className="font-display text-3xl italic text-gold">{t("storyTitle")}</h1>
        <Divider className="mt-3" />

        <div className="mt-6 space-y-5 font-display text-lg leading-relaxed text-foreground/90">
          <p>{t("story1")}</p>
          <p>{t("story2")}</p>
          <p>{t("story3")}</p>
        </div>

        <p className="mt-7 font-display text-xl italic text-gold/90">{t("storyQuote")}</p>

        <img
          src={couple}
          alt={`${t("groom")} & ${t("bride")}`}
          width={1024}
          height={1024}
          loading="lazy"
          className="mt-7 w-full rounded-2xl gold-frame object-cover"
        />
      </div>
    </PageFrame>
  );
}