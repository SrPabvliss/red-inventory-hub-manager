import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Plus, Pencil, Trash2, Warehouse } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Warehouse {
  id: number;
  name: string;
  location: string;
  responsibleId: number;
  description: string;
  active: boolean;
}

// Datos mock para pruebas
const mockWarehouses: Warehouse[] = [
  {
    id: 1,
    name: "Almacén Central",
    location: "Calle Principal 123, Ciudad",
    responsibleId: 1,
    description: "Almacén principal para productos terminados",
    active: true
  },
  {
    id: 2,
    name: "Almacén Norte",
    location: "Av. Norte 456, Ciudad",
    responsibleId: 2,
    description: "Almacén para materias primas",
    active: true
  }
];

// Datos mock para responsables
const mockResponsibles = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "María García" }
];

export default function Warehouses() {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos la carga de datos
    setWarehouses(mockWarehouses);
    setLoading(false);
  }, []);

  // Filtrado y paginación
  const filteredWarehouses = warehouses.filter(warehouse =>
    (!search ||
      warehouse.name.toLowerCase().includes(search.toLowerCase()) ||
      warehouse.location.toLowerCase().includes(search.toLowerCase())
    ) &&
    (statusFilter === "all" || 
      (statusFilter === "active" && warehouse.active) ||
      (statusFilter === "inactive" && !warehouse.active))
  );

  const totalPages = Math.max(1, Math.ceil(filteredWarehouses.length / pageSize));
  const paginatedWarehouses = filteredWarehouses.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const handleEdit = (id: number) => {
    navigate(`/warehouses/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro de eliminar este almacén?")) {
      // Simulamos la eliminación
      setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
    }
  };

  const getResponsibleName = (id: number) => {
    const responsible = mockResponsibles.find(r => r.id === id);
    return responsible?.name || "No asignado";
  };

  return (
    <MainLayout title="Almacenes">
      <div
        className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full"
      >
        {/* Breadcrumbs */}
        <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-muted-foreground font-medium">Configuración</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Warehouse className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Almacenes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Almacenes</h2>
          <p className="text-muted-foreground">Todos los almacenes registrados en el sistema</p>
        </div>

        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre o ubicación..."
                  className="border rounded px-3 py-2 text-sm w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => navigate("/warehouses/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Almacén
              </Button>
            </div>
            <hr className="border-t border-muted" />
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6">
            <div className="min-h-[400px] flex flex-col justify-between">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Cargando...
                      </TableCell>
                    </TableRow>
                  ) : paginatedWarehouses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Warehouse className="h-10 w-10 opacity-30" />
                          <span>No hay almacenes para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedWarehouses.map((warehouse) => (
                      <TableRow key={warehouse.id}>
                        <TableCell className="font-medium">{warehouse.name}</TableCell>
                        <TableCell>{warehouse.location}</TableCell>
                        <TableCell>{getResponsibleName(warehouse.responsibleId)}</TableCell>
                        <TableCell>{warehouse.description}</TableCell>
                        <TableCell>
                          <Badge variant={warehouse.active ? "default" : "secondary"}>
                            {warehouse.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(warehouse.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(warehouse.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {/* Paginación */}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 