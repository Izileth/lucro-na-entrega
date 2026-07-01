import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";

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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-card rounded-lg p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {isRecoverySession ? "Definir Nova Senha" : "Recuperar Senha"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isRecoverySession
              ? "Crie uma nova senha para acessar sua conta"
              : "Insira seu e-mail para receber um link de redefinição"}
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4 py-4">
            <h3 className="text-lg font-semibold text-green-600">
              {isRecoverySession ? "Senha Atualizada!" : "E-mail Enviado!"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isRecoverySession
                ? "Sua nova senha foi salva. Você será redirecionado para a página de login."
                : `Se o e-mail estiver cadastrado, enviamos um link para redefinir sua senha.`}
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Ir para Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                {error}
              </div>
            )}

            {isRecoverySession ? (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="newPassword" className="text-sm font-medium text-muted-foreground block">
                    Nova Senha
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground block">
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Carregando..." : "Salvar Nova Senha"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground block">
                    E-mail Cadastrado
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Carregando..." : "Enviar Link de Recuperação"}
                </button>
              </form>
            )}

            <div className="text-center">
              <Link to="/login" className="text-xs text-primary hover:underline">
                Voltar ao login
              </Link>
            </div>
          </>
        )}

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
