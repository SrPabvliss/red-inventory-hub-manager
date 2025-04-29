
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Loans from "./pages/Loans";
import { ProductForm } from "./components/inventory/ProductForm";
import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import { NewLoanForm } from "./components/loans/NewLoanForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/products/new" element={
            <MainLayout title="Registrar Producto">
              <ProductForm />
            </MainLayout>
          } />
          <Route path="/loans/new" element={
            <MainLayout title="Solicitar Préstamo">
              <NewLoanForm />
           </MainLayout>
          } />
          <Route path="/notifications" element={
            <MainLayout title="Notificaciones">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Panel de notificaciones (Próximamente)</p>
              </div>
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
