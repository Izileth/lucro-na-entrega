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
    <div>
      <h2>Criar Conta</h2>
      <p>Crie sua conta para começar</p>

      {success ? (
        <div>
          <h3>Cadastro Realizado!</h3>
          <p>
            Sua conta foi criada com sucesso! Se necessário, verifique sua caixa de entrada para confirmar seu e-mail antes de fazer login.
          </p>
          <Link to="/login">Ir para Login</Link>
        </div>
      ) : (
        <>
          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nome Completo</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
          </form>

          <div>
            Já possui uma conta? <Link to="/login">Faça login</Link>
          </div>
        </>
      )}

      <div>
        <Link to="/">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}
