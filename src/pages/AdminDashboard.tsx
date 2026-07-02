import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";
import { ShieldCheck, Lock, Sparkles, LogOut, ArrowLeft } from "lucide-react";

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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center text-sm text-muted-foreground">
        Autenticando sessão...
      </div>
    );
  }

  // Unauthorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-destructive/20 bg-card text-card-foreground rounded-xl p-8 text-center space-y-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <Lock className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Acesso Restrito</h1>
            <p className="text-sm text-muted-foreground">
              Você não possui permissões administrativas ou não está autenticado como administrador.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/login" className="flex-1 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg text-center transition-colors">
              Fazer Login
            </Link>
            <Link to="/" className="flex-1 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-semibold rounded-lg text-center transition-colors">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authorized Admin View
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-card text-card-foreground rounded-2xl p-8 space-y-6 shadow-sm">
        
        {/* Title */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="h-10 w-10 rounded-lg bg-cta/15 text-cta flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Administrador Autorizado</h1>
            <p className="text-xs text-muted-foreground">Olá, {profile?.name || user?.email}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="p-4 rounded-xl bg-cta/10 border border-cta/20 text-cta text-xs font-semibold leading-relaxed">
          Autenticação realizada com sucesso. Você possui acesso administrativo total ao banco de dados e APIs do sistema.
        </div>

        {/* Simple Database Counts */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estatísticas do Banco</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-background border border-border rounded-lg">
              <span className="text-muted-foreground block">Leads</span>
              <strong className="text-base text-foreground">{loadingData ? "..." : counts.leads}</strong>
            </div>
            <div className="p-3 bg-background border border-border rounded-lg">
              <span className="text-muted-foreground block">Eventos</span>
              <strong className="text-base text-foreground">{loadingData ? "..." : counts.events}</strong>
            </div>
          </div>
        </div>

        {/* Test Console Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-cta" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Simulação & Testes</h2>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleGenerateMockLeads}
              disabled={actionLoading !== null}
              className="py-2.5 bg-cta text-cta-foreground hover:bg-cta/90 disabled:opacity-50 text-xs font-bold rounded-lg transition-colors"
            >
              {actionLoading === "generate-mock-leads" ? "Gerando..." : "Gerar Leads Fictícios (Teste)"}
            </button>
            <button
              onClick={handleGenerateMockTraffic}
              disabled={actionLoading !== null}
              className="py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 text-xs font-bold rounded-lg transition-colors"
            >
              {actionLoading === "generate-mock-traffic" ? "Simulando..." : "Simular Tráfego de Teste"}
            </button>
            <button
              onClick={handleClearData}
              disabled={actionLoading !== null}
              className="py-2.5 bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 disabled:opacity-50 text-destructive text-xs font-bold rounded-lg transition-colors"
            >
              {actionLoading === "clear" ? "Limpando..." : "Limpar Dados Gerados"}
            </button>
          </div>
        </div>

        {/* Navigation / Logout */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Link to="/" className="flex-1 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-semibold rounded-lg flex items-center justify-center gap-1 text-center transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Ir para Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
        </div>

      </div>
    </div>
  );
}
