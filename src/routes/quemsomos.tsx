import { createFileRoute } from "@tanstack/react-router";
import { OriginalSite } from "@/components/OriginalSite";
import html from "@/reference/quemsomos.html?raw";

export const Route = createFileRoute("/quemsomos")({
  head: () => ({ meta: [
    { title: "Sobre nós — Germinare" },
    { name: "description", content: "Gustavo Mátar Galvão, nossa história e a produção sustentável na Fazenda Santa Rosa." },
    { property: "og:title", content: "Sobre nós — Germinare" },
    { property: "og:description", content: "Gustavo Mátar Galvão, nossa história e a produção sustentável na Fazenda Santa Rosa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <OriginalSite html={html} />,
});
