import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-2xl font-bold tracking-tighter text-primary">
          PRO<span className="text-accent">MOTA</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#dores" className="transition-colors hover:text-primary">Dores</a>
          <a href="#metodo" className="transition-colors hover:text-primary">Método</a>
          <a href="#resultados" className="transition-colors hover:text-primary">Resultados</a>
          <a href="#planos" className="transition-colors hover:text-primary">Planos</a>
          <a href="#faq" className="transition-colors hover:text-primary">FAQ</a>
        </div>
        <Button variant="torque" size="sm" asChild>
          <a href="#planos">Quero começar</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
