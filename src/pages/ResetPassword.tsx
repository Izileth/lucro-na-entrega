import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";
import { Gauge, Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { SEO } from "../components";

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
    // Detect if we are on the recovery route (user clicked the link from email)
    // Supabase sets anchor parameters like #access_token=...&type=recovery
    const hash = window.location.hash;
    if (hash && (hash.includes("type=recovery") || hash.includes("access_token="))) {
      setIsRecoverySession(true);
    } else if (session) {
      // If the user already has a session and navigated here, they can change their password
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground font-sans relative px-4 overflow-hidden">
      <SEO 
        title="Recuperação de Senha | Fast Motors"
        description="Recupere ou atualize sua senha com segurança."
      />
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--ring)/0.12),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fade-up">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-4 group">
            <Gauge className="h-8 w-8 text-cta group-hover:scale-110 transition-transform animate-float" />
            <span className="font-display text-2xl font-bold tracking-tight">
              FAST<span className="text-cta">MOTORS</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight font-display">
            {isRecoverySession ? "Definir Nova Senha" : "Recuperar Senha"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {isRecoverySession
              ? "Crie uma nova senha forte para acessar seu painel"
              : "Insira seu e-mail para receber um link de redefinição"}
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-card p-8 rounded-xl border border-border bg-card shadow-elevated relative">
          {success ? (
            <div className="text-center py-6 space-y-4 animate-fade-up">
              <CheckCircle2 className="h-12 w-12 text-cta mx-auto animate-bounce" />
              <h3 className="text-lg font-semibold font-display">
                {isRecoverySession ? "Senha Atualizada!" : "E-mail Enviado!"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRecoverySession
                  ? "Sua nova senha foi salva. Você será redirecionado para a página de login em instantes."
                  : `Se o e-mail ${email} estiver cadastrado, enviamos um link para você redefinir sua senha.`}
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-cta px-6 text-sm font-semibold text-cta-foreground shadow-torque transition-transform hover:scale-105"
                >
                  Ir para Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm font-medium animate-fade-up">
                  {error}
                </div>
              )}

              {isRecoverySession ? (
                /* UPDATE PASSWORD FORM */
                <form onSubmit={handleUpdatePassword} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="newPassword" className="text-sm font-medium text-muted-foreground block">
                      Nova Senha
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        id="newPassword"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground block">
                      Confirmar Nova Senha
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        id="confirmPassword"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex h-11 items-center justify-center rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-2"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-1">
                        Salvar Nova Senha <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                /* REQUEST RESET FORM */
                <form onSubmit={handleRequestReset} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground block">
                      E-mail Cadastrado
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex h-11 items-center justify-center rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-2"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-1">
                        Enviar Link de Recuperação <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center text-xs text-muted-foreground">
                Lembra da sua senha?{" "}
                <Link to="/login" className="text-cta font-semibold hover:underline">
                  Voltar ao login
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
