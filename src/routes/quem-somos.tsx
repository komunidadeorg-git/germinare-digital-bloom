import { createFileRoute } from "@tanstack/react-router";
import { Site, PageHero } from "@/components/Site";
import quemSomosAsset from "@/assets/quem-somos.jpg.asset.json";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Germinare" },
      { name: "description", content: "Conheça a Germinare, produtora de cannabis medicinal em Pando, Uruguai." },
      { property: "og:title", content: "Quem Somos — Germinare" },
      { property: "og:description", content: "Nossa história, missão e coletivo de produtores." },
    ],
  }),
  component: () => (
    <Site>
      <PageHero eyebrow="Quem somos" title="Cultivando o futuro da cannabis medicinal" img={farm} />
      <section className="mx-auto max-w-3xl space-y-6 px-5 py-20 text-lg text-muted-foreground">
        <p>Acreditamos que pequenos e médios produtores podem impulsionar uma renovação econômica e ambiental. Por isso, integramos um coletivo crescente de produtores uruguaios.</p>
        <p>Nossa união promove cooperação e padronização das melhores práticas de cultivo, oferecendo produtos com potencial de referência mundial.</p>
        <p>Por meio de uma comunidade global que conecta a indústria, queremos ampliar o acesso a medicamentos de qualidade por um preço justo.</p>
      </section>
    </Site>
  ),
});
