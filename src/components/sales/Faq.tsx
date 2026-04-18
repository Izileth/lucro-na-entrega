import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso ter experiência com aplicativos de entrega?",
    a: "Não. O método é desenhado tanto para quem já roda há anos quanto para quem está começando agora. Você aprende desde o básico até estratégias avançadas de otimização e negociação.",
  },
  {
    q: "Funciona com iFood, Uber Eats, Rappi e outros apps?",
    a: "Sim. As estratégias funcionam para qualquer aplicativo de entrega no Brasil — comida, mercado, encomendas. Você usa em paralelo aos apps que já trabalha.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "A maioria dos alunos relata aumento de lucro líquido já nas primeiras 2 semanas aplicando as estratégias de zona e horário. Em 60 dias, o resultado costuma se consolidar.",
  },
  {
    q: "E se eu não gostar do conteúdo?",
    a: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo achar que não é pra você, devolvemos 100% do valor investido — sem perguntas.",
  },
  {
    q: "Como recebo o acesso após a compra?",
    a: "Imediatamente. Após a confirmação do pagamento, você recebe o login da plataforma no seu e-mail e WhatsApp em até 5 minutos.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="bg-secondary/40 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            Dúvidas frequentes
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Antes de você apertar o gatilho.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-background px-6 shadow-card"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg font-bold text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
