import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";

import Page from "./pages/Lading"; // Import the Lading page

// Create Query Client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/welcome" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<Register />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/user/:slug" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/lading" element={<Navigate to="/" replace />} />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
                
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}


