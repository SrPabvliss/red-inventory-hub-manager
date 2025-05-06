import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoanCard } from "@/components/loans/LoanCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowDownUp, Grid2X2, List, Plus, Table, Package, Handshake } from "lucide-react";
import { UserRole, Loan, Product, User } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Datos de ejemplo para el prototipo
const demoLoans: Loan[] = [
  {
    id: "L001",
    productId: "1",
    product: {
      id: "1",
      barcode: "TEC-001",
      name: "MacBook Pro 16''",
      category: "technology",
      department: "computing",
      quantity: 5,
      status: "available",
      description: "MacBook Pro con chip M1 Pro, 16GB RAM, 512GB SSD",
      cost: 2499.99,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Product,
    userId: "U001",
    user: {
      id: "U001",
      name: "Carlos Méndez",
      email: "cmendez@universidad.edu",
      role: UserRole.STUDENT,
      studentId: "A12345"
    } as User,
    startDate: new Date("2023-04-12"),
    dueDate: new Date("2023-04-19"),
    status: "active"
  },
  {
    id: "L002",
    productId: "2",
    product: {
      id: "2",
      barcode: "TEC-002",
      name: "Monitor Dell UltraSharp 27''",
      category: "electronics",
      department: "computing",
      quantity: 8,
      status: "available",
      description: "Monitor 4K IPS con USB-C",
      cost: 549.99,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Product,
    userId: "U002",
    user: {
      id: "U002",
      name: "María Rodríguez",
      email: "mrodriguez@universidad.edu",
      role: UserRole.STUDENT,
      studentId: "A23456"
    } as User,
    startDate: new Date("2023-04-10"),
    dueDate: new Date("2023-04-17"),
    returnDate: new Date("2023-04-16"),
    status: "returned"
  },
  {
    id: "L003",
    productId: "3",
    product: {
      id: "3",
      barcode: "TEC-003",
      name: "Arduino Starter Kit",
      category: "electronics",
      department: "electronics",
      quantity: 15,
      status: "in_use",
      description: "Kit completo para principiantes con Arduino UNO",
      cost: 89.99,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Product,
    userId: "U003",
    user: {
      id: "U003",
      name: "Juan Pérez",
      email: "jperez@universidad.edu",
      role: UserRole.STUDENT,
      studentId: "A34567"
    } as User,
    startDate: new Date("2023-04-08"),
    dueDate: new Date("2023-04-15"),
    status: "overdue"
  },
  {
    id: "L004",
    productId: "4",
    product: {
      id: "4",
      barcode: "TEC-004",
      name: "Raspberry Pi 4",
      category: "technology",
      department: "computing",
      quantity: 10,
      status: "available",
      description: "Raspberry Pi 4 Model B, 8GB RAM",
      cost: 75.99,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Product,
    userId: "U004",
    user: {
      id: "U004",
      name: "Ana López",
      email: "alopez@universidad.edu",
      role: UserRole.TEACHER,
      department: "computing"
    } as User,
    startDate: new Date("2023-04-12"),
    dueDate: new Date("2023-04-26"),
    status: "active"
  }
];

export default function Loans() {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [allLoans, setAllLoans] = useState<Loan[]>(demoLoans);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>(demoLoans);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("table");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }

    // En una app real, aquí cargaríamos los préstamos del usuario o todos los préstamos si es admin
    // Por ahora usamos los datos de ejemplo
  }, []);

  useEffect(() => {
    filterLoans(activeTab, searchQuery);
  }, [activeTab, searchQuery, allLoans]);

  const filterLoans = (tab: string, query: string) => {
    let filtered = [...allLoans];

    // Filtrar por estado
    if (tab !== "all") {
      filtered = filtered.filter(loan => loan.status === tab);
    }

    // Filtrar por búsqueda
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        loan => 
          loan.product?.name.toLowerCase().includes(lowerQuery) ||
          loan.product?.barcode.toLowerCase().includes(lowerQuery) ||
          loan.user?.name.toLowerCase().includes(lowerQuery) ||
          loan.user?.studentId?.toLowerCase().includes(lowerQuery) ||
          loan.id.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredLoans(filtered);
  };

  const handleReturn = (loan: Loan) => {
    // En una app real, aquí actualizaríamos el estado del préstamo
    const updatedLoans = allLoans.map(l => {
      if (l.id === loan.id) {
        return {
          ...l,
          status: "returned" as "active" | "returned" | "overdue",
          returnDate: new Date()
        };
      }
      return l;
    });
    
    setAllLoans(updatedLoans);
    alert(`Producto ${loan.product?.name} marcado como devuelto correctamente.`);
  };

  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / pageSize));
  const paginatedLoans = filteredLoans.slice((page - 1) * pageSize, page * pageSize);

  const renderGridView = () => (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {paginatedLoans.map(loan => (
        <LoanCard
          key={loan.id}
          loan={loan}
          onReturnClick={handleReturn}
        />
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {paginatedLoans.map(loan => (
        <div key={loan.id} className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{loan.product?.name}</h3>
              <p className="text-sm text-gray-500">Código: {loan.product?.barcode}</p>
              <p className="text-sm">Usuario: {loan.user?.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Inicio: {loan.startDate.toLocaleDateString()}</p>
              <p className="text-sm">Vencimiento: {loan.dueDate.toLocaleDateString()}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReturn(loan)}
                className="mt-2"
              >
                Devolver
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <>
    <div className="border rounded-lg">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Vencimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedLoans.map(loan => (
            <TableRow key={loan.id}>
              <TableCell>{loan.product?.name}</TableCell>
              <TableCell>{loan.product?.barcode}</TableCell>
              <TableCell>{loan.user?.name}</TableCell>
              <TableCell>{loan.startDate.toLocaleDateString()}</TableCell>
              <TableCell>{loan.dueDate.toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  loan.status === 'active' ? 'bg-green-100 text-green-800' :
                  loan.status === 'returned' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {loan.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReturn(loan)}
                >
                  Devolver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
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
      </>
  );

  return (
    <MainLayout title="Préstamos" userRole={userRole}>
      <div className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full">
        <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <div className="mb-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground font-medium">Operaciones</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Handshake className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Préstamos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <h2 className="text-2xl font-bold tracking-tight">Gestión de Préstamos</h2>
            <p className="text-muted-foreground">Consulta y administra todos los préstamos registrados en el sistema</p>
          </div>
        </div>
        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <Input
                  type="search"
                  placeholder="Buscar por nombre, código o usuario..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
                <Select>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Más reciente</SelectItem>
                    <SelectItem value="date-asc">Más antiguo</SelectItem>
                    <SelectItem value="name-asc">Nombre A-Z</SelectItem>
                    <SelectItem value="name-desc">Nombre Z-A</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="returned">Devueltos</SelectItem>
                    <SelectItem value="overdue">Vencidos</SelectItem>
                  </SelectContent>
                </Select>
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
                {userRole === UserRole.ADMIN && (
                  <Button onClick={() => navigate("/loans/new")} className="flex items-center gap-2">
                    <Plus size={18} />
                    <span>Registrar préstamo</span>
                  </Button>
                )}
              </div>
            </div>
            <hr className="border-t border-muted" />
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6">
            {filteredLoans.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No se encontraron préstamos que coincidan con los filtros</p>
              </div>
            ) : (
              <>
                {viewMode === "grid" && renderGridView()}
                {viewMode === "list" && renderListView()}
                {viewMode === "table" && renderTableView()}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
