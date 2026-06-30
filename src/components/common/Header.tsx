import React from "react";
import { Gauge, Menu } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Gauge className="h-6 w-6 text-cta animate-float" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            FAST<span className="text-cta">MOTORS</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Benefícios
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#cta-section"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-cta px-4 py-2 text-sm font-medium text-cta-foreground shadow-torque transition-transform hover:scale-105 active:scale-95"
          >
            Quero Começar
          </a>
          <button className="md:hidden text-muted-foreground hover:text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
