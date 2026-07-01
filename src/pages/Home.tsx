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
    <div>
      <main>
        <div>
          <h1>Fast Motors</h1>
          <p>
            Landing page estruturada para captação de leads e conversão para o método Fast Motors.
          </p>
          
          <div>
            {user ? (
              <div>
                <p>Conectado como: {profile?.name || user.email}</p>
                <Link to={`/user/${profile?.slug || 'profile'}`}>
                  Acessar Meu Perfil
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login" onClick={handleCtaClick}>
                  Entrar na Minha Conta
                </Link>
                <br />
                <Link to="/create">
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
