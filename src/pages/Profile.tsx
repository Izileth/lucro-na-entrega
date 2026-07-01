import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";
import { Gauge, User as UserIcon, Settings, Calendar, Shield, Save, LogOut, Loader2, Edit3, ArrowLeft } from "lucide-react";
import { SEO } from "../components";

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

  // Determine if the logged-in user can edit this profile
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
      // Validate slug format (letters, numbers, hyphens)
      const cleanSlug = editSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
      if (!cleanSlug) {
        throw new Error("O slug deve conter caracteres válidos.");
      }

      // If current user is owner, use updateProfile from context
      let updatedData;
      if (isOwner) {
        updatedData = await updateProfile({ name: editName, slug: cleanSlug });
      } else {
        // If current user is admin editing another user
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
      
      // If the slug changed, navigate to the new URL
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
      <div className="min-h-screen flex justify-center items-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-cta mx-auto" />
          <p className="text-sm text-muted-foreground">Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans relative px-4 py-12 overflow-hidden">
      <SEO 
        title={profileData ? `Perfil de ${profileData.name || 'Usuário'} | Fast Motors` : "Perfil | Fast Motors"}
        description="Visualize e edite suas informações de perfil Fast Motors."
      />
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--ring)/0.08),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto z-10 animate-fade-up flex-1 flex flex-col justify-center">
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para o início
          </Link>
        </div>

        {error && !profileData && (
          <div className="glass-card p-8 rounded-xl border border-border text-center space-y-4">
            <Shield className="h-12 w-12 text-destructive mx-auto" />
            <h3 className="text-lg font-semibold font-display">Acesso Restrito ou Perfil Não Encontrado</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {error} Perfis administrativos e dados confidenciais são estritamente protegidos.
            </p>
            <div className="pt-2">
              <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-lg bg-cta px-6 text-sm font-semibold text-cta-foreground shadow-torque transition-transform hover:scale-105">
                Ir para Login
              </Link>
            </div>
          </div>
        )}

        {profileData && (
          <div className="glass-card rounded-xl border border-border bg-card shadow-elevated overflow-hidden">
            {/* Header Banner */}
            <div className="h-32 gradient-torque relative">
              <div className="absolute -bottom-10 left-8">
                <div className="h-20 w-20 rounded-xl bg-card border border-border flex items-center justify-center shadow-md">
                  <UserIcon className="h-10 w-10 text-cta" />
                </div>
              </div>
            </div>

            {/* Profile Info / Edit Form */}
            <div className="pt-14 p-8">
              {saveSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-cta/15 border border-cta/30 text-cta text-sm font-medium animate-fade-up">
                  Perfil atualizado com sucesso!
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm font-medium animate-fade-up">
                  {error}
                </div>
              )}

              {isEditing ? (
                /* EDIT FORM */
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="editName" className="text-sm font-medium text-muted-foreground">
                      Nome de Exibição
                    </label>
                    <input
                      id="editName"
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="editSlug" className="text-sm font-medium text-muted-foreground">
                      Link do Perfil (Slug personalizado)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-muted text-muted-foreground text-xs font-mono">
                        /user/
                      </span>
                      <input
                        id="editSlug"
                        type="text"
                        required
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="block w-full px-4 py-2.5 bg-background border border-border rounded-r-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm font-mono"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Apenas letras, números e hífens.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="flex-1 flex h-10 items-center justify-center rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground shadow-torque transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                    >
                      {saveLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Save className="h-4 w-4" /> Salvar Alterações
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(profileData.name || "");
                        setEditSlug(profileData.slug || "");
                        setError(null);
                      }}
                      className="flex-1 h-10 rounded-lg border border-border bg-transparent hover:bg-secondary text-sm font-semibold transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                /* DISPLAY VIEW */
                <div className="space-y-8 animate-fade-up">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold font-display flex items-center gap-2">
                          {profileData.name || "Sem Nome"}
                          {profileData.is_admin && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cta/15 text-cta border border-cta/30">
                              <Shield className="h-3 w-3" /> Admin
                            </span>
                          )}
                        </h1>
                        <p className="text-sm text-muted-foreground font-mono mt-1">
                          @{profileData.slug}
                        </p>
                      </div>
                      
                      {canEdit && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border hover:bg-secondary px-4 text-xs font-semibold transition-colors"
                        >
                          <Settings className="h-3.5 w-3.5" /> Editar Perfil
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-border py-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Membro desde</p>
                        <p className="text-sm font-medium">
                          {new Date(profileData.created_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Nível de Acesso</p>
                        <p className="text-sm font-medium">
                          {profileData.is_admin ? "Administrador de Métricas" : "Usuário Método Fast Motors"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isOwner && (
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-xs text-muted-foreground">
                        Conectado como <strong className="text-foreground">{user.email}</strong>
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg text-destructive hover:bg-destructive/10 px-4 text-sm font-semibold transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sair da Conta
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
