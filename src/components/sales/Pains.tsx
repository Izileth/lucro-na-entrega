import { TrendingDown, Clock, Wrench } from "lucide-react";

const pains = [
  {
    icon: TrendingDown,
    title: "Corrida de valor baixo",
    text: "Aceitar qualquer pedido desperdiça combustível e tempo que poderiam virar entregas de margem maior.",
  },
  {
    icon: Wrench,
    title: "Desgaste prematuro da moto",
    text: "Sem estratégia de rota, sua moto sofre o dobro e a manutenção corrói seu lucro líquido.",
  },
  {
    icon: Clock,
    title: "Falta de previsão",
    text: "Rodar sem saber onde estão as zonas de alta demanda é trabalhar com os olhos vendados.",
  },
];

const Pains = () => {
  return (
    <section id="dores" className="bg-secondary/40 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            O que está te travando
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Você roda o dia inteiro e o dinheiro não sobra?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A maioria dos entregadores trabalha duro, mas perde lucro nos detalhes que
            ninguém ensina.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pains.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-card transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-cta">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{text}</p>
              <div
                aria-hidden
                className="absolute -bottom-1 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pains;
