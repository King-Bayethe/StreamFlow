import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";
import Channel from "./pages/Channel";
import Support from "./pages/Support";
import CreatorDashboard from "./pages/CreatorDashboard";
import ViewerProfile from "./pages/ViewerProfile";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatorRegister from "./pages/CreatorRegister";
import ChannelSetup from "./pages/ChannelSetup";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { Welcome } from "./pages/Welcome";
import CreatorWelcome from "./pages/CreatorWelcome";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/watch/:streamId?" element={<Watch />} />
              <Route path="/channel/:username" element={<Channel />} />
              <Route path="/support" element={<Support />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/creator" element={<CreatorRegister />} />
              <Route path="/channel-setup" element={
                <ProtectedRoute requiredRole="creator">
                  <ChannelSetup />
                </ProtectedRoute>
              } />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/creator-welcome" element={<CreatorWelcome />} />
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/creator-dashboard" element={
                <ProtectedRoute requiredRole="creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ViewerProfile />
                </ProtectedRoute>
              } />
              <Route
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
