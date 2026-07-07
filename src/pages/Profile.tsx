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

const BackArrowIcon = () => (
    <svg className="inline-block mr-1 h-3.5 w-3.5 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

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
      <div className="min-h-screen bg-white text-black flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 animate-pulse">Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-5 sm:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black">Perfil do Usuário</h2>
          <Link to="/welcome" className="text-xs text-neutral-400 hover:text-black transition-colors font-medium">
            <BackArrowIcon /> Painel
          </Link>
        </div>

        {error && !profileData && (
          <div className="p-4 bg-red-50 border-l-2 border-red-600 text-red-600 text-xs font-medium space-y-2">
            <p className="font-bold uppercase tracking-wider">Acesso Restrito ou Perfil Não Encontrado</p>
            <p className="text-xs leading-relaxed">{error}</p>
            <div className="pt-2">
              <Link to="/login" className="inline-block bg-black px-4 py-2 text-[10px] font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase">
                Ir para Login
              </Link>
            </div>
          </div>
        )}

        {profileData && (
          <div className="space-y-6">
            {saveSuccess && (
              <div className="p-3 bg-green-50 border-l-2 border-green-600 text-green-600 text-xs font-medium uppercase tracking-wider">
                Perfil atualizado com sucesso!
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border-l-2 border-red-600 text-red-600 text-xs font-medium leading-relaxed">
                {error}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="editName" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Nome de Exibição
                  </label>
                  <input
                    id="editName"
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="editSlug" className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Link do Perfil (Slug)
                  </label>
                  <input
                    id="editSlug"
                    type="text"
                    required
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors rounded-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="flex-1 bg-black py-3 text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase disabled:opacity-50"
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
                    className="flex-1 border border-black py-3 text-xs font-bold tracking-wider text-black hover:bg-neutral-100 transition-colors uppercase"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold uppercase tracking-wider text-black flex items-center">
                    {profileData.name || "Sem Nome"}
                    {profileData.is_admin && (
                      <span className="ml-2 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 border border-black text-black">
                        Admin
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400">@{profileData.slug}</p>
                </div>

                <div className="border-t border-b border-neutral-200 py-4 space-y-2 text-xs text-neutral-500">
                  <p>
                    Membro desde:{" "}
                    <strong className="text-black uppercase">
                      {new Date(profileData.created_at).toLocaleDateString("pt-BR")}
                    </strong>
                  </p>
                  <p>
                    Nível de Acesso:{" "}
                    <strong className="text-black uppercase">
                      {profileData.is_admin ? "Administrador" : "Usuário Comum"}
                    </strong>
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="w-full text-center py-3 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-wider uppercase"
                    >
                      Painel Administrativo
                    </Link>
                  )}
                  
                  <div className="flex gap-2 w-full">
                    {canEdit && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 border border-black py-3 text-xs font-bold tracking-wider text-black hover:bg-neutral-100 transition-colors uppercase"
                      >
                        Editar Perfil
                      </button>
                    )}

                    {isOwner && (
                      <button
                        onClick={handleSignOut}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-xs font-bold tracking-wider uppercase transition-colors"
                      >
                        Sair da Conta
                      </button>
                    )}
                  </div>
                </div>

                {isOwner && (
                  <p className="text-center text-[10px] text-neutral-400 pt-4">
                    Conectado como <strong className="text-black">{user.email}</strong>
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
