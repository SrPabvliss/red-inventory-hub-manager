import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/inventory/ProductCard";
import { ProductFilters } from "@/components/inventory/ProductFilters";
import { LoanForm } from "@/components/loans/LoanForm";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, ArrowDownUp, Plus } from "lucide-react";
import { Product, ProductCategory, Department, ProductStatus, UserRole } from "@/types";
import { ProductTable } from "@/components/inventory/ProducTable";

// Productos de ejemplo
const demoProducts: Product[] = [
  {
    id: "1",
    barcode: "TEC-001",
    name: "MacBook Pro 16''",
    category: ProductCategory.TECHNOLOGY,
    department: Department.COMPUTING,
    quantity: 5,
    status: ProductStatus.AVAILABLE,
    description: "MacBook Pro con chip M1 Pro, 16GB RAM, 512GB SSD",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788574000",
    cost: 2499.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    barcode: "TEC-002",
    name: "Monitor Dell UltraSharp 27''",
    category: ProductCategory.ELECTRONICS,
    department: Department.COMPUTING,
    quantity: 8,
    status: ProductStatus.AVAILABLE,
    description: "Monitor 4K IPS con USB-C",
    imageUrl: "https://compuzone.com.ec/images/thumbs/0020689_monitor-dell-24-p2422h-full-hd-ips-60hz-hdmi-vga-dp-usb.jpeg",
    cost: 549.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    barcode: "TEC-003",
    name: "Arduino Starter Kit",
    category: ProductCategory.ELECTRONICS,
    department: Department.ELECTRONICS,
    quantity: 15,
    status: ProductStatus.IN_USE,
    description: "Kit completo para principiantes con Arduino UNO",
    imageUrl: "https://store-usa.arduino.cc/cdn/shop/files/starterkit_02.unbox_934x700.jpg?v=1737973207",
    cost: 89.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    barcode: "TEC-004",
    name: "Microscopio Digital",
    category: ProductCategory.TOOLS,
    department: Department.ELECTRONICS,
    quantity: 3,
    status: ProductStatus.MAINTENANCE,
    description: "Microscopio digital USB con amplificación 1000x",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_801165-MEC74620640516_022024-O.webp",
    cost: 199.99,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function Inventory() {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(demoProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoanFormOpen, setIsLoanFormOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole;
    if (storedRole) setUserRole(storedRole);
  }, []);

  const handleFilterChange = (filters: {
    search: string;
    category: ProductCategory | "";
    department: Department | "";
    status: ProductStatus | "";
  }) => {
    let filtered = [...products];
    const searchLower = filters.search.toLowerCase();

    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.barcode.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.category) filtered = filtered.filter((p) => p.category === filters.category);
    if (filters.department) filtered = filtered.filter((p) => p.department === filters.department);
    if (filters.status) filtered = filtered.filter((p) => p.status === filters.status);

    setFilteredProducts(filtered);
  };

  const handleLoanClick = (product: Product) => {
    setSelectedProduct(product);
    setIsLoanFormOpen(true);
  };

  const handleViewClick = (product: Product) => {
    alert(`Ver detalles de: ${product.name}`);
  };

  const handleLoanSubmit = (data: any) => {
    console.log("Préstamo registrado:", data);
    setIsLoanFormOpen(false);
  };

  return (
    <MainLayout title="Inventario" userRole={userRole}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Productos en Inventario</h2>
          <div className="flex items-center gap-2">
            <div className="border rounded-md flex">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid2X2 size={18} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List size={18} />
              </Button>
            </div>
            <Button variant="outline" size="icon">
              <ArrowDownUp size={18} />
            </Button>
            {userRole === UserRole.ADMIN && (
              <Button onClick={() => navigate("/products/new")} className="flex items-center gap-2">
                <Plus size={18} />
                <span>Registrar Producto</span>
              </Button>
            )}
          </div>
        </div>

        <ProductFilters onFilterChange={handleFilterChange} />

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLoanClick={handleLoanClick}
                onViewClick={handleViewClick}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onLoanClick={handleLoanClick}
            onViewClick={handleViewClick}
          />
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No se encontraron productos que coincidan con los filtros</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <LoanForm
          open={isLoanFormOpen}
          product={selectedProduct}
          onOpenChange={setIsLoanFormOpen}
          onSubmit={handleLoanSubmit}
        />
      )}
    </MainLayout>
  );
}
