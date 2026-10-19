import { createFileRoute, Link } from "@tanstack/react-router";
import { Site, products } from "@/components/Site";
import heroAsset from "@/assets/hero.jpg.asset.json";
import farmAsset from "@/assets/farm.jpg.asset.json";
import flowerAsset from "@/assets/flower.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Germinare — Cannabis medicinal do Uruguai" },
      { name: "description", content: "Cultivo de flores de THC, CBD e Hemp com certificação GACP e GMP, consultoria, capacitação, genética e trading." },
      { property: "og:title", content: "Germinare — Cannabis medicinal do Uruguai" },
      { property: "og:description", content: "Flores medicinais certificadas, consultoria e capacitação." },
    ],
  }),
  component: Index,
});

const publics = [
  { t: "Produtores", d: "Cursos e workshops para capacitar equipes de propriedades de qualquer porte." },
  { t: "Profissionais", d: "Imersão na fazenda, acompanhamento da produção e cursos modulares." },
  { t: "Investidores", d: "Acesso à produção outdoor e indoor de Hemp, THC e CBD medicinal." },
  { t: "Consumidores", d: "Composição transparente, preço justo e variedade de flores orgânicas." },
];

function Index() {
  return (
    <Site>
      <section className="relative overflow-hidden bg-deep text-deep-foreground">
        <img src={hero} alt="Estufa de cannabis ao pôr do sol" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 py-32 md:py-44">
          <h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">Soluções inovadoras na indústria da cannabis</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">Cultivamos flores medicinais e oferecemos consultoria, capacitação, genética e trading.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/produtos" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">Ver produtos</Link>
            <Link to="/contato" className="rounded-full border border-deep-foreground/40 px-6 py-3 font-semibold">Fale conosco</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-2xl text-primary">{p.name}</h3>
            <p className="mt-3 text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 md:grid-cols-2">
        <img src={farm} alt="Produtores no campo" loading="lazy" width={1024} height={1024} className="rounded-3xl" />
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">Um pouco sobre nós</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Cannabis medicinal para saúde e bem-estar</h2>
          <p className="mt-5 text-muted-foreground">Fazemos parte de um coletivo de produtores uruguaios que compartilham boas práticas de cultivo para fortalecer uma indústria local pioneira no continente.</p>
          <Link to="/quem-somos" className="mt-6 inline-block font-semibold text-primary underline">Saiba mais →</Link>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-4xl">Para quem trabalhamos</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publics.map((p) => (
              <div key={p.t} className="rounded-2xl bg-card p-6">
                <h3 className="text-xl text-primary">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl md:text-4xl">Conheça nossos produtos</h2>
          <p className="mt-4 text-muted-foreground">Buscamos parceiros estratégicos para levar medicamentos de qualidade a mais pessoas, por um preço justo.</p>
          <Link to="/produtos" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Produtos</Link>
        </div>
        <img src={flower} alt="Flor de cannabis" loading="lazy" width={1024} height={1024} className="rounded-3xl" />
      </section>
    </Site>
  );
}
