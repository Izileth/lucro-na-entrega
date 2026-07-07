import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";

const BackArrowIcon = () => (
    <svg className="inline-block mr-1 h-3.5 w-3.5 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export default function ResetPassword() {
  const { resetPassword, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isRecoverySession, setIsRecoverySession] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && (hash.includes("type=recovery") || hash.includes("access_token="))) {
      setIsRecoverySession(true);
    } else if (session) {
      setIsRecoverySession(true);
    }
  }, [session]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao solicitar recuperação de senha.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("A nova senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao atualizar senha. Verifique se o link expirou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-5 sm:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-2xl font-extrabold tracking-tight block">FM</span>
          <h2 className="text-lg font-bold uppercase tracking-wider text-black">
            {isRecoverySession ? "Definir Nova Senha" : "Recuperar Senha"}
          </h2>
          <p className="text-xs text-neutral-500">
            {isRecoverySession
              ? "Crie uma nova senha para acessar sua conta"
              : "Insira seu e-mail para receber um link de redefinição"}
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4 py-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black">
              {isRecoverySession ? "Senha Atualizada!" : "E-mail Enviado!"}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {isRecoverySession
                ? "Sua nova senha foi salva. Você será redirecionado para a página de login em instantes."
                : `Se o e-mail estiver cadastrado, enviamos um link para redefinir sua senha.`}
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="w-full inline-block bg-black py-3 text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase text-center"
              >
                Ir para Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-3 bg-red-50 border-l-2 border-red-600 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {isRecoverySession ? (
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="newPassword" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Nova Senha
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black py-3 text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase disabled:opacity-50"
                >
                  {loading ? "Carregando..." : "Salvar Nova Senha"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRequestReset} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    E-mail Cadastrado
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black py-3 text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase disabled:opacity-50"
                >
                  {loading ? "Carregando..." : "Enviar Link"}
                </button>
              </form>
            )}

            <div className="text-center">
              <Link to="/login" className="text-xs text-neutral-500 hover:text-black transition-colors font-medium">
                Voltar ao login
              </Link>
            </div>
          </>
        )}

        <div className="text-center pt-2 border-t border-neutral-100">
          <Link to="/" className="text-xs text-neutral-400 hover:text-black transition-colors">
            <BackArrowIcon /> Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
