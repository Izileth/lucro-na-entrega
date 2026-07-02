import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../api/client";
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  Calendar, 
  FileText, 
  Info,
  DollarSign,
  Package,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Search,
  LogOut,
  MousePointerClick
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

// Interfaces
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string;
  metadata: any;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
}

interface Profile {
  id: string;
  slug: string;
  name: string | null;
  is_admin: boolean;
  created_at: string;
}

interface AnalyticsEvent {
  id: string;
  event_name: string;
  page_path: string | null;
  session_id: string | null;
  metadata: any;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, profile: currentUserProfile, loading: authLoading, signOut } = useAuth();
  
  // Tabs: overview, leads, products, users, analytics
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "products" | "users" | "analytics">("overview");
  
  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  
  // Loading & Error States
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // tracks button loading like "delete-lead-id"
  
  // Search states
  const [leadSearch, setLeadSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Product Form State (for Add/Edit Modal)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: ""
  });
  const [productFormError, setProductFormError] = useState<string | null>(null);

  // Authenticate Admin
  const isAuthorized = !authLoading && user && currentUserProfile?.is_admin;

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    if (!user || !currentUserProfile?.is_admin) return;
    
    setDataLoading(true);
    setError(null);
    try {
      // 1. Fetch Leads
      const { data: leadsData, error: leadsErr } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (leadsErr) throw leadsErr;
      setLeads(leadsData || []);

      // 2. Fetch Products
      const { data: productsData, error: productsErr } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (productsErr) throw productsErr;
      setProducts(productsData || []);

      // 3. Fetch Profiles (Users)
      const { data: profilesData, error: profilesErr } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (profilesErr) throw profilesErr;
      setProfiles(profilesData || []);

      // 4. Fetch Analytics Events
      const { data: eventsData, error: eventsErr } = await supabase
        .from("analytics_events")
        .select("*")
        .order("created_at", { ascending: false });
      if (eventsErr) throw eventsErr;
      setEvents(eventsData || []);

    } catch (err: any) {
      console.error("Error loading admin data:", err);
      setError(err.message || "Falha ao buscar dados administrativos. Verifique as políticas do banco de dados.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchDashboardData();
    }
  }, [user, currentUserProfile]);

  // Handle Logout
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // ----------------------------------------------------
  // PRODUCT OPERATIONS
  // ----------------------------------------------------
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      price: "",
      image_url: ""
    });
    setProductFormError(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image_url: product.image_url || ""
    });
    setProductFormError(null);
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductFormError(null);
    const parsedPrice = parseFloat(productForm.price);

    if (!productForm.name.trim()) {
      setProductFormError("O nome do produto é obrigatório.");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setProductFormError("Insira um preço válido (positivo).");
      return;
    }

    setActionLoading("product-submit");
    try {
      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim() || null,
        price: parsedPrice,
        image_url: productForm.image_url.trim() || null,
        updated_at: new Date().toISOString()
      };

      if (editingProduct) {
        // Update
        const { error: updateErr } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProduct.id);
        if (updateErr) throw updateErr;
      } else {
        // Insert
        const { error: insertErr } = await supabase
          .from("products")
          .insert([payload]);
        if (insertErr) throw insertErr;
      }

      setIsProductModalOpen(false);
      await fetchDashboardData();
    } catch (err: any) {
      setProductFormError(err.message || "Erro ao salvar produto.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    setActionLoading(`delete-product-${productId}`);
    try {
      const { error: deleteErr } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      if (deleteErr) throw deleteErr;
      await fetchDashboardData();
    } catch (err: any) {
      alert(err.message || "Erro ao deletar produto.");
    } finally {
      setActionLoading(null);
    }
  };

  // ----------------------------------------------------
  // USER PROMOTION / DEMOTION
  // ----------------------------------------------------
  const handleToggleAdmin = async (targetProfile: Profile) => {
    // Prevent self-demotion
    if (targetProfile.id === user?.id) {
      alert("Você não pode revogar seus próprios privilégios de administrador!");
      return;
    }

    const action = targetProfile.is_admin ? "rebaixar" : "promover";
    if (!window.confirm(`Tem certeza que deseja ${action} o usuário "${targetProfile.name || targetProfile.slug}"?`)) return;

    setActionLoading(`toggle-admin-${targetProfile.id}`);
    try {
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({ 
          is_admin: !targetProfile.is_admin,
          updated_at: new Date().toISOString()
        })
        .eq("id", targetProfile.id);

      if (updateErr) throw updateErr;
      await fetchDashboardData();
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar privilégios do usuário.");
    } finally {
      setActionLoading(null);
    }
  };

  // ----------------------------------------------------
  // LEAD OPERATIONS
  // ----------------------------------------------------
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Deseja mesmo remover permanentemente este lead da base?")) return;

    setActionLoading(`delete-lead-${leadId}`);
    try {
      const { error: deleteErr } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);
      if (deleteErr) throw deleteErr;
      await fetchDashboardData();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir lead.");
    } finally {
      setActionLoading(null);
    }
  };

  // ----------------------------------------------------
  // TEST / SIMULATION OPERATIONS
  // ----------------------------------------------------
  const handleGenerateMockLeads = async () => {
    setActionLoading("generate-mock-leads");
    const mockLeads = [
      {
        name: "João Silva",
        email: "joao.silva@teste.com",
        phone: "(11) 98765-4321",
        source: "google",
        metadata: { utm_source: "google", utm_medium: "cpc", utm_campaign: "black_friday" }
      },
      {
        name: "Maria Oliveira",
        email: "maria.oliveira@teste.com",
        phone: "(21) 99888-7777",
        source: "instagram",
        metadata: { utm_source: "instagram", utm_medium: "stories", utm_campaign: "stories_influence" }
      },
      {
        name: "Pedro Souza",
        email: "pedro.souza@teste.com",
        phone: "(31) 97777-6666",
        source: "facebook",
        metadata: { utm_source: "facebook", utm_medium: "feed", utm_campaign: "conversao_leads" }
      },
      {
        name: "Ana Costa",
        email: "ana.costa@teste.com",
        phone: "(19) 96666-5555",
        source: "email_marketing",
        metadata: { utm_source: "email", utm_medium: "newsletter", utm_campaign: "fast_newsletter" }
      },
      {
        name: "Carlos Santos",
        email: "carlos.santos@teste.com",
        phone: "(41) 95555-4444",
        source: "direto",
        metadata: { utm_source: "direct", utm_medium: "none", utm_campaign: "none" }
      }
    ];

    try {
      const { error: insertErr } = await supabase
        .from("leads")
        .insert(mockLeads.map(lead => ({
          ...lead,
          created_at: new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString() // Random date in last 7 days
        })));

      if (insertErr) throw insertErr;
      await fetchDashboardData();
    } catch (err: any) {
      alert("Erro ao gerar leads de teste: " + (err.message || err));
    } finally {
      setActionLoading(null);
    }
  };

  const handleGenerateMockTraffic = async () => {
    setActionLoading("generate-mock-traffic");
    const mockEvents: any[] = [];
    const eventNames = ["page_view", "cta_click", "page_view", "page_view"];
    const paths = ["/", "/login", "/", "/create"];

    // Generate 40 events spread over the last 7 days
    for (let i = 0; i < 40; i++) {
      const randomDayOffset = Math.random() * 6; // last 6 days
      const date = new Date(Date.now() - randomDayOffset * 24 * 60 * 60 * 1000);
      const isPageView = Math.random() > 0.3;
      
      mockEvents.push({
        event_name: isPageView ? "page_view" : "cta_click",
        page_path: isPageView ? paths[Math.floor(Math.random() * paths.length)] : "/",
        session_id: "session_" + Math.floor(Math.random() * 1000),
        metadata: {
          utm_source: ["google", "instagram", "facebook", "email"][Math.floor(Math.random() * 4)],
          browser: "Chrome",
          screenResolution: "1920x1080"
        },
        created_at: date.toISOString()
      });
    }

    try {
      const { error: insertErr } = await supabase
        .from("analytics_events")
        .insert(mockEvents);

      if (insertErr) throw insertErr;
      await fetchDashboardData();
    } catch (err: any) {
      alert("Erro ao gerar tráfego de teste: " + (err.message || err));
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearMockData = async () => {
    if (!window.confirm("ATENÇÃO: Isso excluirá TODOS os leads e eventos do banco de dados para testes. Continuar?")) return;
    setActionLoading("clear-mock-data");
    try {
      const { error: leadsErr } = await supabase.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000"); // deletes all
      const { error: eventsErr } = await supabase.from("analytics_events").delete().neq("id", "00000000-0000-0000-0000-000000000000"); // deletes all
      
      if (leadsErr) throw leadsErr;
      if (eventsErr) throw eventsErr;

      await fetchDashboardData();
    } catch (err: any) {
      alert("Erro ao limpar dados de teste: " + (err.message || err));
    } finally {
      setActionLoading(null);
    }
  };

  // ----------------------------------------------------
  // DATA PREPARATION FOR CHARTS
  // ----------------------------------------------------
  const getChartData = () => {
    // Group events and leads by day for the last 7 days
    const days: Record<string, { date: string; leads: number; visits: number }> = {};
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
      const key = d.toISOString().split("T")[0];
      days[key] = { date: dateStr, leads: 0, visits: 0 };
    }

    // Populate visits (page_view events)
    events.forEach(event => {
      const key = event.created_at.split("T")[0];
      if (days[key] && event.event_name === "page_view") {
        days[key].visits += 1;
      }
    });

    // Populate leads
    leads.forEach(lead => {
      const key = lead.created_at.split("T")[0];
      if (days[key]) {
        days[key].leads += 1;
      }
    });

    return Object.values(days);
  };

  const getSourceDistribution = () => {
    const sources: Record<string, number> = {};
    leads.forEach(lead => {
      const src = lead.source || "Direto / Desconhecido";
      sources[src] = (sources[src] || 0) + 1;
    });

    return Object.keys(sources).map(key => ({
      name: key,
      value: sources[key]
    }));
  };

  // Auth Loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cta border-t-transparent mx-auto"></div>
          <p className="text-sm text-muted-foreground">Autenticando sessão...</p>
        </div>
      </div>
    );
  }

  // Not Authorized View
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-md w-full glass-card border border-destructive/20 rounded-2xl p-8 shadow-elevated space-y-6 text-center animate-fade-up">
          <div className="h-14 w-14 rounded-full bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto shadow-inner">
            <Lock className="h-6 w-6" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Acesso Restrito</h1>
            <p className="text-sm text-muted-foreground text-balance">
              Você não possui permissões administrativas para visualizar este painel. Caso seja um administrador, certifique-se de estar autenticado com a conta correta.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link 
              to="/login"
              className="flex-1 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-semibold transition-all hover:shadow-lg active:scale-98"
            >
              Fazer Login
            </Link>
            <Link 
              to="/"
              className="flex-1 py-2.5 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-all active:scale-98"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter lists based on search criteria
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
    (l.phone && l.phone.includes(leadSearch)) ||
    l.source.toLowerCase().includes(leadSearch.toLowerCase())
  );

  const filteredProfiles = profiles.filter(p => 
    (p.name && p.name.toLowerCase().includes(userSearch.toLowerCase())) ||
    p.slug.toLowerCase().includes(userSearch.toLowerCase())
  );

  const stats = {
    totalLeads: leads.length,
    totalVisits: events.filter(e => e.event_name === "page_view").length,
    conversionRate: events.filter(e => e.event_name === "page_view").length > 0
      ? ((leads.length / events.filter(e => e.event_name === "page_view").length) * 100).toFixed(1)
      : "0",
    totalAdmins: profiles.filter(p => p.is_admin).length,
    totalProducts: products.length
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      <SEO title="Painel Administrativo | Fast Motors" description="Gerenciamento de leads, produtos, métricas de tráfego e usuários." />

      {/* Header */}
      <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-cta flex items-center justify-center text-cta-foreground shadow-torque">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-white block">
                FAST<span className="text-cta">MOTORS</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider block -mt-1">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white">{currentUserProfile?.name || user?.email}</p>
              <p className="text-[10px] text-cta font-medium uppercase">Master Administrator</p>
            </div>

            <button 
              onClick={handleLogout}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] hover:bg-[#18181b] text-muted-foreground hover:text-white transition-colors"
              title="Sair da Conta"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Error if database retrieval failed */}
        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex gap-3 items-start animate-fade-up">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Erro ao carregar dados do banco de dados</p>
              <p className="text-xs text-muted-foreground mt-1">{error}</p>
              <button 
                onClick={fetchDashboardData} 
                className="mt-3 text-xs bg-destructive/20 hover:bg-destructive/30 px-3 py-1 rounded font-semibold text-destructive border border-destructive/30 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Tabs and Stat Cards */}
        <div className="space-y-6">
          {/* Tabs Nav */}
          <div className="flex overflow-x-auto border-b border-[#27272a] pb-px gap-2 scrollbar-none">
            {[
              { id: "overview", label: "Visão Geral", icon: Layers },
              { id: "leads", label: "Leads", icon: Users, badge: leads.length },
              { id: "products", label: "Produtos", icon: Package, badge: products.length },
              { id: "users", label: "Usuários", icon: UserCheck, badge: profiles.length },
              { id: "analytics", label: "Analytics & Logs", icon: MousePointerClick, badge: events.length }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                    isActive 
                      ? "border-cta text-cta bg-cta/5" 
                      : "border-transparent text-muted-foreground hover:text-white hover:border-[#3f3f46]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-cta/20 text-cta" : "bg-[#18181b] text-muted-foreground"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Metrics (Static Top Bar) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Leads Card */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden transition-all hover:border-cta/30 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cta/5 rounded-full blur-xl pointer-events-none group-hover:bg-cta/10 transition-all"></div>
              <div className="flex justify-between items-start">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Leads</p>
                <div className="h-8 w-8 rounded-lg bg-cta/10 text-cta flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight text-white">
                  {dataLoading ? "..." : stats.totalLeads}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 font-medium">
                  <span className="text-cta flex items-center font-bold"><ArrowUpRight className="h-3 w-3" /> 100%</span> convertidos da LP
                </p>
              </div>
            </div>

            {/* Visitors Card */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden transition-all hover:border-[#3f3f46] group">
              <div className="flex justify-between items-start">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Visualizações (LP)</p>
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <MousePointerClick className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight text-white">
                  {dataLoading ? "..." : stats.totalVisits}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                  Contagem total de tráfego capturado
                </p>
              </div>
            </div>

            {/* Conversion Rate Card */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden transition-all hover:border-[#3f3f46] group">
              <div className="flex justify-between items-start">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversão Média</p>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight text-white">
                  {dataLoading ? "..." : `${stats.conversionRate}%`}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                  Leads em relação às visualizações
                </p>
              </div>
            </div>

            {/* Products Card */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden transition-all hover:border-[#3f3f46] group">
              <div className="flex justify-between items-start">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produtos Ativos</p>
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Package className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight text-white">
                  {dataLoading ? "..." : stats.totalProducts}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                  Itens configurados no catálogo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-up">
            
            {/* Simulation and Test Panel */}
            <div className="bg-[#18181b] border border-cta/30 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cta/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cta animate-pulse" />
                    <h3 className="text-sm font-bold text-white">Console de Testes & Simulação</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Gere leads fictícios e tráfego simulado para visualizar o comportamento dos gráficos e tabelas do painel.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleGenerateMockLeads}
                    disabled={actionLoading === "generate-mock-leads"}
                    className="px-3.5 py-2 bg-cta/15 text-cta border border-cta/25 hover:bg-cta/25 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {actionLoading === "generate-mock-leads" ? "Gerando..." : "Gerar 5 Leads"}
                  </button>
                  <button
                    onClick={handleGenerateMockTraffic}
                    disabled={actionLoading === "generate-mock-traffic"}
                    className="px-3.5 py-2 bg-[#6366f1]/15 text-[#818cf8] border border-[#6366f1]/25 hover:bg-[#6366f1]/25 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {actionLoading === "generate-mock-traffic" ? "Gerando..." : "Simular Tráfego"}
                  </button>
                  <button
                    onClick={handleClearMockData}
                    disabled={actionLoading === "clear-mock-data"}
                    className="px-3.5 py-2 bg-destructive/15 text-destructive border border-destructive/25 hover:bg-destructive/25 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {actionLoading === "clear-mock-data" ? "Limpando..." : "Limpar Dados"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Analytics Graph */}
              <div className="lg:col-span-2 bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Atividade Semanal</h3>
                    <p className="text-xs text-muted-foreground">Volume de tráfego e leads capturados nos últimos 7 dias</p>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-indigo-400">
                      <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Visitas
                    </span>
                    <span className="flex items-center gap-1.5 text-cta">
                      <span className="h-2 w-2 rounded-full bg-cta"></span> Leads
                    </span>
                  </div>
                </div>

                <div className="h-72 w-full text-xs font-medium">
                  {dataLoading ? (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      Carregando gráfico...
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="date" stroke="#71717a" tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px", color: "#fff" }}
                        />
                        <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                        <Area type="monotone" dataKey="leads" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Lead Source Chart */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Origem dos Leads</h3>
                  <p className="text-xs text-muted-foreground">Distribuição de contatos por canal ou campanha UTM</p>
                </div>

                <div className="h-56 w-full text-xs flex items-center justify-center">
                  {dataLoading ? (
                    <p className="text-muted-foreground">Carregando dados...</p>
                  ) : leads.length === 0 ? (
                    <p className="text-muted-foreground">Nenhum lead capturado ainda.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getSourceDistribution()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#71717a" tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px", color: "#fff" }}
                        />
                        <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]}>
                          {getSourceDistribution().map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#22c55e" : "#6366f1"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="border-t border-[#27272a] pt-4 mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Total de Canais</span>
                    <strong className="text-white">{getSourceDistribution().length}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Recents lists side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white">Leads Recentes</h3>
                    <p className="text-xs text-muted-foreground">Últimos contatos capturados no formulário</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("leads")} 
                    className="text-xs text-cta hover:underline font-semibold flex items-center gap-1"
                  >
                    Ver todos <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#27272a] max-h-80 overflow-y-auto pr-1">
                  {dataLoading ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Carregando leads...</p>
                  ) : leads.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Nenhum lead encontrado.</p>
                  ) : (
                    leads.slice(0, 5).map(lead => (
                      <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{lead.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{lead.email}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-cta/15 text-cta border border-cta/20 uppercase tracking-wider">
                            {lead.source}
                          </span>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {new Date(lead.created_at).toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent System Logs */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white">Logs do Sistema</h3>
                    <p className="text-xs text-muted-foreground">Registro de atividades e eventos do usuário na LP</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("analytics")} 
                    className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    Ver Logs <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#27272a] max-h-80 overflow-y-auto pr-1">
                  {dataLoading ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Carregando logs...</p>
                  ) : events.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Nenhum evento registrado.</p>
                  ) : (
                    events.slice(0, 5).map(event => (
                      <div key={event.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{event.event_name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{event.page_path || "/"}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-mono text-muted-foreground">
                            Session: {event.session_id ? event.session_id.substring(0, 8) : "N/A"}...
                          </p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">
                            {new Date(event.created_at).toLocaleTimeString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: LEADS LIST */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Base de Leads</h2>
                <p className="text-xs text-muted-foreground">Gerencie todos os contatos que preencheram o formulário de conversão.</p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Pesquisar leads..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded-xl text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cta text-white"
                />
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#27272a] bg-[#1a1a1e] text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">E-mail</th>
                      <th className="px-6 py-4">Telefone</th>
                      <th className="px-6 py-4">Canal/Origem</th>
                      <th className="px-6 py-4">Metadados UTM</th>
                      <th className="px-6 py-4">Capturado em</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-xs">
                    {dataLoading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">
                          Carregando lista de leads...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">
                          Nenhum lead correspondente encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-[#1f1f23]/40 transition-colors group">
                          <td className="px-6 py-4 font-semibold text-white">{lead.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{lead.email}</td>
                          <td className="px-6 py-4 text-muted-foreground">{lead.phone || "—"}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-cta/10 text-cta border border-cta/20 uppercase tracking-wide">
                              {lead.source}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground max-w-xs truncate" title={JSON.stringify(lead.metadata)}>
                            {lead.metadata ? (
                              <span className="flex items-center gap-1">
                                <Info className="h-3 w-3 inline text-indigo-400" />
                                {Object.keys(lead.metadata).map(k => `${k}: ${lead.metadata[k]}`).join(" | ")}
                              </span>
                            ) : "—"}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              disabled={actionLoading === `delete-lead-${lead.id}`}
                              className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-destructive/10 transition-colors disabled:opacity-50 inline-flex items-center justify-center"
                              title="Remover Lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Stats */}
              <div className="bg-[#1a1a1e] px-6 py-4 border-t border-[#27272a] flex justify-between items-center text-xs text-muted-foreground font-semibold">
                <p>Mostrando {filteredLeads.length} de {leads.length} leads</p>
                <p>Fast Motors Database Engine</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">Catálogo de Produtos</h2>
                <p className="text-xs text-muted-foreground">Gerencie as ofertas e veículos exibidos para os clientes e leads.</p>
              </div>
              <button 
                onClick={handleOpenAddProduct}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-cta hover:bg-cta/90 px-4 py-2 text-xs font-bold text-cta-foreground shadow-torque transition-transform hover:scale-105 active:scale-95 gap-1.5"
              >
                <Plus className="h-4 w-4" /> Novo Produto
              </button>
            </div>

            {/* Products Grid */}
            {dataLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(n => (
                  <div key={n} className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 h-56 animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-[#18181b] border border-[#27272a] rounded-2xl space-y-3">
                <Package className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="text-sm font-semibold text-white">Nenhum produto cadastrado</p>
                <p className="text-xs text-muted-foreground">Cadastre novos veículos ou métodos para disponibilizar aos clientes.</p>
                <button 
                  onClick={handleOpenAddProduct}
                  className="mt-2 text-xs text-cta hover:underline font-bold"
                >
                  Cadastrar agora
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(prod => (
                  <div key={prod.id} className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#3f3f46] shadow-sm">
                    {/* Image Preview placeholder */}
                    <div className="h-40 bg-[#09090b] relative overflow-hidden flex items-center justify-center border-b border-[#27272a]">
                      {prod.image_url ? (
                        <img 
                          src={prod.image_url} 
                          alt={prod.name} 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as any).src = ""; // Clear if load error
                          }}
                        />
                      ) : (
                        <div className="text-center space-y-1">
                          <Package className="h-8 w-8 text-muted-foreground/45 mx-auto" />
                          <span className="text-[10px] text-muted-foreground font-semibold">Sem Imagem</span>
                        </div>
                      )}
                      
                      {/* Price badge */}
                      <span className="absolute bottom-3 right-3 bg-[#18181b]/90 border border-[#27272a] px-2.5 py-1 rounded-lg text-xs font-bold text-cta backdrop-blur-sm">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(prod.price)}
                      </span>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {prod.description || "Sem descrição fornecida para este item."}
                        </p>
                      </div>

                      <div className="border-t border-[#27272a] pt-4 flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="h-8 w-8 rounded-lg border border-[#27272a] hover:bg-[#27272a] hover:text-white text-muted-foreground flex items-center justify-center transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          disabled={actionLoading === `delete-product-${prod.id}`}
                          className="h-8 w-8 rounded-lg border border-destructive/20 bg-destructive/5 hover:bg-destructive/15 text-destructive flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Excluir"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: USER PROFILES */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Usuários do Sistema</h2>
                <p className="text-xs text-muted-foreground">Promova novos administradores ou configure restrições de perfis.</p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Filtrar por nome ou slug..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded-xl text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cta text-white"
                />
              </div>
            </div>

            {/* Users grid or table */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#27272a] bg-[#1a1a1e] text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Nome de Exibição</th>
                      <th className="px-6 py-4">Slug do Perfil</th>
                      <th className="px-6 py-4">Identificador UUID</th>
                      <th className="px-6 py-4">Nível de Acesso</th>
                      <th className="px-6 py-4">Cadastrado em</th>
                      <th className="px-6 py-4 text-right">Ação Administrativa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-xs">
                    {dataLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                          Carregando usuários...
                        </td>
                      </tr>
                    ) : filteredProfiles.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                          Nenhum usuário correspondente encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredProfiles.map(prof => {
                        const isSelf = prof.id === user?.id;
                        return (
                          <tr key={prof.id} className="hover:bg-[#1f1f23]/40 transition-colors">
                            <td className="px-6 py-4 font-semibold text-white">
                              {prof.name || "Sem nome cadastrado"}
                              {isSelf && (
                                <span className="ml-2 text-[9px] px-1 rounded bg-[#27272a] text-muted-foreground font-normal">Você</span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-mono text-muted-foreground">@{prof.slug}</td>
                            <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground">{prof.id}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                prof.is_admin 
                                  ? "bg-cta/15 text-cta border border-cta/30" 
                                  : "bg-[#27272a] text-muted-foreground border border-[#3f3f46]"
                              }`}>
                                {prof.is_admin ? "Administrador" : "Usuário Comum"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {new Date(prof.created_at).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                              })}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleToggleAdmin(prof)}
                                disabled={isSelf || actionLoading === `toggle-admin-${prof.id}`}
                                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all duration-200 ${
                                  prof.is_admin 
                                    ? "border-destructive/20 bg-destructive/5 hover:bg-destructive/15 text-destructive"
                                    : "border-cta/20 bg-cta/5 hover:bg-cta/15 text-cta"
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                              >
                                {prof.is_admin ? "Revogar Admin" : "Tornar Admin"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: ANALYTICS & SYSTEM EVENT LOGS */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="text-lg font-bold text-white">Eventos e Rastreamento (Analytics)</h2>
              <p className="text-xs text-muted-foreground">Logs de navegação e cliques em tempo real registrados na Landing Page.</p>
            </div>

            {/* Logs Area */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#27272a] bg-[#1a1a1e] flex justify-between items-center text-xs text-muted-foreground">
                <span className="font-semibold text-white">Feed de Logs Ativos</span>
                <span>Registros totais: {events.length}</span>
              </div>

              <div className="divide-y divide-[#27272a] max-h-[500px] overflow-y-auto font-mono text-[11px] p-2 bg-[#0c0c0e]">
                {dataLoading ? (
                  <p className="text-xs text-muted-foreground py-10 text-center font-sans">Carregando feed de eventos...</p>
                ) : events.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-10 text-center font-sans">Nenhum evento rastreado até o momento.</p>
                ) : (
                  events.map(ev => (
                    <div key={ev.id} className="py-2.5 px-4 hover:bg-[#1a1a1e]/40 transition-colors flex flex-col md:flex-row justify-between gap-2 md:items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                          <span className="font-bold text-indigo-400">{ev.event_name}</span>
                          <span className="text-[#a1a1aa] bg-[#18181b] px-1.5 py-0.5 rounded text-[9px] font-bold">
                            {ev.page_path || "/"}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 pl-4 font-sans">
                          <span>Session: <strong className="text-[#a1a1aa]">{ev.session_id || "None"}</strong></span>
                          {ev.metadata && Object.keys(ev.metadata).length > 0 && (
                            <span>Meta: <strong className="text-emerald-400">{JSON.stringify(ev.metadata)}</strong></span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right text-[10px] text-muted-foreground pl-4 md:pl-0 font-sans">
                        {new Date(ev.created_at).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Product ADD / EDIT Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#18181b] border border-[#27272a] max-w-md w-full rounded-2xl p-6 space-y-4 shadow-elevated relative animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-[#27272a]">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h3>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="text-muted-foreground hover:text-white text-xs font-semibold px-2 py-1 rounded hover:bg-[#27272a]"
              >
                Fechar
              </button>
            </div>

            {productFormError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                {productFormError}
              </div>
            )}

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="text-muted-foreground block">Nome do Produto *</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: Método Fast Motors Elite"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#09090b] border border-[#27272a] rounded-lg text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-cta text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground block">Preço (R$) *</label>
                <input 
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ex: 997.00"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="w-full px-3 py-2 bg-[#09090b] border border-[#27272a] rounded-lg text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-cta text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground block">URL da Imagem</label>
                <input 
                  type="url"
                  placeholder="Ex: https://images.unsplash.com/..."
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#09090b] border border-[#27272a] rounded-lg text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-cta text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground block">Descrição</label>
                <textarea 
                  rows={3}
                  placeholder="Descreva detalhes ou benefícios do produto/veículo..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#09090b] border border-[#27272a] rounded-lg text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-cta text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={actionLoading === "product-submit"}
                  className="flex-1 py-2.5 bg-cta text-cta-foreground hover:bg-cta/90 font-bold rounded-xl transition-all active:scale-98 disabled:opacity-50"
                >
                  {actionLoading === "product-submit" ? "Salvando..." : "Salvar Produto"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-2.5 border border-[#27272a] hover:bg-[#27272a] text-white rounded-xl font-bold transition-all active:scale-98"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-6 text-center text-xs text-muted-foreground bg-[#09090b]">
        <p>© 2026 Fast Motors. Todos os direitos reservados. Painel de Controle de Segurança.</p>
      </footer>
    </div>
  );
}
