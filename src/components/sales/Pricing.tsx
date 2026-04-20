import { Check, Gift, Timer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import { Reveal } from "@/components/ui/reveal";

const mainFeatures = [
  "Acesso vitalício ao método FastMotors completo",
  "Mapa de zonas e horários de alta demanda",
  "Garantia incondicional de 7 dias",
];

const bonuses = [
  { name: "Planilha de Lucro Real (Excel/Mobile)", value: "R$ 47" },
  { name: "Guia: Manutenção que Economiza R$ 200/mês", value: "R$ 37" },
  { name: "Comunidade VIP: Estratégias de Pista", value: "R$ 97" },
];

const Pricing = () => {
  return (
    <section id="planos" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cta">
            Investimento único
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Tudo isso por menos de <span className="text-cta">uma diária</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            O conhecimento que vai te economizar milhares de reais em combustível e manutenção, por um valor simbólico.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left Side: Value Stacking */}
          <Reveal className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-6">
                <Gift className="h-5 w-5 text-cta" />
                Você vai levar de GRAÇA:
              </h3>
              <div className="grid gap-4">
                {bonuses.map((b) => (
                  <div key={b.name} className="flex items-center justify-between rounded-2xl border border-border bg-secondary/50 p-4">
                    <span className="text-sm md:text-base font-medium text-primary">{b.name}</span>
                    <span className="text-xs font-bold text-muted-foreground line-through">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-cta" />
                  <span className="text-sm">Pagamento Seguro via Kiwify</span>
               </div>
               <div className="flex items-center gap-3 text-muted-foreground">
                  <Timer className="h-5 w-5 text-cta" />
                  <span className="text-sm">Acesso imediato após aprovação</span>
               </div>
            </div>
          </Reveal>

          {/* Right Side: The Card */}
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-cta/20 bg-primary p-0.5 md:p-1 shadow-torque/20">
              <div className="relative rounded-[1.8rem] md:rounded-[2.75rem] bg-primary p-6 sm:p-10 md:p-12 text-primary-foreground">
                <div className="flex flex-col items-center text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-cta mb-6">
                    Oferta de Lançamento
                  </span>
                  <h3 className="font-display text-3xl font-bold md:text-4xl tracking-tight leading-tight">FastMotors <span className="text-cta italic">Black Edition</span></h3>
                </div>

                <div className="mt-8 flex flex-col items-center">
                  <span className="text-lg text-primary-foreground/40 line-through font-medium">
                    Total: R$ 208,00
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-cta">
                      R$ 27
                    </span>
                    <span className="text-sm font-bold text-primary-foreground/60">único</span>
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/70">
                    Sem mensalidades. Sem pegadinhas.
                  </p>
                </div>

                <div className="mt-8">
                  <CountdownTimer />
                </div>

                <Button variant="torque" size="xl" className="mt-8 w-full h-20 text-base md:text-lg font-black uppercase tracking-wider rounded-2xl shadow-torque animate-torque-pulse" asChild>
                  <a href="https://pay.kiwify.com.br/qJdda9q">
                    Quero lucrar mais agora
                  </a>
                </Button>
                
                <ul className="mt-10 space-y-4 border-t border-primary-foreground/10 pt-8">
                  {mainFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-cta" strokeWidth={3} />
                      <span className="text-sm text-primary-foreground/90">{f}</span>
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
