import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Header, Footer, SEO } from "./components";
import { useAnalytics } from "./hooks/useAnalytics";

// Create Query Client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MainContent() {
  const { logPageView, logEvent } = useAnalytics();

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
            <a
              id="cta-section"
              href="#leads"
              onClick={handleCtaClick}
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-cta px-8 text-base font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              Iniciar Integração
            </a>
            <a
              href="https://github.com/Izileth/lucro-na-entrega"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary px-8 text-base font-semibold transition-colors"
            >
              Ver Documentação
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AuthProvider>
            <MainContent />
          </AuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
