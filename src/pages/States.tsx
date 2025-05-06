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
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface State {
  id: number;
  name: string;
  description: string;
  requiresMaintenance: boolean;
  active: boolean;
}

// Datos mock para pruebas
const mockStates: State[] = [
  {
    id: 1,
    name: "Nuevo",
    description: "Item en estado nuevo",
    requiresMaintenance: false,
    active: true
  },
  {
    id: 2,
    name: "Usado - Buen Estado",
    description: "Item usado pero en buen estado",
    requiresMaintenance: false,
    active: true
  },
  {
    id: 3,
    name: "En Reparación",
    description: "Item en proceso de reparación",
    requiresMaintenance: true,
    active: true
  },
  {
    id: 4,
    name: "Dañado",
    description: "Item con daños",
    requiresMaintenance: true,
    active: true
  }
];

export default function States() {
  const navigate = useNavigate();
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [maintenanceFilter, setMaintenanceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos la carga de datos
    setStates(mockStates);
    setLoading(false);
  }, []);

  // Filtrado y paginación
  const filteredStates = states.filter(state =>
    (!search ||
      state.name.toLowerCase().includes(search.toLowerCase()) ||
      state.description.toLowerCase().includes(search.toLowerCase())
    ) &&
    (maintenanceFilter === "all" || 
      (maintenanceFilter === "required" && state.requiresMaintenance) ||
      (maintenanceFilter === "not_required" && !state.requiresMaintenance)) &&
    (statusFilter === "all" || 
      (statusFilter === "active" && state.active) ||
      (statusFilter === "inactive" && !state.active))
  );

  const totalPages = Math.max(1, Math.ceil(filteredStates.length / pageSize));
  const paginatedStates = filteredStates.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search, maintenanceFilter, statusFilter]);

  const handleEdit = (id: number) => {
    navigate(`/states/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro de eliminar este estado?")) {
      // Simulamos la eliminación
      setStates(states.filter(state => state.id !== id));
    }
  };

  return (
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
                <AlertCircle className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Estados</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Estados</h2>
          <p className="text-muted-foreground">Todos los estados registrados en el sistema</p>
        </div>

        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre o descripción..."
                  className="border rounded px-3 py-2 text-sm w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Select value={maintenanceFilter} onValueChange={setMaintenanceFilter}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Todos los mantenimientos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los mantenimientos</SelectItem>
                    <SelectItem value="required">Requiere mantenimiento</SelectItem>
                    <SelectItem value="not_required">No requiere mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
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
              <Button onClick={() => navigate("/states/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Estado
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
                    <TableHead>Descripción</TableHead>
                    <TableHead>Mantenimiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Cargando...
                      </TableCell>
                    </TableRow>
                  ) : paginatedStates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <AlertCircle className="h-10 w-10 opacity-30" />
                          <span>No hay estados para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedStates.map((state) => (
                      <TableRow key={state.id}>
                        <TableCell className="font-medium">{state.name}</TableCell>
                        <TableCell>{state.description}</TableCell>
                        <TableCell>
                          <Badge variant={state.requiresMaintenance ? "destructive" : "default"}>
                            {state.requiresMaintenance ? "Requiere" : "No Requiere"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={state.active ? "default" : "secondary"}>
                            {state.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(state.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(state.id)}
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
  );
} 