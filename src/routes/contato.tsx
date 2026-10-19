import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Site, PageHero } from "@/components/Site";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Germinare" },
      { name: "description", content: "Entre em contato com a Germinare para parcerias, orçamentos e cursos." },
      { property: "og:title", content: "Contato — Germinare" },
      { property: "og:description", content: "Fale com nossa equipe." },
    ],
  }),
  component: Contato,
});

function Contato() {
  const [produto, setProduto] = useState<string | null>(null);
  useEffect(() => setProduto(new URLSearchParams(window.location.search).get("produto")), []);
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-input bg-card px-4 py-3";
  return (
    <Site>
      <PageHero eyebrow="Contato" title="Vamos conversar" img={hero} />
      <section className="mx-auto max-w-xl px-5 py-20">
        {sent ? (
          <p className="rounded-2xl bg-secondary p-8 text-center text-lg">Obrigado! Retornaremos em breve.</p>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required placeholder="Nome" className={field} />
            <input required type="email" placeholder="E-mail" className={field} />
            <select defaultValue="" className={field}>
              <option value="" disabled>Sou…</option>
              {["Produtor", "Profissional", "Investidor", "Consumidor"].map((o) => <option key={o}>{o}</option>)}
            </select>
            <textarea key={produto ?? "x"} required rows={5} placeholder="Mensagem" defaultValue={produto ? `Tenho interesse em: ${produto}` : ""} className={field} />
            <button className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">Enviar</button>
          </form>
        )}
      </section>
    </Site>
  );
}
