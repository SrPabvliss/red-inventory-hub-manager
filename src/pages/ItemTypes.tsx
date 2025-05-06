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
import { PlusCircle, Pencil, Trash2, Boxes } from "lucide-react";
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

interface ItemType {
  id: number;
  code: string;
  name: string;
  description: string;
  active: boolean;
}

// Datos mock para pruebas
const mockItemTypes: ItemType[] = [
  {
    id: 1,
    code: "IT001",
    name: "Mobiliario",
    description: "Tipo para muebles y enseres",
    active: true
  },
  {
    id: 2,
    code: "IT002",
    name: "Equipos de Cómputo",
    description: "Computadoras, laptops y periféricos",
    active: true
  },
  {
    id: 3,
    code: "IT003",
    name: "Equipos de Laboratorio",
    description: "Instrumentos y equipos para laboratorio",
    active: true
  },
  {
    id: 4,
    code: "IT004",
    name: "Herramientas",
    description: "Herramientas manuales y eléctricas",
    active: false
  }
];

export default function ItemTypes() {
  const navigate = useNavigate();
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos una llamada a la API
    const fetchItemTypes = async () => {
      try {
        // Simulamos un delay de red
        setItemTypes(mockItemTypes);
      } catch (error) {
        console.error('Error fetching item types:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItemTypes();
  }, []);

  // Filtrado y paginación
  const filteredItemTypes = useMemo(() =>
    itemTypes.filter(itemType =>
      !search ||
        itemType.code.toLowerCase().includes(search.toLowerCase()) ||
        itemType.name.toLowerCase().includes(search.toLowerCase()) ||
        itemType.description.toLowerCase().includes(search.toLowerCase())
    ), [itemTypes, search]
  );
  const totalPages = Math.max(1, Math.ceil(filteredItemTypes.length / pageSize));
  const paginatedItemTypes = filteredItemTypes.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search]);

  const handleEdit = (id: number) => {
    navigate(`/item-types/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este tipo de ítem?')) {
      try {
        // Simulamos la eliminación
        setItemTypes(itemTypes.filter(itemType => itemType.id !== id));
      } catch (error) {
        console.error('Error deleting item type:', error);
      }
    }
  };

  return (
    <MainLayout title="Tipos de Items">
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
                <Boxes className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Tipos de Items</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Tipos de Items</h2>
          <p className="text-muted-foreground">Todos los tipos de items registrados en el sistema</p>
        </div>
        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por código, nombre o descripción..."
                  className="border rounded px-3 py-2 text-sm w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button onClick={() => navigate("/item-types/new")}> 
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Tipo
              </Button>
            </div>
            <hr className="border-t border-muted" />
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6">
            <div className="min-h-[400px] flex flex-col justify-between">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
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
                  ) : paginatedItemTypes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Boxes className="h-10 w-10 opacity-30" />
                          <span>No hay tipos de items para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedItemTypes.map((itemType) => (
                      <TableRow key={itemType.id}>
                        <TableCell>{itemType.code}</TableCell>
                        <TableCell>{itemType.name}</TableCell>
                        <TableCell>{itemType.description}</TableCell>
                        <TableCell>
                          <Badge variant={itemType.active ? "default" : "secondary"}>
                            {itemType.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(itemType.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(itemType.id)}
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