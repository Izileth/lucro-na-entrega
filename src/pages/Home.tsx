import React, { useEffect } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BackArrowIcon = () => (
    <svg className="inline-block mr-1 h-3.5 w-3.5 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export default function Home() {
  const { logPageView, logEvent } = useAnalytics();
  const { user, profile } = useAuth();

  useEffect(() => {
    logPageView(window.location.pathname);
  }, []);

  const handleCtaClick = () => {
    logEvent("cta_click", { location: "welcome" });
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-5 sm:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-2xl font-extrabold tracking-tight block">FM</span>
          <h1 className="text-lg font-bold uppercase tracking-wider text-black">Portal do Entregador</h1>
          <p className="text-xs text-neutral-500">
            Bem-vindo à área de membros Fast Motors. Acesse seu perfil ou gerencie suas credenciais abaixo.
          </p>
        </div>

        <div className="pt-2">
          {user ? (
            <div className="space-y-4">
              <div className="p-4 border border-neutral-200 bg-white text-center space-y-1">
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Status da Sessão</p>
                <p className="text-xs text-neutral-500">
                  Conectado como <strong className="text-black font-bold">@{profile?.slug || "user"}</strong>
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  to={`/user/${profile?.slug || 'profile'}`}
                  className="w-full bg-black py-3 text-center text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase block"
                >
                  Acessar Meu Perfil
                </Link>
                
                <Link
                  to="/"
                  className="w-full border border-black py-3 text-center text-xs font-bold tracking-wider text-black hover:bg-neutral-100 transition-colors uppercase block"
                >
                  Voltar para a Landing Page
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={handleCtaClick}
                className="w-full bg-black py-3 text-center text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase block"
              >
                Entrar na Minha Conta
              </Link>
              
              <Link
                to="/create"
                className="w-full border border-black py-3 text-center text-xs font-bold tracking-wider text-black hover:bg-neutral-100 transition-colors uppercase block"
              >
                Criar Nova Conta
              </Link>

              <div className="text-center pt-4 border-t border-neutral-200">
                <Link to="/" className="text-xs text-neutral-400 hover:text-black transition-colors">
                  <BackArrowIcon /> Ir para a página de vendas
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
