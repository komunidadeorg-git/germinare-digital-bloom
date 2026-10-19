import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/produtos", label: "Produtos" },
  { to: "/contato", label: "Contato" },
] as const;

export function Site({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-2xl font-semibold text-primary">Germinare</Link>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="text-muted-foreground hover:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
          <button aria-label="Menu" className="md:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t border-border px-5 py-4 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Germinare</p>
            <p className="mt-2 text-sm opacity-75">Empresa especializada na indústria da cannabis.</p>
            <div className="mt-4 flex gap-4 text-sm">
              <a href="https://www.instagram.com/germinare.official/" target="_blank" rel="noreferrer" className="underline">Instagram</a>
              <a href="https://www.facebook.com/germinare.official" target="_blank" rel="noreferrer" className="underline">Facebook</a>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link></li>)}
          </ul>
          <div className="text-sm opacity-80">
            <p>Fazenda Santa Rosa — Pando, Uruguai</p>
            <p className="mt-4">© {new Date().getFullYear()} Germinare SAS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ eyebrow, title, img }: { eyebrow: string; title: string; img: string }) {
  return (
    <section className="relative overflow-hidden bg-deep text-deep-foreground">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <p className="text-sm uppercase tracking-widest text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl text-4xl md:text-5xl">{title}</h1>
      </div>
    </section>
  );
}

export const products = [
  { name: "Flores de THC Medicinal", desc: "Alta concentração de THC. Cultivo em estufa e indoor, certificação GACP e GMP." },
  { name: "Flores de CBD Medicinal", desc: "Ricas em CBD e com baixo THC. Cultivo em estufa, certificação GACP e GMP." },
  { name: "Flores de Hemp", desc: "Ricas em CBD e com baixo THC. Cultivo em campo aberto, certificação GACP." },
];
