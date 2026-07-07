import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
      await signIn(email, password);
      navigate("/welcome");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-card rounded-lg p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Login</h2>
          <p className="text-sm text-muted-foreground">Insira suas credenciais para entrar na conta</p>
        </div>

        {error && (
          <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-muted-foreground block">
              E-mail
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

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-muted-foreground block">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="flex flex-col gap-2 text-center text-xs text-muted-foreground">
          <Link to="/reset" className="text-primary hover:underline">
            Esqueceu a senha?
          </Link>
          <div>
            Ainda não tem uma conta?{" "}
            <Link to="/create" className="text-primary hover:underline font-semibold">
              Criar conta
            </Link>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
