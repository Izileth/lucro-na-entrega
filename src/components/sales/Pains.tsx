import { TrendingDown, Clock, Wrench, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const pains = [
  {
    icon: TrendingDown,
    title: "A 'Cilada' da Corrida Barata",
    text: "Aceitar qualquer pedido de R$ 5 faz você gastar combustível e tempo. No final do dia, você pagou para trabalhar e nem percebeu.",
  },
  {
    icon: Wrench,
    title: "Sua Moto é um Passivo",
    text: "Sem estratégia de rota, você roda km desnecessários. A manutenção vem antes do esperado e 'limpa' sua conta bancária.",
  },
  {
    icon: AlertTriangle,
    title: "Escravo do Algoritmo",
    text: "Rodar sem saber as zonas de alta demanda é contar com a sorte. O algoritmo lucra com sua desinformação enquanto você fica parado esperando.",
  },
];

const Pains = () => {
  return (
    <section id="dores" className="bg-secondary/40 py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] md:text-sm font-semibold uppercase tracking-widest text-cta">
            A dura realidade da pista
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-primary">
            Cansado de chegar em casa com as <span className="text-cta">mãos vazias</span>?
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground">
            A maioria dos entregadores confunde "rodar muito" com "ganhar muito". 
            Trabalhar duro sem estratégia é a receita para o esgotamento.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 relative px-1 md:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {pains.map(({ icon: Icon, title, text }, index) => (
                <CarouselItem key={title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={index * 100} className="h-full">
                    <div
                      className="group glass-card relative h-full overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-torque/20"
                    >
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-cta shadow-torque">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-primary leading-tight">{title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>
                      <div
                        aria-hidden
                        className="absolute bottom-0 left-0 h-1.5 w-0 bg-cta transition-all duration-700 group-hover:w-full"
                      />
                    </div>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12" />
            <CarouselNext className="right-0 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Pains;
