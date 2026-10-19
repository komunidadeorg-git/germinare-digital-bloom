import { createFileRoute } from "@tanstack/react-router";
import { OriginalSite } from "@/components/OriginalSite";
import html from "@/reference/produtos.html?raw";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [
    { title: "Produtos — Germinare" },
    { name: "description", content: "Extratos de óleo CBD, gummies de THC Delta 9 e certificados de análise Germinare." },
    { property: "og:title", content: "Produtos — Germinare" },
    { property: "og:description", content: "Extratos de óleo CBD, gummies de THC Delta 9 e certificados de análise Germinare." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <OriginalSite html={html} />,
});
