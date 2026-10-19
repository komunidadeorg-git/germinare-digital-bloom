import { createFileRoute, Link } from "@tanstack/react-router";
import { Site, PageHero, products } from "@/components/Site";
import flower from "@/assets/flower.jpg";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Germinare" },
      { name: "description", content: "Flores de THC, CBD medicinal e Hemp com certificação GACP e GMP." },
      { property: "og:title", content: "Produtos — Germinare" },
      { property: "og:description", content: "Flores medicinais certificadas do Uruguai." },
    ],
  }),
  component: () => (
    <Site>
      <PageHero eyebrow="Produtos" title="Flores medicinais certificadas" img={flower} />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col rounded-2xl border border-border bg-card p-8">
            <h3 className="text-2xl text-primary">{p.name}</h3>
            <p className="mt-3 flex-1 text-muted-foreground">{p.desc}</p>
            <Link to="/contato" search={{ produto: p.name }} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-center font-semibold text-primary-foreground">Solicitar orçamento</Link>
          </div>
        ))}
      </section>
    </Site>
  ),
});
