import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden gradient-asphalt py-24 text-primary-foreground md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="container relative mx-auto px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cta">
          A decisão é sua
        </p>
        <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold tracking-tighter md:text-6xl">
          Continuar rodando no escuro ou{" "}
          <span className="text-cta">virar a chave hoje</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70">
          Em 5 minutos você está dentro. Em 7 dias você decide se fica. Em 60 dias, seu bolso
          já vai estar agradecendo.
        </p>
        <Button variant="torque" size="xl" className="mt-10" asChild>
          <a href="#planos">
            Quero entrar agora
            <ArrowRight className="ml-1 h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default FinalCta;
