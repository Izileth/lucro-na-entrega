import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="font-display text-xl font-bold tracking-tighter text-primary sm:text-2xl">
          FAST<span className="text-cta">MOTORS</span>
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
