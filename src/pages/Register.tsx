import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Gauge, Mail, Lock, User, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { SEO } from "../components";

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, name);
      setSuccess(true);
      setTimeout(() => {
        // Redirect to login or home after a few seconds
        navigate("/login");
      }, 5000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground font-sans relative px-4 overflow-hidden">
      <SEO 
        title="Criar Conta | Fast Motors"
        description="Junte-se ao time Fast Motors e multiplique a rentabilidade do seu negócio."
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
          <h2 className="text-2xl font-bold tracking-tight font-display">Cadastre-se Grátis</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Crie sua conta para começar a otimizar seus lucros
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-card p-8 rounded-xl border border-border bg-card shadow-elevated relative">
          {success ? (
            <div className="text-center py-6 space-y-4 animate-fade-up">
              <CheckCircle2 className="h-12 w-12 text-cta mx-auto animate-bounce" />
              <h3 className="text-lg font-semibold font-display">Cadastro Realizado!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sua conta foi criada com sucesso! Se necessário, verifique sua caixa de entrada para confirmar seu e-mail antes de fazer login.
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground block">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground block">
                    E-mail
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

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-sm font-medium text-muted-foreground block">
                    Senha (mín. 6 caracteres)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground block">
                    Confirmar Senha
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

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex h-11 items-center justify-center rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 mt-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-1">
                      Cadastrar Conta <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </form>

              {/* Card Footer */}
              <div className="mt-6 text-center text-xs text-muted-foreground">
                Já possui uma conta?{" "}
                <Link to="/login" className="text-cta font-semibold hover:underline">
                  Faça login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
