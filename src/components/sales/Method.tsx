import { Target, Map, Wallet, BarChart3 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const steps = [
  {
    icon: Target,
    step: "01",
    title: "Diagnóstico do seu jogo",
    text: "Mapeamos seus ganhos, despesas e padrões para identificar onde você está perdendo dinheiro hoje.",
  },
  {
    icon: Map,
    step: "02",
    title: "Estratégia de rota inteligente",
    text: "Você aprende a escolher zonas, horários e pedidos que pagam mais — e a recusar os que não valem a pena.",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Controle financeiro de pista",
    text: "Implantamos um sistema simples para você saber, em tempo real, quanto está sobrando após combustível e manutenção.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Crescimento previsível",
    text: "Com dados na mão, você projeta meses, monta reserva e investe no que faz seu lucro crescer mês após mês.",
  },
];

const Method = () => {
  return (
    <section id="metodo" className="py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal className="grid items-end gap-8 md:gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[10px] md:text-sm font-semibold uppercase tracking-widest text-cta">
              O Método FastMotors
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-primary">
              4 passos para sair do sufoco e <span className="text-cta">entrar no lucro</span>.
            </h2>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Não é mais um curso teórico. É um sistema testado por milhares de entregadores
            no Brasil — direto, prático e focado em resultado no fim do mês.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {steps.map(({ icon: Icon, step, title, text }, index) => (
                <CarouselItem key={step} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Reveal delay={index * 100} className="h-full">
                    <article
                      className="glass-card relative flex-col sm:flex  h-full gap-8 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-torque/10"
                    >
                      <div className="shrink-0">
                        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-[1.5rem] bg-primary text-cta shadow-torque">
                          <Icon className="h-8 w-8 md:h-10 md:w-10" />
                        </div>
                      </div>
                      <div>
                        <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-cta/60">
                          ETAPA {step}
                        </span>
                        <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-primary leading-tight">{title}</h3>
                        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">{text}</p>
                      </div>
                    </article>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-4 mt-8 md:absolute md:-top-20 md:right-0">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Method;
