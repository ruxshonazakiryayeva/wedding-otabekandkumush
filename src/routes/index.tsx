import { createFileRoute } from "@tanstack/react-router";

import { WeddingPage } from "@/components/wedding/WeddingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Otabek & Kumush — To'y taklifnomasi | 27.07.2027" },
      {
        name: "description",
        content:
          "Otabek va Kumushning nikoh to'yi taklifnomasi. 27.07.2027, Marg'ilon restorani, Farg'ona. Ishtirokingizni onlayn tasdiqlang.",
      },
      { property: "og:title", content: "Otabek & Kumush — To'y taklifnomasi" },
      {
        property: "og:description",
        content: "27.07.2027, Marg'ilon restorani, Farg'ona. Sizni to'y oqshomiga taklif etamiz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingPage,
});
