import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLead, LeadData } from "../api/endpoints/leads";
import { useAppContext } from "../contexts/AppContext";

export function useLeadCapture() {
  const { utmParams } = useAppContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<LeadData, "metadata">) => {
      const leadData: LeadData = {
        ...data,
        metadata: {
          utm_source: utmParams.source,
          utm_medium: utmParams.medium,
          utm_campaign: utmParams.campaign,
          utm_term: utmParams.term,
          utm_content: utmParams.content,
        },
      };
      return createLead(leadData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
