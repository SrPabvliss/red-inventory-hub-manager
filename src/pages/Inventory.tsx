
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/inventory/ProductCard";
import { ProductFilters } from "@/components/inventory/ProductFilters";
import { Button } from "@/components/ui/button";
import { 
  Grid2X2, 
  List, 
  ArrowDownUp, 
  Plus 
} from "lucide-react";
import { UserRole, Product, ProductCategory, Department, ProductStatus } from "@/types";
import { useNavigate } from "react-router-dom";
import { LoanForm } from "@/components/loans/LoanForm";

// Datos de ejemplo para el prototipo
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
    imageUrl: "https://placehold.co/300x200?text=MacBook+Pro",
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
    imageUrl: "https://placehold.co/300x200?text=Monitor+Dell",
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
    imageUrl: "https://placehold.co/300x200?text=Arduino+Kit",
    cost: 89.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    barcode: "TEC-004",
    name: "Raspberry Pi 4",
    category: ProductCategory.TECHNOLOGY,
    department: Department.COMPUTING,
    quantity: 10,
    status: ProductStatus.AVAILABLE,
    description: "Raspberry Pi 4 Model B, 8GB RAM",
    imageUrl: "https://placehold.co/300x200?text=Raspberry+Pi",
    cost: 75.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    barcode: "TEC-005",
    name: "Microscopio Digital",
    category: ProductCategory.TOOLS,
    department: Department.ELECTRONICS,
    quantity: 3,
    status: ProductStatus.MAINTENANCE,
    description: "Microscopio digital USB con amplificación 1000x",
    imageUrl: "https://placehold.co/300x200?text=Microscopio",
    cost: 199.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    barcode: "TEC-006",
    name: "Impresora 3D Creality",
    category: ProductCategory.TECHNOLOGY,
    department: Department.DESIGN,
    quantity: 2,
    status: ProductStatus.IN_USE,
    description: "Impresora 3D Creality Ender 3 V2",
    imageUrl: "https://placehold.co/300x200?text=Impresora+3D",
    cost: 279.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    barcode: "TEC-007",
    name: "Tableta Gráfica Wacom",
    category: ProductCategory.TECHNOLOGY,
    department: Department.DESIGN,
    quantity: 5,
    status: ProductStatus.AVAILABLE,
    description: "Tableta gráfica Wacom Intuos Pro Medium",
    imageUrl: "https://placehold.co/300x200?text=Tableta+Wacom",
    cost: 349.99,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "8",
    barcode: "TEC-008",
    name: "Set de Herramientas Electrónicas",
    category: ProductCategory.TOOLS,
    department: Department.ELECTRONICS,
    quantity: 6,
    status: ProductStatus.AVAILABLE,
    description: "Kit completo de herramientas para electrónica",
    imageUrl: "https://placehold.co/300x200?text=Herramientas",
    cost: 129.99,
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
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleFilterChange = (filters: {
    search: string;
    category: ProductCategory | "";
    department: Department | "";
    status: ProductStatus | "";
  }) => {
    let filtered = [...products];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.barcode.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    if (filters.department) {
      filtered = filtered.filter((product) => product.department === filters.department);
    }

    if (filters.status) {
      filtered = filtered.filter((product) => product.status === filters.status);
    }

    setFilteredProducts(filtered);
  };

  const handleLoanClick = (product: Product) => {
    setSelectedProduct(product);
    setIsLoanFormOpen(true);
  };

  const handleViewClick = (product: Product) => {
    // En una app real, aquí podríamos abrir una vista detallada del producto
    alert(`Ver detalles de: ${product.name}`);
  };

  const handleLoanSubmit = (data: any) => {
    // En una app real, aquí guardaríamos el préstamo
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

        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLoanClick={handleLoanClick}
              onViewClick={handleViewClick}
            />
          ))}
        </div>

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
