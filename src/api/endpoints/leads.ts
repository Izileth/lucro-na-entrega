import { supabase } from "../client";

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export async function createLead(lead: LeadData) {
  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source || "landing_page",
        metadata: {
          ...lead.metadata,
          userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
        },
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating lead:", error);
    throw error;
  }

  return data;
}

export async function getLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }

  return data;
}
