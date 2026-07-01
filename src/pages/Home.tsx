import React, { useEffect } from "react";
import { Header, Footer, SEO } from "../components";
import { useAnalytics } from "../hooks/useAnalytics";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { logPageView, logEvent } = useAnalytics();
  const { user, profile } = useAuth();

  useEffect(() => {
    // Track initial page view
    logPageView(window.location.pathname);
  }, []);

  const handleCtaClick = () => {
    logEvent("cta_click", { location: "hero" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <SEO 
        title="Fast Motors | Performance e Lucratividade"
        description="Landing page estruturada para captação de leads e conversão para o método Fast Motors."
      />
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--ring)/0.08),transparent_70%)] pointer-events-none" />
        
        <div className="container relative z-10 max-w-4xl text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-8">
            <span className="flex h-2 w-2 rounded-full bg-cta animate-pulse" />
            Estrutura Completa & Pronta
          </div>
          
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-none">
            Arquitetura <span className="text-cta gradient-torque bg-clip-text text-transparent">Fast Motors</span> Criada com Sucesso
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 text-balance">
            A estrutura de pastas e arquivos para <strong>Hooks, Components, Contexts e APIs</strong> foi criada seguindo as melhores práticas e está totalmente pronta para a inserção das regras de negócios.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link
                to={`/user/${profile?.slug || 'profile'}`}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-cta px-8 text-base font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Acessar Meu Perfil ({profile?.name || user.email})
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-cta px-8 text-base font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  Entrar na Minha Conta
                </Link>
                <Link
                  to="/create"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary px-8 text-base font-semibold transition-colors"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
