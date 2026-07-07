import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // Email verification is disabled, so they are logged in immediately.
      // Redirect to home page right away.
      navigate("/welcome");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-card rounded-lg p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Criar Conta</h2>
          <p className="text-sm text-muted-foreground">Cadastre-se gratuitamente abaixo</p>
        </div>

        {error && (
          <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-muted-foreground block">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
            />
          </div>

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
              Senha (mínimo 6 caracteres)
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground block">
              Confirmar Senha
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
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Faça login
          </Link>
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
