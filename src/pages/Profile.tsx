import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";

interface ProfileData {
  id: string;
  slug: string;
  name: string | null;
  is_admin: boolean;
  created_at: string;
}

export default function Profile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, profile: currentUserProfile, updateProfile, signOut } = useAuth();
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const isOwner = user && profileData && user.id === profileData.id;
  const isAdmin = currentUserProfile?.is_admin;
  const canEdit = isOwner || isAdmin;

  const fetchProfileBySlug = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("id, slug, name, is_admin, created_at")
        .eq("slug", slug)
        .single();

      if (fetchError) {
        throw new Error("Perfil não encontrado ou acesso restrito.");
      }

      setProfileData(data);
      setEditName(data.name || "");
      setEditSlug(data.slug || "");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao carregar perfil.");
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProfileBySlug();
    }
  }, [slug, user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;
    
    setSaveLoading(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const cleanSlug = editSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
      if (!cleanSlug) {
        throw new Error("O slug deve conter caracteres válidos.");
      }

      let updatedData;
      if (isOwner) {
        updatedData = await updateProfile({ name: editName, slug: cleanSlug });
      } else {
        const { data, error: updateError } = await supabase
          .from("profiles")
          .update({ name: editName, slug: cleanSlug })
          .eq("id", profileData.id)
          .select()
          .single();

        if (updateError) throw updateError;
        updatedData = data;
      }

      setProfileData(updatedData);
      setSaveSuccess(true);
      setIsEditing(false);
      
      if (cleanSlug !== slug) {
        navigate(`/user/${cleanSlug}`, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao atualizar perfil. Talvez o slug já esteja em uso.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div>
        <p>Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link to="/">← Voltar para o início</Link>
      </div>

      {error && !profileData && (
        <div>
          <h3>Acesso Restrito ou Perfil Não Encontrado</h3>
          <p>{error}</p>
          <Link to="/login">Ir para Login</Link>
        </div>
      )}

      {profileData && (
        <div>
          <h2>Perfil do Usuário</h2>

          {saveSuccess && (
            <div style={{ color: "green" }}>
              Perfil atualizado com sucesso!
            </div>
          )}
          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSave}>
              <div>
                <label htmlFor="editName">Nome de Exibição</label>
                <input
                  id="editName"
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="editSlug">Link do Perfil (Slug)</label>
                <input
                  id="editSlug"
                  type="text"
                  required
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                />
              </div>

              <div>
                <button type="submit" disabled={saveLoading}>
                  {saveLoading ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditName(profileData.name || "");
                    setEditSlug(profileData.slug || "");
                    setError(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h3>
                {profileData.name || "Sem Nome"} 
                {profileData.is_admin && " [Admin]"}
              </h3>
              <p>Slug: @{profileData.slug}</p>
              <p>
                Membro desde:{" "}
                {new Date(profileData.created_at).toLocaleDateString("pt-BR")}
              </p>
              <p>
                Nível de Acesso:{" "}
                {profileData.is_admin ? "Administrador" : "Usuário Comum"}
              </p>

              {canEdit && (
                <button onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>
              )}

              {isOwner && (
                <div>
                  <p>Conectado como: {user.email}</p>
                  <button onClick={handleSignOut}>Sair da Conta</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
