import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BackArrowIcon = () => (
    <svg className="inline-block mr-1 h-3.5 w-3.5 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

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
      navigate("/welcome");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-5 sm:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-2xl font-extrabold tracking-tight block">FM</span>
          <h2 className="text-lg font-bold uppercase tracking-wider text-black">Criar Conta</h2>
          <p className="text-xs text-neutral-500">Cadastre-se gratuitamente abaixo</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border-l-2 border-red-600 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              E-mail
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

          <div className="space-y-1">
            <label htmlFor="password" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Senha (mínimo 6 caracteres)
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Confirmar Senha
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
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-500">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-black hover:underline font-bold transition-colors">
            Faça login
          </Link>
        </div>

        <div className="text-center pt-2 border-t border-neutral-100">
          <Link to="/" className="text-xs text-neutral-400 hover:text-black transition-colors">
            <BackArrowIcon /> Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
