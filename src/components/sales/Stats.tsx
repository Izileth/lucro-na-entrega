import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "+47%", label: "de aumento médio no lucro líquido" },
  { value: "10h", label: "economizadas por semana com rotas inteligentes" },
  { value: "8.4k", label: "entregadores aplicando o método" },
  { value: "4.9★", label: "avaliação média dos alunos" },
];

const Stats = () => {
  return (
    <section id="resultados" className="gradient-asphalt py-20 text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {stats.map((s, index) => (
            <Reveal key={s.label} delay={index * 100}>
              <div className="text-center md:text-left">
                <p className="font-display text-5xl font-bold tracking-tighter text-cta md:text-6xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
