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
    <div>
      <h2>{isRecoverySession ? "Definir Nova Senha" : "Recuperar Senha"}</h2>
      <p>
        {isRecoverySession
          ? "Crie uma nova senha para acessar sua conta"
          : "Insira seu e-mail para receber um link de redefinição"}
      </p>

      {success ? (
        <div>
          <h3>{isRecoverySession ? "Senha Atualizada!" : "E-mail Enviado!"}</h3>
          <p>
            {isRecoverySession
              ? "Sua nova senha foi salva. Você será redirecionado para a página de login."
              : `Se o e-mail estiver cadastrado, enviamos um link para redefinir sua senha.`}
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

          {isRecoverySession ? (
            <form onSubmit={handleUpdatePassword}>
              <div>
                <label htmlFor="newPassword">Nova Senha</label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Salvar Nova Senha"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequestReset}>
              <div>
                <label htmlFor="email">E-mail Cadastrado</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Enviar Link de Recuperação"}
              </button>
            </form>
          )}

          <div>
            <Link to="/login">Voltar ao login</Link>
          </div>
        </>
      )}

      <div>
        <Link to="/">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}
