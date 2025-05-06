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
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Material {
  id: number;
  name: string;
  description: string;
  materialType: string;
  active: boolean;
}

// Datos mock para pruebas
const mockMaterials: Material[] = [
  {
    id: 1,
    name: "Madera",
    description: "Material de madera para muebles",
    materialType: "Natural",
    active: true
  },
  {
    id: 2,
    name: "Acero",
    description: "Material metálico para estructuras",
    materialType: "Sintético",
    active: true
  },
  {
    id: 3,
    name: "Plástico",
    description: "Material polimérico para diversos usos",
    materialType: "Sintético",
    active: true
  }
];

export default function Materials() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos la carga de datos
    setMaterials(mockMaterials);
    setLoading(false);
  }, []);

  // Filtrado y paginación
  const filteredMaterials = materials.filter(material =>
    (!search ||
      material.name.toLowerCase().includes(search.toLowerCase()) ||
      material.description.toLowerCase().includes(search.toLowerCase())
    ) &&
    (typeFilter === "all" || material.materialType === typeFilter) &&
    (statusFilter === "all" || 
      (statusFilter === "active" && material.active) ||
      (statusFilter === "inactive" && !material.active))
  );

  const totalPages = Math.max(1, Math.ceil(filteredMaterials.length / pageSize));
  const paginatedMaterials = filteredMaterials.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search, typeFilter, statusFilter]);

  const handleEdit = (id: number) => {
    navigate(`/materials/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro de eliminar este material?")) {
      // Simulamos la eliminación
      setMaterials(materials.filter(material => material.id !== id));
    }
  };

  return (
    <MainLayout title="Materiales">
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
                <Package className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Materiales</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Materiales</h2>
          <p className="text-muted-foreground">Todos los materiales registrados en el sistema</p>
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
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="Natural">Natural</SelectItem>
                    <SelectItem value="Sintético">Sintético</SelectItem>
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
              <Button onClick={() => navigate("/materials/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Material
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
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descripción</TableHead>
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
                  ) : paginatedMaterials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Package className="h-10 w-10 opacity-30" />
                          <span>No hay materiales para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {material.materialType}
                          </Badge>
                        </TableCell>
                        <TableCell>{material.description}</TableCell>
                        <TableCell>
                          <Badge variant={material.active ? "default" : "secondary"}>
                            {material.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(material.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(material.id)}
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