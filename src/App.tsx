import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  // ✅ Detect mobile (disable custom cursor)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    // detect screen size
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ✨ CUSTOM CURSOR (DESKTOP ONLY) */}
        {!isMobile && <CustomCursor />}

        {/* 🔥 LOADING SCREEN */}
        <AnimatePresence mode="wait">
          {loading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        {/* 🌐 MAIN APP */}
        {!loading && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;