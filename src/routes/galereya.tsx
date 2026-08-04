import { createFileRoute } from "@tanstack/react-router";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Divider } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import couple from "@/assets/couple.jpg";
import garden from "@/assets/garden.jpg";

export const Route = createFileRoute("/galereya")({
  head: () => ({
    meta: [
      { title: "Galereya · Otabek & Kumush" },
      {
        name: "description",
        content: "Otabek va Kumushning suratlari — Samarqand bahori va sevgi lahzalari.",
      },
      { property: "og:title", content: "Galereya · Otabek & Kumush" },
      { property: "og:description", content: "Sevgi lahzalari suratlarda." },
    ],
  }),
  component: GalereyaPage,
});

function Frame({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl gold-frame ${className}`}>
      <img
        src={src}
        alt="Otabek va Kumush"
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}

function GalereyaPage() {
  const { t } = useLang();

  return (
    <PageFrame nextTo="/tasdiqlash">
      <div className="flex flex-1 flex-col justify-center animate-rise">
        <h1 className="text-center font-display text-2xl tracking-[0.2em] text-gold">
          {t("galleryTitle")}
        </h1>
        <Divider className="mt-3" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Frame src={gallery1} className="col-span-2 h-44" />
          <Frame src={gallery2} className="h-48" />
          <Frame src={garden} className="h-48" />
          <Frame src={gallery3} className="col-span-2 h-40" />
          <Frame src={couple} className="col-span-2 h-52" />
        </div>
      </div>
    </PageFrame>
  );
}