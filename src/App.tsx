
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoutesPage from "./pages/Routes";
import TurnsPage from "./pages/Turns";
import Dashboard from "./pages/Dashboard";
import { RouteProvider } from "./contexts/RouteContext";

// Mock drivers data to initialize RouteProvider
import { sampleDrivers } from "./data/sampleDrivers";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouteProvider initialDrivers={sampleDrivers}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouterRoutes>
              <Route path="/" element={<Index />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/turns" element={<TurnsPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </BrowserRouter>
        </TooltipProvider>
      </RouteProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
