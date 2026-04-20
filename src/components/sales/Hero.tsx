import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp, Navigation, DollarSign, MapPin, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <header id="top" className="relative overflow-hidden bg-background pt-4 md:pt-8">
      {/* Decorative Blur Elements */}
      <div className="absolute -left-24 top-0 h-64 w-64 md:h-96 md:w-96 rounded-full bg-cta/10 blur-[80px] md:blur-[120px]" />
      <div className="absolute -right-24 top-48 h-64 w-64 md:h-96 md:w-96 rounded-full bg-primary/5 blur-[80px] md:blur-[120px]" />
      
      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-20 md:pt-20">
        <div className="animate-fade-up text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cta/20 bg-cta/5 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-cta">
            <Zap className="h-3 md:h-3.5 w-3 md:w-3.5" />
            Método atualizado 2024 • Vagas limitadas
          </div>

          <h1 className="font-display text-4xl font-bold leading-[0.9] tracking-tighter text-primary sm:text-6xl md:text-8xl lg:text-9xl">
            Pare de <span className="text-cta">pagar para</span> trabalhar.
          </h1>

          <p className="mt-6 mx-auto md:mx-0 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-2xl">
            Você não precisa de mais horas na rua. Você precisa de <span className="text-primary font-bold">estratégia de pista</span> para dobrar seu lucro líquido e voltar cedo para casa.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button variant="torque" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#planos">
                Quero o Método FastMotors
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#metodo">Ver os 4 passos</a>
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
              <strong className="text-primary">+8.400 entregadores</strong> já lucram mais
            </span>
          </div>

          {/* Trust Bar / Compatibility */}
          <div className="mt-12 border-t border-border pt-8 hidden md:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Compatível com todos os apps:</p>
            <div className="flex gap-6 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
               <span className="font-display font-black text-xl italic">iFood</span>
               <span className="font-display font-black text-xl italic">UberEats</span>
               <span className="font-display font-black text-xl italic">Rappi</span>
               <span className="font-display font-black text-xl italic">Loggi</span>
            </div>
          </div>
        </div>

        {/* Dynamic Dashboard Visual */}
        <div className="relative animate-fade-up [animation-delay:120ms] px-2 sm:px-0">
          <div className="relative aspect-square sm:aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-[#0A0A0B] shadow-2xl">
            {/* SVG Background Grid */}
            <svg className="absolute inset-0 h-full w-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Dashboard Content */}
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col">
              <div className="relative flex-1 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full">
                  <path d="M30,210 L50,190 L40,160 L70,150 L60,120 L90,110 L80,80 L110,70" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 2" className="opacity-20" />
                  <path d="M30,210 C60,210 80,170 110,150 C140,130 160,90 170,50" fill="none" stroke="currentColor" strokeWidth="3" className="text-cta drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-draw" strokeLinecap="round" />
                  <circle cx="30" cy="210" r="4" className="fill-cta" />
                  <circle cx="170" cy="50" r="6" className="fill-cta animate-pulse" />
                  <g className="animate-float">
                    <rect x="115" y="135" width="60" height="15" rx="4" className="fill-black/80 stroke-white/10" />
                    <text x="120" y="145" fontSize="6" className="fill-white font-bold uppercase">Zona de Alta Demanda</text>
                  </g>
                </svg>

                <div className="absolute left-4 top-1/4 animate-float [animation-delay:0.5s]">
                   <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-md">
                     <div className="h-6 w-6 rounded bg-cta/20 flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 text-cta" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[8px] text-white/40 uppercase font-black">Margem</span>
                        <span className="text-[10px] font-bold text-white">+38% Lucro</span>
                     </div>
                   </div>
                </div>

                <div className="absolute right-4 bottom-1/4 animate-float [animation-delay:1.5s]">
                   <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-md">
                     <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                        <Navigation className="h-3 w-3 text-cta" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[8px] text-white/40 uppercase font-black">Status</span>
                        <span className="text-[10px] font-bold text-white">Rota Otimizada</span>
                     </div>
                   </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between bg-white/[0.03] rounded-xl p-4 border border-white/5">
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Ganho Acumulado</p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-display font-bold text-white">R$ 4.250</span>
                      <span className="text-xs text-cta font-bold">+18% hoje</span>
                   </div>
                </div>
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-cta flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                   <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-12 hidden sm:block rounded-2xl border border-white/10 bg-background/80 p-4 backdrop-blur-xl shadow-2xl animate-float">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta/10 text-cta">
                <Navigation className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Tempo em Pista</p>
                <p className="text-xl font-bold text-primary">-2h <span className="text-xs text-cta">/dia</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
