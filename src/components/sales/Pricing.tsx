import { Check, Timer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import { Reveal } from "@/components/ui/reveal";

const mainFeatures = [
  "Acesso vitalício ao método FastMotors completo",
  "Mapa de zonas e horários de alta demanda",
  "Garantia incondicional de 7 dias",
];

const Pricing = () => {
  return (
    <section
      id="planos"
      className="py-16 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] md:text-sm font-semibold uppercase tracking-widest text-cta">
            Investimento único
          </p>

          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-primary leading-tight">
            Tudo isso por menos de{" "}
            <span className="text-cta">uma diária</span>.
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            O conhecimento que vai te economizar milhares de reais em combustível e manutenção, por um valor simbólico.
          </p>
        </Reveal>

        {/* Grid principal */}
        <div className="mt-12 md:mt-20 grid gap-8 lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* Left Side */}
          <Reveal className="mx-auto max-w-xl space-y-4 md:space-y-6 lg:mx-0 lg:space-y-8">
            
            <div className="flex flex-col items-start justify-center space-y-4 md:space-y-5">
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-cta" />
                <span className="text-sm md:text-lg leading-relaxed">
                  Pagamento Seguro via Kiwify
                </span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Timer className="h-5 w-5 text-cta" />
                <span className="text-sm md:text-lg leading-relaxed">
                  Acesso imediato após aprovação
                </span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Check className="h-5 w-5 text-cta" />
                <span className="text-sm md:text-lg leading-relaxed">
                  Garantia de Satisfação de 7 dias
                </span>
              </div>

            </div>
          </Reveal>

          {/* Right Side: Card */}
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-cta/20 bg-primary p-0.5 md:p-1 shadow-torque/20">
              
              <div className="relative rounded-[1.8rem] md:rounded-[2.75rem] bg-primary p-5 sm:p-10 md:p-12 text-primary-foreground">
                
                {/* Header do Card */}
                <div className="flex flex-col items-center text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-cta mb-4 md:mb-6">
                    Oferta de Lançamento
                  </span>

                  <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                    FastMotors{" "}
                    <span className="text-cta italic">Black Edition</span>
                  </h3>
                </div>

                {/* Preço */}
                <div className="mt-8 md:mt-10 flex flex-col items-center">
                  <span className="text-sm md:text-lg text-primary-foreground/40 line-through font-medium">
                    Total: R$ 97,00
                  </span>

                  <div className="mt-1 md:mt-2 flex items-baseline gap-2">
                    <span className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-cta">
                      R$ 27
                    </span>
                    <span className="text-xs md:text-sm font-bold text-primary-foreground/60">
                      único
                    </span>
                  </div>

                  <p className="mt-2 md:mt-3 text-xs md:text-sm text-primary-foreground/70">
                    Sem mensalidades. Sem pegadinhas.
                  </p>
                </div>

                {/* Timer */}
                <div className="mt-8 md:mt-10">
                  <CountdownTimer />
                </div>

                {/* CTA */}
                <Button
                  variant="torque"
                  size="xl"
                  className="mt-8 md:mt-10 w-full h-16 md:h-20 text-sm md:text-lg font-black uppercase tracking-wider rounded-2xl shadow-torque animate-torque-pulse"
                  asChild
                >
                  <a href="https://pay.kiwify.com.br/qJdda9q">
                    Quero lucrar mais agora
                  </a>
                </Button>

                {/* Features */}
                <ul className="mt-10 md:mt-12 space-y-3 md:space-y-4 border-t border-primary-foreground/10 pt-6 md:pt-8">
                  {mainFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className="h-4 w-4 md:h-5 md:w-5 shrink-0 text-cta"
                        strokeWidth={3}
                      />
                      <span className="text-xs md:text-sm text-primary-foreground/90 leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Pricing;