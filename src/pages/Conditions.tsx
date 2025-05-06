import { useState, useEffect, useMemo } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Wrench } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface Condition {
  id: number;
  name: string;
  description: string;
  requiresMaintenance: boolean;
}

// Datos mock para pruebas
const mockConditions: Condition[] = [
  {
    id: 1,
    name: "Nuevo",
    description: "Condición para ítems nuevos sin uso",
    requiresMaintenance: false
  },
  {
    id: 2,
    name: "Usado - Buen Estado",
    description: "Ítem usado pero en buen estado de conservación",
    requiresMaintenance: false
  },
  {
    id: 3,
    name: "Usado - Requiere Mantenimiento",
    description: "Ítem usado que necesita mantenimiento",
    requiresMaintenance: true
  },
  {
    id: 4,
    name: "Dañado",
    description: "Ítem con daños que requieren reparación",
    requiresMaintenance: true
  }
];

export default function Conditions() {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos una llamada a la API
    const fetchConditions = async () => {
      try {
        // Simulamos un delay de red
        setConditions(mockConditions);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConditions();
  }, []);

  // Filtrado y paginación
  const filteredConditions = useMemo(() =>
    conditions.filter(condition =>
      !search ||
        condition.name.toLowerCase().includes(search.toLowerCase()) ||
        condition.description.toLowerCase().includes(search.toLowerCase())
    ), [conditions, search]
  );
  const totalPages = Math.max(1, Math.ceil(filteredConditions.length / pageSize));
  const paginatedConditions = filteredConditions.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search]);

  const handleEdit = (id: number) => {
    navigate(`/conditions/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta condición?')) {
      try {
        // Simulamos la eliminación
        setConditions(conditions.filter(condition => condition.id !== id));
      } catch (error) {
        console.error('Error deleting condition:', error);
      }
    }
  };

  return (
    <MainLayout title="Condiciones">
      <div
        className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full"
        // Ajusta la width aquí para probar diferentes anchos de canvas
        // Ejemplo: w-[1000px] min-w-[900px] max-w-[1100px] mx-auto
      >
        {/* Breadcrumbs, título y descripción */}
        <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-muted-foreground font-medium">Configuración</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Wrench className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Condiciones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Condiciones</h2>
          <p className="text-muted-foreground">Todas las condiciones registradas en el sistema</p>
        </div>
        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
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
              </div>
              <Button onClick={() => navigate("/conditions/new")}> 
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Condición
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
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Cargando...
                      </TableCell>
                    </TableRow>
                  ) : paginatedConditions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Wrench className="h-10 w-10 opacity-30" />
                          <span>No hay condiciones para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedConditions.map((condition) => (
                      <TableRow key={condition.id}>
                        <TableCell>{condition.name}</TableCell>
                        <TableCell>{condition.description}</TableCell>
                        <TableCell>
                          <Badge variant={condition.requiresMaintenance ? "destructive" : "default"}>
                            {condition.requiresMaintenance ? "Requiere" : "No requiere"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(condition.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(condition.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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