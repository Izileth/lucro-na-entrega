import React, { useEffect } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { logPageView, logEvent } = useAnalytics();
  const { user, profile } = useAuth();

  useEffect(() => {
    logPageView(window.location.pathname);
  }, []);

  const handleCtaClick = () => {
    logEvent("cta_click", { location: "hero" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Fast Motors</h1>
        <p className="text-muted-foreground text-base">
          Landing page estruturada para captação de leads e conversão para o método Fast Motors.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {user ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Conectado como <strong className="text-foreground">{profile?.name || user.email}</strong>
              </p>
              <Link
                to={`/user/${profile?.slug || 'profile'}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Acessar Meu Perfil
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={handleCtaClick}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Entrar na Minha Conta
              </Link>
              <Link
                to="/create"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
