import { createFileRoute } from "@tanstack/react-router";
import { OriginalSite } from "@/components/OriginalSite";
import html from "@/reference/contato.html?raw";

export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [
    { title: "Contato — Germinare" },
    { name: "description", content: "Fale com a Germinare sobre encomendas, produção, consultoria e treinamento." },
    { property: "og:title", content: "Contato — Germinare" },
    { property: "og:description", content: "Fale com a Germinare sobre encomendas, produção, consultoria e treinamento." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <OriginalSite html={html} />,
});
