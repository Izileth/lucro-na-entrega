import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Gauge, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { SEO } from "../components";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await signIn(email, password);
      // Retrieve the profile to navigate to the correct slug
      if (data?.user) {
        // Wait a small moment to let profile load in context, or just query it
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground font-sans relative px-4 overflow-hidden">
      <SEO 
        title="Entrar | Fast Motors"
        description="Acesse sua área exclusiva Fast Motors e gerencie seus lucros."
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
          <h2 className="text-2xl font-bold tracking-tight font-display">Acesse sua Conta</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Insira suas credenciais abaixo para entrar
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-card p-8 rounded-xl border border-border bg-card shadow-elevated relative">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm font-medium animate-fade-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
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
                  className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-muted-foreground block">
                  Senha
                </label>
                <Link to="/reset" className="text-xs text-cta hover:underline font-medium">
                  Esqueceu a senha?
                </Link>
              </div>
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
                  className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-sm"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex h-11 items-center justify-center rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-1">
                  Acessar Painel <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link to="/create" className="text-cta font-semibold hover:underline">
              Criar conta gratuitamente
            </Link>
          </div>
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
