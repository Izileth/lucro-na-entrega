import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";

// Custom Sleek SVGs for Admin dashboard
const ShieldCheckIcon = () => (
    <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 11 11 13 15 9" />
    </svg>
);

const LockIcon = () => (
    <svg className="h-10 w-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const SparklesIcon = () => (
    <svg className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg className="h-3.5 w-3.5 align-middle mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const LogOutIcon = () => (
    <svg className="h-3.5 w-3.5 align-middle mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  
  // Data counts
  const [counts, setCounts] = useState({ leads: 0, events: 0, products: 0, users: 0 });
  const [loadingData, setLoadingData] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const isAuthorized = !authLoading && user && profile?.is_admin;

  const fetchCounts = async () => {
    if (!isAuthorized) return;
    setLoadingData(true);
    try {
      const [leadsRes, eventsRes, productsRes, profilesRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("analytics_events").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true })
      ]);

      setCounts({
        leads: leadsRes.count || 0,
        events: eventsRes.count || 0,
        products: productsRes.count || 0,
        users: profilesRes.count || 0
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchCounts();
    }
  }, [user, profile]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // ----------------------------------------------------
  // TEST DATA OPERATIONS
  // ----------------------------------------------------
  const handleGenerateMockLeads = async () => {
    setActionLoading("generate-mock-leads");
    const mockLeads = [
      { name: "João Silva", email: "joao.silva@teste.com", phone: "(11) 98765-4321", source: "google" },
      { name: "Maria Oliveira", email: "maria.oliveira@teste.com", phone: "(21) 99888-7777", source: "instagram" },
      { name: "Pedro Souza", email: "pedro.souza@teste.com", phone: "(31) 97777-6666", source: "facebook" }
    ];

    try {
      const { error } = await supabase
        .from("leads")
        .insert(mockLeads.map(lead => ({
          ...lead,
          created_at: new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString()
        })));

      if (error) throw error;
      alert("3 Leads de teste gerados com sucesso!");
      fetchCounts();
    } catch (err: any) {
      alert("Erro ao gerar leads: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleGenerateMockTraffic = async () => {
    setActionLoading("generate-mock-traffic");
    const mockEvents: any[] = [];
    
    for (let i = 0; i < 20; i++) {
      const isPageView = Math.random() > 0.3;
      mockEvents.push({
        event_name: isPageView ? "page_view" : "cta_click",
        page_path: isPageView ? "/" : "/cta",
        session_id: "sess_" + Math.floor(Math.random() * 1000),
        metadata: { browser: "Chrome" },
        created_at: new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    try {
      const { error } = await supabase.from("analytics_events").insert(mockEvents);
      if (error) throw error;
      alert("20 Eventos de tráfego simulados com sucesso!");
      fetchCounts();
    } catch (err: any) {
      alert("Erro ao simular tráfego: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearData = async () => {
    if (!window.confirm("Deseja realmente limpar todos os leads e eventos simulados?")) return;
    setActionLoading("clear");
    try {
      const [leadsErr, eventsErr] = await Promise.all([
        supabase.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000"),
        supabase.from("analytics_events").delete().neq("id", "00000000-0000-0000-0000-000000000000")
      ]);

      if (leadsErr.error) throw leadsErr.error;
      if (eventsErr.error) throw eventsErr.error;

      alert("Dados de testes limpos com sucesso!");
      fetchCounts();
    } catch (err: any) {
      alert("Erro ao limpar dados: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 animate-pulse">Autenticando sessão...</p>
      </div>
    );
  }

  // Unauthorized View
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-5 sm:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-md w-full border border-red-200 bg-red-50 p-6 sm:p-8 text-center space-y-6">
          <div className="h-14 w-14 border border-red-300 text-red-600 flex items-center justify-center mx-auto rounded-none">
            <LockIcon />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold uppercase tracking-wider text-red-600">Acesso Restrito</h1>
            <p className="text-xs leading-relaxed text-red-700">
              Você não possui permissões administrativas ou não está autenticado como administrador do portal.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/login" className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider py-3 text-center uppercase transition-colors">
              Fazer Login
            </Link>
            <Link to="/" className="flex-1 border border-red-300 hover:bg-red-100 text-red-700 text-xs font-bold tracking-wider py-3 text-center uppercase transition-colors">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authorized Admin View
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-5 sm:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
        
        {/* Title */}
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
          <div className="h-10 w-10 border border-black flex items-center justify-center">
            <ShieldCheckIcon />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-black">Painel Administrador</h1>
            <p className="text-[10px] text-neutral-400">Olá, {profile?.name || user?.email}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="p-4 border border-neutral-200 bg-white text-neutral-500 text-xs leading-relaxed">
          Autenticação realizada com sucesso. Você possui acesso administrativo total ao banco de dados e simuladores do sistema.
        </div>

        {/* Simple Database Counts */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Estatísticas do Banco</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-neutral-200 text-center">
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">Leads</span>
              <strong className="text-lg font-bold text-black">{loadingData ? "..." : counts.leads}</strong>
            </div>
            <div className="p-3 bg-white border border-neutral-200 text-center">
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">Eventos</span>
              <strong className="text-lg font-bold text-black">{loadingData ? "..." : counts.events}</strong>
            </div>
          </div>
        </div>

        {/* Test Console Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5 pb-1">
            <SparklesIcon />
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Simulação & Testes</h2>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleGenerateMockLeads}
              disabled={actionLoading !== null}
              className="w-full bg-black py-3 text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase disabled:opacity-50"
            >
              {actionLoading === "generate-mock-leads" ? "Gerando..." : "Gerar Leads de Teste"}
            </button>
            <button
              onClick={handleGenerateMockTraffic}
              disabled={actionLoading !== null}
              className="w-full border border-black py-3 text-xs font-bold tracking-wider text-black hover:bg-neutral-100 transition-colors uppercase disabled:opacity-50"
            >
              {actionLoading === "generate-mock-traffic" ? "Simulando..." : "Simular Tráfego de Teste"}
            </button>
            <button
              onClick={handleClearData}
              disabled={actionLoading !== null}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-xs font-bold tracking-wider uppercase transition-colors disabled:opacity-50"
            >
              {actionLoading === "clear" ? "Limpando..." : "Limpar Dados Gerados"}
            </button>
          </div>
        </div>

        {/* Navigation / Logout */}
        <div className="flex gap-2 pt-4 border-t border-neutral-200">
          <Link to="/" className="flex-1 border border-black py-3 text-xs font-bold tracking-wider text-black hover:bg-neutral-100 transition-colors uppercase text-center">
            <ArrowLeftIcon /> Ir para Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center"
          >
            <LogOutIcon /> Sair
          </button>
        </div>

      </div>
    </div>
  );
}
