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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-card rounded-lg p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight">Perfil do Usuário</h2>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Início
          </Link>
        </div>

        {error && !profileData && (
          <div className="p-4 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium space-y-2">
            <p className="font-semibold">Acesso Restrito ou Perfil Não Encontrado</p>
            <p className="text-xs text-muted-foreground">{error}</p>
            <div className="pt-2">
              <Link to="/login" className="text-xs text-primary hover:underline font-semibold">
                Ir para Login
              </Link>
            </div>
          </div>
        )}

        {profileData && (
          <div className="space-y-6">
            {saveSuccess && (
              <div className="p-3 rounded bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-medium">
                Perfil atualizado com sucesso!
              </div>
            )}
            {error && (
              <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                {error}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="editName" className="text-sm font-medium text-muted-foreground block">
                    Nome de Exibição
                  </label>
                  <input
                    id="editName"
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="editSlug" className="text-sm font-medium text-muted-foreground block">
                    Link do Perfil (Slug)
                  </label>
                  <input
                    id="editSlug"
                    type="text"
                    required
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {saveLoading ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(profileData.name || "");
                      setEditSlug(profileData.slug || "");
                      setError(null);
                    }}
                    className="flex-1 py-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">
                    {profileData.name || "Sem Nome"}
                    {profileData.is_admin && (
                      <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        Admin
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">@{profileData.slug}</p>
                </div>

                <div className="border-t border-b border-border py-4 space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Membro desde:{" "}
                    <strong className="text-foreground">
                      {new Date(profileData.created_at).toLocaleDateString("pt-BR")}
                    </strong>
                  </p>
                  <p className="text-muted-foreground">
                    Nível de Acesso:{" "}
                    <strong className="text-foreground">
                      {profileData.is_admin ? "Administrador" : "Usuário Comum"}
                    </strong>
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  {canEdit && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 py-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Editar Perfil
                    </button>
                  )}

                  {isOwner && (
                    <button
                      onClick={handleSignOut}
                      className="flex-1 py-2 border border-transparent bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-md text-sm font-medium transition-colors"
                    >
                      Sair da Conta
                    </button>
                  )}
                </div>

                {isOwner && (
                  <p className="text-center text-xs text-muted-foreground pt-4">
                    Conectado como <strong className="text-foreground">{user.email}</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
