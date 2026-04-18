import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";

const features = [
  "Acesso vitalício ao método ProMota completo",
  "Planilha de controle financeiro do entregador",
  "Mapa de zonas e horários de alta demanda",
  "Comunidade fechada com +8.000 entregadores",
  "Atualizações semanais com novas estratégias",
  "Suporte direto pelo WhatsApp",
  "Garantia incondicional de 7 dias",
];

const Pricing = () => {
  return (
    <section id="planos" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            Investimento
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Menos de uma diária. Lucro pra vida toda.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Um único pagamento. Acesso vitalício. E uma garantia que tira todo o risco do seu lado.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary bg-primary p-1 shadow-elevated">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />

            <div className="relative rounded-[1.75rem] bg-primary p-10 text-primary-foreground md:p-12">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                    Plano Único · Acesso Vitalício
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold">ProMota Completo</h3>
                </div>
                <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-foreground">
                  Mais escolhido
                </span>
              </div>

              <div className="mt-8 flex items-end gap-3">
                <span className="text-base text-primary-foreground/60 line-through">
                  De R$ 497
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-7xl font-bold tracking-tighter text-accent">
                  R$ 197
                </span>
                <span className="text-base text-primary-foreground/70">à vista</span>
              </div>
              <p className="mt-1 text-sm text-primary-foreground/70">
                ou 12x de <strong className="text-primary-foreground">R$ 19,70</strong> no cartão
              </p>

              <div className="mt-8">
                <CountdownTimer />
              </div>

              <Button variant="torque" size="xl" className="mt-6 w-full">
                Quero transformar minhas entregas em lucro
              </Button>
              <p className="mt-3 text-center text-xs text-primary-foreground/60">
                Pagamento 100% seguro · Garantia de 7 dias
              </p>

              <ul className="mt-10 space-y-4 border-t border-primary-foreground/10 pt-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-base text-primary-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
