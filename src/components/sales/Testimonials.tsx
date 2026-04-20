import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

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
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cta">
            Histórias de pista
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Quem aplica, <span className="text-cta">lucra mais</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((t, index) => (
            <Reveal key={t.name} delay={index * 100}>
              <article
                className="glass-card flex h-full flex-col rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex gap-1.5 text-cta">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-8 flex-1 text-xl leading-relaxed text-primary italic font-medium">
                  "{t.text}"
                </p>
                <div className="mt-10 flex items-center gap-5 border-t border-white/5 pt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-base font-black text-cta shadow-torque">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-primary">{t.name}</p>
                    <p className="text-sm font-semibold text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
