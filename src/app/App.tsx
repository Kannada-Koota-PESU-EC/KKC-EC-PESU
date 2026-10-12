import { useEffect } from "react";
import { StatsigProvider, useStatsigClient } from "@statsig/react-bindings";
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// "ಕರುನಾಡು" redesign – the website as a journey through Karnataka.
// The previous pages are still in src/features/* for comparison.
import Layout from "@/features/karunadu/Layout";
import Index from "@/features/karunadu/pages/HomePage";
import Events from "@/features/karunadu/pages/EventsPage";
import Team from "@/features/karunadu/pages/TeamPage";
import Blogs from "@/features/karunadu/pages/BlogsPage";
import Contact from "@/features/karunadu/pages/ContactPage";
import NotFound from "@/features/karunadu/pages/NotFoundPage";

// Create a query client instance
const queryClient = new QueryClient();

// Logging component for Statsig events
function StatsigLogger() {
  const { client } = useStatsigClient();

  useEffect(() => {
    // Log when the app loads
    client.logEvent("app_loaded");
  }, [client]);

  return null; // no UI, just runs logic
}

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            {/* <Route path="/upis" element={<Upis />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  // Wrap entire app with StatsigProvider
  <StatsigProvider sdkKey="client-xxxxxx" user={{ userID: "SharathGowda" }}>
    <StatsigLogger /> {/* Logs event when app starts */}
    <AppContent />
  </StatsigProvider>
);

export default App;
