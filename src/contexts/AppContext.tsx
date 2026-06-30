import React, { createContext, useContext, useEffect, useState } from "react";

interface UtmParameters {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
}

interface AppContextType {
  sessionId: string;
  utmParams: UtmParameters;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [utmParams, setUtmParams] = useState<UtmParameters>({
    source: null,
    medium: null,
    campaign: null,
    term: null,
    content: null,
  });

  useEffect(() => {
    // Session ID management
    let storedSessionId = sessionStorage.getItem("fastmotors_session_id");
    if (!storedSessionId) {
      storedSessionId = generateUUID();
      sessionStorage.setItem("fastmotors_session_id", storedSessionId);
    }
    setSessionId(storedSessionId);

    // UTM tracking
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const utms: UtmParameters = {
        source: urlParams.get("utm_source"),
        medium: urlParams.get("utm_medium"),
        campaign: urlParams.get("utm_campaign"),
        term: urlParams.get("utm_term"),
        content: urlParams.get("utm_content"),
      };
      
      // If UTMs are present, save them to sessionStorage so they persist across pages/reloads
      const hasUtms = Object.values(utms).some((val) => val !== null);
      if (hasUtms) {
        sessionStorage.setItem("fastmotors_utm_params", JSON.stringify(utms));
        setUtmParams(utms);
      } else {
        const cached = sessionStorage.getItem("fastmotors_utm_params");
        if (cached) {
          try {
            setUtmParams(JSON.parse(cached));
          } catch (e) {
            console.error("Failed to parse cached UTM params", e);
          }
        }
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ sessionId, utmParams }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
