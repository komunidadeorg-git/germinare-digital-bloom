import { createFileRoute } from "@tanstack/react-router";
import { OriginalSite } from "@/components/OriginalSite";
import html from "@/reference/home.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Germinare — Soluções inovadoras na indústria da cannabis" },
    { name: "description", content: "Cultivamos flores de cannabis e oferecemos consultoria, capacitação, genética e trading." },
    { property: "og:title", content: "Germinare — Soluções inovadoras na indústria da cannabis" },
    { property: "og:description", content: "Cultivamos flores de cannabis e oferecemos consultoria, capacitação, genética e trading." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <OriginalSite html={html} />,
});
