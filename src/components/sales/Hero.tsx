import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-motoboy.jpg";

const Hero = () => {
  return (
    <header id="top" className="relative overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-glow)" }}
      />

      <div className="container mx-auto grid items-center gap-16 px-6 pb-24 pt-16 md:grid-cols-[1.1fr_1fr] md:pt-24">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-accent" />
            Para entregadores que querem mais
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter text-primary sm:text-6xl md:text-7xl">
            Transforme cada entrega em <span className="text-accent">lucro de verdade</span>.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Pare de rodar no escuro aceitando qualquer corrida. Domine suas rotas, escolha as
            melhores oportunidades e veja seu faturamento decolar — sem trabalhar mais horas.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="torque" size="xl" asChild>
              <a href="#planos">
                Começar agora
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="xl" asChild>
              <a href="#metodo">Ver como funciona</a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["JS", "RA", "ML", "VC"].map((i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground"
                >
                  {i}
                </div>
              ))}
            </div>
            <span>
              <strong className="text-primary">+8.400 entregadores</strong> já transformaram
              sua rotina
            </span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img
              src={heroImage}
              alt="Motoboy entregador no asfalto durante o pôr do sol"
              width={1536}
              height={1024}
              className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent"
            />
            {/* Floating stat card */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-primary/90 p-5 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Ganho médio mensal
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-primary-foreground">
                + R$ 1.847
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">
                após aplicar o método ProMota
              </p>
            </div>
          </div>

          {/* Floating chip */}
          <div className="absolute -left-4 top-8 hidden rounded-2xl border border-border bg-background px-4 py-3 shadow-card md:block">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Rotas otimizadas
            </p>
            <p className="font-display text-2xl font-bold text-primary">+47%</p>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="border-y border-border bg-secondary/40 py-6">
        <div className="container mx-auto px-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Compatível com os principais apps
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-base font-bold text-primary/60">
            <span>iFood</span>
            <span>·</span>
            <span>Uber Eats</span>
            <span>·</span>
            <span>Rappi</span>
            <span>·</span>
            <span>99Food</span>
            <span>·</span>
            <span>Loggi</span>
            <span>·</span>
            <span>Lalamove</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
