const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
        <div className="font-display text-xl font-bold tracking-tighter text-primary">
          PRO<span className="text-cta">MOTA</span>
        </div>
        <p>© {new Date().getFullYear()} ProMota — Soluções para entregadores que pensam em lucro.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary">Termos</a>
          <a href="#" className="hover:text-primary">Privacidade</a>
          <a href="#" className="hover:text-primary">Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
