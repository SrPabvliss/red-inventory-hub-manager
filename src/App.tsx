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
import { MainLayout } from "@/components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import CategoryForm from "./pages/CategoryForm";
import Colors from "./pages/Colors";
import ColorForm from "./pages/ColorForm";
import Conditions from "./pages/Conditions";
import ConditionForm from "./pages/ConditionForm";
import ItemTypes from "./pages/ItemTypes";
import ItemTypeForm from "./pages/ItemTypeForm";
import Locations from "./pages/Locations";
import LocationForm from "./pages/LocationForm";
import Warehouses from "./pages/Warehouses";
import WarehouseForm from "./pages/WarehouseForm";
import Materials from "./pages/Materials";
import MaterialForm from "./pages/MaterialForm";
import States from "@/pages/States";
import StateForm from "@/pages/StateForm";
import LoanForm from "./pages/LoanForm";

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
              <LoanForm />
            </MainLayout>
          } />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={
            <MainLayout title="Nueva Categoría">
              <CategoryForm />
            </MainLayout>
          } />
          <Route path="/categories/:id/edit" element={
            <MainLayout title="Editar Categoría">
              <CategoryForm />
            </MainLayout>
          } />
          <Route path="/colors" element={<Colors />} />
          <Route path="/colors/new" element={
            <MainLayout title="Nuevo Color">
              <ColorForm />
            </MainLayout>
          } />
          <Route path="/colors/:id/edit" element={
            <MainLayout title="Editar Color">
              <ColorForm />
            </MainLayout>
          } />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/conditions/new" element={
            <MainLayout title="Nueva Condición">
              <ConditionForm />
            </MainLayout>
          } />
          <Route path="/conditions/:id/edit" element={
            <MainLayout title="Editar Condición">
              <ConditionForm />
            </MainLayout>
          } />
          <Route path="/item-types" element={<ItemTypes />} />
          <Route path="/item-types/new" element={
            <MainLayout title="Nuevo Tipo de Item">
              <ItemTypeForm />
            </MainLayout>
          } />
          <Route path="/item-types/:id/edit" element={
            <MainLayout title="Editar Tipo de Item">
              <ItemTypeForm />
            </MainLayout>
          } />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/new" element={
            <MainLayout title="Nueva Ubicación">
              <LocationForm />
            </MainLayout>
          } />
          <Route path="/locations/:id/edit" element={
            <MainLayout title="Editar Ubicación">
              <LocationForm />
            </MainLayout>
          } />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/warehouses/new" element={
            <MainLayout title="Nuevo Almacén">
              <WarehouseForm />
            </MainLayout>
          } />
          <Route path="/warehouses/:id/edit" element={
            <MainLayout title="Editar Almacén">
              <WarehouseForm />
            </MainLayout>
          } />
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/new" element={
            <MainLayout title="Nuevo Material">
              <MaterialForm />
            </MainLayout>
          } />
          <Route path="/materials/:id/edit" element={
            <MainLayout title="Editar Material">
              <MaterialForm />
            </MainLayout>
          } />

          <Route path="/notifications" element={

            <MainLayout title="Notificaciones">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Panel de notificaciones (Próximamente)</p>
              </div>
            </MainLayout>
          } />
          <Route path="/states" element={
            <MainLayout title="Estados">
              <States />
            </MainLayout>
          } />
          <Route path="/states/new" element={
            <MainLayout title="Nuevo Estado">
              <StateForm />
            </MainLayout>
          } />
          <Route path="/states/:id/edit" element={
            <MainLayout title="Editar Estado">
              <StateForm />
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
