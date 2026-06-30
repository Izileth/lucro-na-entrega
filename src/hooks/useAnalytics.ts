import { useMutation } from "@tanstack/react-query";
import { trackEvent, AnalyticsEvent } from "../api/endpoints/analytics";
import { useAppContext } from "../contexts/AppContext";

export function useAnalytics() {
  const { sessionId, utmParams } = useAppContext();

  const trackEventMutation = useMutation({
    mutationFn: (event: Omit<AnalyticsEvent, "sessionId" | "metadata"> & { metadata?: Record<string, any> }) => {
      const fullEvent: AnalyticsEvent = {
        eventName: event.eventName,
        pagePath: event.pagePath,
        sessionId,
        metadata: {
          ...event.metadata,
          utm_source: utmParams.source,
          utm_medium: utmParams.medium,
          utm_campaign: utmParams.campaign,
        },
      };
      return trackEvent(fullEvent);
    },
  });

  const logEvent = (eventName: string, metadata?: Record<string, any>) => {
    trackEventMutation.mutate({
      eventName,
      metadata,
    });
  };

  const logPageView = (pagePath: string) => {
    trackEventMutation.mutate({
      eventName: "page_view",
      pagePath,
    });
  };

  return {
    logEvent,
    logPageView,
    isTracking: trackEventMutation.isPending,
  };
}
