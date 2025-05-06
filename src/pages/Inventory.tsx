import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/inventory/ProductCard";
import { ProductFilters } from "@/components/inventory/ProductFilters";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, ArrowDownUp, Plus, Package } from "lucide-react";
import { Product, ProductCategory, Department, ProductStatus, UserRole } from "@/types";
import { ProductTable } from "@/components/inventory/ProducTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

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
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("table");
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(demoProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoanFormOpen, setIsLoanFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 8;

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
    setPage(1); // Resetear página al filtrar
  };

  const handleLoanClick = (product: Product) => {
    setSelectedProduct(product);
    setIsLoanFormOpen(true);
  };

  const handleViewClick = (product: Product) => {
    alert(`Ver detalles de: ${product.name}`);
  };

  interface LoanFormData {
    userId: string;
    startDate: Date;
    endDate: Date;
    notes: string;
  }

  const handleLoanSubmit = (data: LoanFormData) => {
    console.log("Préstamo registrado:", data);
    setIsLoanFormOpen(false);
  };

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  // Vistas alternables
  const renderGridView = () => (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onLoanClick={handleLoanClick}
          onViewClick={handleViewClick}
        />
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {paginatedProducts.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">Código: {product.barcode}</p>
            <p className="text-sm">Categoría: {product.category}</p>
            <p className="text-sm">Departamento: {product.department}</p>
            <p className="text-sm">Cantidad: {product.quantity}</p>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium "
              style={{ background: product.status === ProductStatus.AVAILABLE ? '#bbf7d0' : product.status === ProductStatus.IN_USE ? '#fef08a' : '#fecaca', color: product.status === ProductStatus.AVAILABLE ? '#166534' : product.status === ProductStatus.IN_USE ? '#854d0e' : '#991b1b' }}>
              {product.status === ProductStatus.AVAILABLE ? 'Disponible' : product.status === ProductStatus.IN_USE ? 'En uso' : product.status === ProductStatus.MAINTENANCE ? 'En mantenimiento' : 'Otro'}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleViewClick(product)}>Ver</Button>
              <Button variant="outline" size="sm" onClick={() => handleLoanClick(product)}>Prestar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout title="Inventario" userRole={userRole}>
      <div className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full">
        {/* Breadcrumbs */}
        <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground font-medium">Operaciones</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Package className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Inventario</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Productos en Inventario</h2>
          <p className="text-muted-foreground">Gestiona todos los productos del inventario</p>
        </div>

        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filtros y acción principal en una sola fila */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2">
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
              <div className="flex items-center gap-2">
                <div className="border rounded-md flex">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                    className="rounded-r-none"
                  >
                    <ArrowDownUp size={18} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List size={18} />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-l-none"
                  >
                    <Grid2X2 size={18} />
                  </Button>
                </div>
                <Button onClick={() => navigate("/products/new")} className="flex items-center gap-2">
                  <Plus size={18} />
                  <span>Registrar Producto</span>
                </Button>
              </div>
            </div>
            <hr className="border-t border-muted" />
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6">
            <div className="min-h-[400px] flex flex-col justify-between">
              {viewMode === "grid" && renderGridView()}
              {viewMode === "list" && renderListView()}
              {viewMode === "table" && (
                <ProductTable
                  products={paginatedProducts}
                  onLoanClick={handleLoanClick}
                  onViewClick={handleViewClick}
                />
              )}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-10 w-10 opacity-30" />
                    <span>No se encontraron productos que coincidan con los filtros</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
