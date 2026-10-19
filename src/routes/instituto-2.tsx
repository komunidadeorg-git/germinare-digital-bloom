import { createFileRoute } from "@tanstack/react-router";
import { OriginalSite } from "@/components/OriginalSite";
import html from "@/reference/instituto-2.html?raw";

export const Route = createFileRoute("/instituto-2")({
  head: () => ({ meta: [
    { title: "Instituto Kannacob — Germinare" },
    { name: "description", content: "Cursos de cannabis, extração e manufatura, canabinologia e imersão na Fazenda Santa Rosa." },
    { property: "og:title", content: "Instituto Kannacob — Germinare" },
    { property: "og:description", content: "Cursos de cannabis, extração e manufatura, canabinologia e imersão na Fazenda Santa Rosa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <OriginalSite html={html} />,
});
