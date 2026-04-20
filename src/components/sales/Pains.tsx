import { TrendingDown, Clock, Wrench, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

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
    <section id="dores" className="bg-secondary/40 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cta">
            A dura realidade da pista
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Cansado de chegar em casa com as <span className="text-cta">mãos vazias</span>?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A maioria dos entregadores confunde "rodar muito" com "ganhar muito". 
            Trabalhar duro sem estratégia é a receita para o esgotamento.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pains.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 100}>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pains;
