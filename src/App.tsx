import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { MusicProvider } from "@/context/MusicContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import CookieBanner from "@/components/CookieBanner";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { BrandsPage, BrandDetail } from "./pages/Brands";
import Consultation from "./pages/Consultation";
import Rewards from "./pages/Rewards";
import StoreLocator from "./pages/StoreLocator";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Returns from "./pages/Returns";
import CustomerService from "./pages/CustomerService";
import GiftCards from "./pages/GiftCards";
import { TermsPage, PrivacyPage, CookiePage, AccessibilityPage } from "./pages/Legal";
import Feedback from "./pages/Feedback";
import AdminDataset from "./pages/AdminDataset";
import ChurnPredictor from "./pages/ChurnPredictor";
import RetentionDashboard from "./pages/RetentionDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/brands/:id" element={<BrandDetail />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/stores" element={<StoreLocator />} />
      <Route path="/account" element={<Account />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/gift-cards" element={<GiftCards />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/cookies" element={<CookiePage />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin/dataset" element={<AdminDataset />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <MusicProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnimatedRoutes />
                <CookieBanner />
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </MusicProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
