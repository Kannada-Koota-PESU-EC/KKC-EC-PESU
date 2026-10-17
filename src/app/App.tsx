import { useEffect, type ReactNode } from "react";
import { StatsigProvider, useStatsigClient } from "@statsig/react-bindings";
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Blogs from "@/features/blogs/pages/BlogsPage";
import Index from "@/features/home/pages/IndexPage";
import Events from "@/features/events/pages/EventsPage";
import Team from "@/features/team/pages/TeamPage";
import Contact from "@/features/contact/pages/ContactPage";
import NotFound from "@/app/pages/NotFoundPage";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Recruitments from "@/features/Recruitment/Recruitment";

// Create a query client instance
const queryClient = new QueryClient();

function RouteScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);
  return null;
}

// Each page gets its own cursor style (see SiteCursor)
const PAGE_CURSOR: Record<string, string> = {
  "/": "mallige",
  "/events": "kumkuma",
  "/blogs": "film",
  "/team": "silver",
  "/contact": "zari",
  "/recruitment": "firefly",
  "/karunadu": "compass",
};

function CursorZone({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <main className="flex-1" data-cursor={PAGE_CURSOR[pathname] ?? "water"}>
      {children}
    </main>
  );
}

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
        <div className="min-h-screen flex flex-col">
          <RouteScrollManager />
          <Navbar />
          <CursorZone>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />
              <Route path="/recruitments" element={<Recruitments />} />
              {/* <Route path="/upis" element={<Upis />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/karunadu" element={<KarunaduPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CursorZone>
          <Footer />
          <SiteCursor />
        </div>
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
