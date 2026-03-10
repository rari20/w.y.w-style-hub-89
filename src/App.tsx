import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { MusicProvider } from "@/context/MusicContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import CookieBanner from "@/components/CookieBanner";
import FloatingQuickAccess from "@/components/FloatingQuickAccess";
import ChatBubble from "@/components/ChatBubble";
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
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminDiscounts from "./pages/admin/AdminDiscounts";
import AdminEmailCampaigns from "./pages/admin/AdminEmailCampaigns";
import AdminSocial from "./pages/admin/AdminSocial";

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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/new" element={<AdminProducts />} />
      <Route path="/admin/inventory" element={<AdminInventory />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/returns" element={<AdminReturns />} />
      <Route path="/admin/customers" element={<AdminCustomers />} />
      <Route path="/admin/discounts" element={<AdminDiscounts />} />
      <Route path="/admin/email-campaigns" element={<AdminEmailCampaigns />} />
      <Route path="/admin/social" element={<AdminSocial />} />
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
                <FloatingQuickAccess />
                <ChatBubble />
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
