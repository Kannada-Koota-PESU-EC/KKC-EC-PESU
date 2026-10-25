import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { StatsigProvider, useStatsigClient } from "@statsig/react-bindings";
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
const Blogs = lazy(() => import("@/features/blogs/pages/BlogsPage"));
const Index = lazy(() => import("@/features/home/pages/IndexPage"));
const Events = lazy(() => import("@/features/events/pages/EventsPage"));
const Team = lazy(() => import("@/features/team/pages/TeamPage"));
const Contact = lazy(() => import("@/features/contact/pages/ContactPage"));
const NotFound = lazy(() => import("@/app/pages/NotFoundPage"));
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
const Recruitment = lazy(() => import("@/features/Recruitment/Recruitment"));
const KarunaduPage = lazy(() => import("@/features/karunadu3d/KarunaduPage"));
import SiteCursor from "@/features/karunadu3d/SiteCursor";
const AksharaShilpaPage = lazy(() => import("@/features/akshara/AksharaShilpaPage"));

// Create a query client instance
const queryClient = new QueryClient();

function RouteScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);
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
            <Suspense
              fallback={
                <div
                  className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground"
                  role="status"
                >
                  Loading page…
                </div>
              }
            >
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />
              {/* <Route path="/upis" element={<Upis />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/karunadu" element={<KarunaduPage />} />
              <Route path="/akshara-shilpa" element={<AksharaShilpaPage />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
