import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const items = [
  {
    name: "Renato Almeida",
    role: "Motoboy · São Paulo, SP",
    initials: "RA",
    text: "Eu rodava no automático, aceitando praticamente tudo. No fim do mês parecia que ganhava bem, mas quando comecei a aplicar o método e cortar corridas ruins, percebi o quanto estava perdendo. Em 6 semanas, meu lucro líquido subiu 38% — sem trabalhar mais horas. Hoje eu escolho as corridas, não o contrário.",
  },
  {
    name: "Mariana Silva",
    role: "App de comida · Rio de Janeiro, RJ",
    initials: "MS",
    text: "Antes eu ficava 12 horas na rua e mesmo assim vivia apertada. Eu achava que o problema era falta de tempo, mas era estratégia. Ajustei minhas rotas, horários e regiões com base no método… resultado: reduzi para 9 horas por dia e comecei a ver dinheiro sobrando no fim do mês. Foi a primeira vez que senti controle de verdade.",
  },
  {
    name: "João Vitor",
    role: "Entregador autônomo · Belo Horizonte, MG",
    initials: "JV",
    text: "Eu nunca soube quanto realmente ganhava. Entrava dinheiro, mas também saía sem controle. Quando comecei a usar as dicas e aplicar o sistema de gestão, levei um choque: eu estava lucrando bem menos do que imaginava. Em poucos dias ajustei minha operação e hoje sei exatamente meu lucro por dia, por rota e por horário. Isso mudou completamente minha visão do trabalho.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-secondary/40 py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] md:text-sm font-semibold uppercase tracking-widest text-cta">
            Histórias de pista
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-primary">
            Quem aplica, <span className="text-cta">lucra mais</span>.
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {items.map((t, index) => (
                <CarouselItem key={t.name} className="pl-4 md:basis-full lg:basis-full">
                  <Reveal delay={index * 100} className="h-full">
                    <article
                      className="glass-card flex h-full flex-col rounded-[2.5rem] p-6 md:p-12 transition-all duration-500"
                    >
                      <div className="flex justify-center gap-1.5 text-cta mb-6 md:mb-8">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                        ))}
                      </div>
                      <p className="flex-1 text-base md:text-2xl leading-relaxed text-primary italic font-medium text-center">
                        "{t.text}"
                      </p>
                      <div className="mt-8 md:mt-10 flex flex-col items-center gap-3 md:gap-4 border-t border-white/5 pt-6 md:pt-8">
                        <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-primary text-lg md:text-xl font-black text-cta shadow-torque">
                          {t.initials}
                        </div>
                        <div className="text-center">
                          <p className="font-display text-lg md:text-xl font-bold text-primary">{t.name}</p>
                          <p className="text-[10px] md:text-sm font-semibold text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-6 md:mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
