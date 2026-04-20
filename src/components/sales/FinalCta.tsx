import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden gradient-asphalt py-24 text-primary-foreground md:py-48">
      {/* Decorative glows */}
      <div className="absolute -left-24 top-0 h-64 w-64 md:h-96 md:w-96 rounded-full bg-cta/10 blur-[80px] md:blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 md:h-96 md:w-96 rounded-full bg-cta/5 blur-[80px] md:blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <p className="mb-6 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-cta">
            A decisão é sua
          </p>
          <h2 className="mx-auto max-w-4xl text-balance font-display text-4xl sm:text-6xl md:text-8xl leading-[1] md:leading-[0.9] font-bold tracking-tight">
            Pare de rodar no escuro e <span className="text-cta italic">vire a chave</span> hoje.
          </h2>
          <p className="mx-auto mt-8 md:mt-10 max-w-2xl text-base sm:text-xl md:text-2xl text-primary-foreground/60 leading-relaxed">
            Em 5 minutos você está dentro. Em 7 dias você decide se fica. Seu futuro lucro começa agora.
          </p>
          <Button variant="torque" size="xl" className="mt-10 md:mt-12 h-16 md:h-20 px-8 md:px-12 text-base md:text-xl font-black uppercase tracking-wider rounded-xl md:rounded-2xl shadow-torque w-full sm:w-auto" asChild>
            <a href="https://pay.kiwify.com.br/qJdda9q" target="_blank" rel="noopener noreferrer">
              Quero entrar agora
              <ArrowRight className="ml-1 h-5 w-5" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCta;
