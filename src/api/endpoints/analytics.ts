import { supabase } from "../client";

export interface AnalyticsEvent {
  eventName: string;
  pagePath?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export async function trackEvent(event: AnalyticsEvent) {
  const { data, error } = await supabase
    .from("analytics_events")
    .insert([
      {
        event_name: event.eventName,
        page_path: event.pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
        session_id: event.sessionId,
        metadata: {
          ...event.metadata,
          screenResolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : undefined,
          language: typeof window !== "undefined" ? window.navigator.language : undefined,
        },
      },
    ])
    .select();

  if (error) {
    console.error("Error tracking event:", error);
    throw error;
  }

  return data;
}

export async function getAnalyticsMetrics() {
  // Mock or simple aggregation query if needed
  const { data, error } = await supabase
    .from("analytics_events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching analytics events:", error);
    throw error;
  }

  return data;
}
