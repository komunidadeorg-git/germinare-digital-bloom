import { createFileRoute } from "@tanstack/react-router";
import { OriginalSite } from "@/components/OriginalSite";
import html from "@/reference/quemsomos.html?raw";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({ meta: [
    { title: "Quem Somos — Germinare" },
    { name: "description", content: "Conheça a história da Germinare, sua missão, visão, valores e equipe." },
    { property: "og:title", content: "Quem Somos — Germinare" },
    { property: "og:description", content: "Conheça a história da Germinare, sua missão, visão, valores e equipe." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <OriginalSite html={html} />,
});
