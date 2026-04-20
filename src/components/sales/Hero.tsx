import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/map.png";

const Hero = () => {
  return (
    <header id="top" className="relative overflow-hidden bg-background pt-4 md:pt-8">
      {/* Decorative Blur Elements */}
      <div className="absolute -left-24 top-0 h-64 w-64 md:h-96 md:w-96 rounded-full bg-cta/10 blur-[80px] md:blur-[120px]" />
      <div className="absolute -right-24 top-48 h-64 w-64 md:h-96 md:w-96 rounded-full bg-primary/5 blur-[80px] md:blur-[120px]" />
      
      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 pb-20 pt-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-20">
        <div className="animate-fade-up text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cta/20 bg-cta/5 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-cta">
            <Zap className="h-3 md:h-3.5 w-3 md:w-3.5" />
            Vagas limitadas para o novo método
          </div>

          <h1 className="font-display text-4xl font-bold leading-[0.9] tracking-tighter text-primary sm:text-6xl md:text-8xl lg:text-9xl">
            Acelere seu <span className="text-cta">lucro mensal</span>.
          </h1>

          <p className="mt-6 mx-auto md:mx-0 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-2xl">
            Pare de rodar no escuro. Domine as rotas, otimize seu tempo e multiplique seus ganhos com o sistema FastMotors.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button variant="torque" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#planos">
                Começar agora
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#metodo">Ver como funciona</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["JS", "RA", "ML", "VC"].map((i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] sm:text-xs font-bold text-primary-foreground"
                >
                  {i}
                </div>
              ))}
            </div>
            <span className="text-center sm:text-left">
              <strong className="text-primary">+8.400 entregadores</strong> já transformaram
              sua rotina
            </span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms] px-2 sm:px-0">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border shadow-elevated">
            <img
              src={heroImage}
              alt="Mapa e rotas inteligentes"
              width={1536}
              height={1024}
              className="aspect-square sm:aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent"
            />
            {/* Floating stat card */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 rounded-xl md:rounded-2xl border border-white/10 bg-primary/90 p-4 md:p-5 backdrop-blur-md">
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-cta">
                Ganho médio mensal
              </p>
              <p className="mt-1 md:mt-2 font-display text-2xl md:text-4xl font-bold text-primary-foreground">
                + R$ 1.847
              </p>
              <p className="mt-1 text-[10px] md:text-sm text-primary-foreground/70">
                após aplicar o método FastMotors
              </p>
            </div>
          </div>

          {/* Floating chip - Hidden on very small screens, visible from sm up */}
          <div className="absolute -left-2 top-8 hidden sm:block rounded-xl md:rounded-2xl border border-border bg-background px-3 py-2 md:px-4 md:py-3 shadow-card">
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Rotas otimizadas
            </p>
            <p className="font-display text-xl md:text-2xl font-bold text-primary">+47%</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
