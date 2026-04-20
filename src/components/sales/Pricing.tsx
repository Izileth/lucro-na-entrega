import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import { Reveal } from "@/components/ui/reveal";

const features = [
  "Acesso vitalício ao método FastMotors completo",
  "Mapa de zonas e horários de alta demanda",
  "Garantia incondicional de 7 dias",
];

const Pricing = () => {
  return (
    <section id="planos" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cta">
            Investimento
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Menos de uma diária. <span className="text-cta">Lucro pra vida toda.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Um único pagamento. Acesso vitalício. E uma garantia que tira todo o risco do seu lado.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 md:mt-16 max-w-2xl" delay={200}>
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-cta/20 bg-primary p-0.5 md:p-1 shadow-torque/20">
            <div className="absolute -right-24 -top-24 h-64 w-64 md:h-80 md:w-80 rounded-full bg-cta/20 blur-[80px] md:blur-[100px]" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 md:h-80 md:w-80 rounded-full bg-cta/10 blur-[80px] md:blur-[100px]" />

            <div className="relative rounded-[1.8rem] md:rounded-[2.75rem] bg-primary p-6 sm:p-10 md:p-14 text-primary-foreground">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-cta mb-4 md:mb-6">
                  <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cta" />
                  </span>
                  Plano Único · Acesso Vitalício
                </span>
                <h3 className="font-display text-3xl font-bold md:text-5xl tracking-tight leading-tight">FastMotors <span className="text-cta">Completo</span></h3>
              </div>

              <div className="mt-8 md:mt-12 flex flex-col items-center">
                <span className="text-base md:text-xl text-primary-foreground/40 line-through font-medium">
                  De R$ 97
                </span>
                <div className="mt-1 md:mt-2 flex items-baseline gap-2">
                  <span className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-cta">
                    R$ 27
                  </span>
                  <span className="text-sm sm:text-xl font-bold text-primary-foreground/60">à vista</span>
                </div>
                <p className="mt-2 md:mt-4 text-base md:text-lg text-primary-foreground/70 text-center">
                  ou 2x de <strong className="text-primary-foreground">R$ 13,50</strong> no cartão
                </p>
              </div>

              <div className="mt-8 md:mt-12">
                <CountdownTimer />
              </div>

              <Button variant="torque" size="xl" className="mt-8 md:mt-10 w-full min-h-16 md:h-20 text-sm sm:text-base md:text-xl font-black uppercase tracking-wider rounded-xl md:rounded-2xl shadow-torque animate-torque-pulse whitespace-normal text-center py-4 md:py-2 px-6" asChild>
                <a href="https://pay.kiwify.com.br/qJdda9q" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center leading-tight">
                  Quero transformar minhas entregas em lucro
                </a>
              </Button>
              <p className="mt-4 text-center text-[10px] md:text-xs text-primary-foreground/60">
                Pagamento 100% seguro · Garantia de 7 dias
              </p>

              <ul className="mt-8 md:mt-10 space-y-3 md:space-y-4 border-t border-primary-foreground/10 pt-6 md:pt-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full bg-cta text-cta-foreground">
                      <Check className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm md:text-base text-primary-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
