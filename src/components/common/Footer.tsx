import React from "react";
import { Gauge } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card py-12 text-card-foreground">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-cta" />
            <span className="font-display text-lg font-bold tracking-tight">
              FAST<span className="text-cta">MOTORS</span>
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {currentYear} Fast Motors. Todos os direitos reservados.
          </p>

          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:underline">
              Termos de Uso
            </a>
            <a href="#" className="hover:underline">
              Políticas de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
