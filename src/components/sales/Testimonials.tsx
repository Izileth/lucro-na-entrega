import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const items = [
  {
    name: "Renato Almeida",
    role: "Motoboy · São Paulo, SP",
    initials: "RA",
    text: "Em 6 semanas, meu lucro líquido subiu 38%. O método me fez parar de aceitar corrida de qualquer jeito e focar no que paga.",
  },
  {
    name: "Mariana Silva",
    role: "App de comida · Rio de Janeiro, RJ",
    initials: "MS",
    text: "Eu rodava 12 horas e mal pagava as contas. Hoje rodo 9 horas e sobra dinheiro. Mudou minha vida e a da minha família.",
  },
  {
    name: "João Vitor",
    role: "Entregador autônomo · BH, MG",
    initials: "JV",
    text: "A planilha de controle financeiro foi um divisor de águas. Pela primeira vez sei exatamente quanto ganho de verdade.",
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t, index) => (
            <Reveal key={t.name} delay={index * 100}>
              <article
                className="flex h-full flex-col rounded-3xl border border-border bg-background p-8 shadow-card transition-all hover:border-cta/20"
              >
                <div className="flex gap-1 text-cta">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 flex-1 text-lg leading-relaxed text-primary">
                  "{t.text}"
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-cta">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
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
