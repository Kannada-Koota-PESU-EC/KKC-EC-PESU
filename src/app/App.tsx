import { lazy, Suspense, useEffect } from "react";
import { StatsigProvider, useStatsigClient } from "@statsig/react-bindings";
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/features/home/pages/IndexPage";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import FloatingInstagram from "@/shared/components/layout/FloatingInstagram";
import { LanguageProvider } from "@/shared/i18n/LanguageProvider";
import IntroSplash from "@/features/intro/components/IntroSplash";
import PageMeta from "@/shared/seo/PageMeta";

// Inner pages are loaded on demand, so the homepage downloads less JavaScript
const Blogs = lazy(() => import("@/features/blogs/pages/BlogsPage"));
const Events = lazy(() => import("@/features/events/pages/EventsPage"));
const Team = lazy(() => import("@/features/team/pages/TeamPage"));
const Contact = lazy(() => import("@/features/contact/pages/ContactPage"));
const NotFound = lazy(() => import("@/app/pages/NotFoundPage"));

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
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <IntroSplash />
        <BrowserRouter>
          <PageMeta />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {/* Empty full-height space while a page's code loads (keeps the footer from jumping) */}
              <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/event" element={<Navigate to="/events" replace />} />
                  <Route path="/team" element={<Team />} />
                  {/* <Route path="/upis" element={<Upis />} /> */}
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <FloatingInstagram />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

// Statsig client key comes from VITE_STATSIG_CLIENT_KEY; analytics is skipped when unset
const statsigKey = import.meta.env.VITE_STATSIG_CLIENT_KEY;

const App = () =>
  statsigKey ? (
    <StatsigProvider sdkKey={statsigKey} user={{}}>
      <StatsigLogger /> {/* Logs event when app starts */}
      <AppContent />
    </StatsigProvider>
  ) : (
    <AppContent />
  );

export default App;
