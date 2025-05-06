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
import { PlusCircle, Pencil, Trash2, Tags, Palette } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface Color {
  id: number;
  name: string;
  hexCode: string;
  description: string;
}

// Datos mock para pruebas
const mockColors: Color[] = [
  {
    id: 1,
    name: "Rojo",
    hexCode: "#FF0000",
    description: "Color rojo brillante"
  },
  {
    id: 2,
    name: "Azul",
    hexCode: "#0000FF",
    description: "Color azul marino"
  },
  {
    id: 3,
    name: "Verde",
    hexCode: "#00FF00",
    description: "Color verde esmeralda"
  },
  {
    id: 4,
    name: "Amarillo",
    hexCode: "#FFFF00",
    description: "Color amarillo limón"
  }
];

export default function Colors() {
  const navigate = useNavigate();
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos una llamada a la API
    const fetchColors = async () => {
      try {
        // Simulamos un delay de red
        setColors(mockColors);
      } catch (error) {
        console.error('Error fetching colors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchColors();
  }, []);

  // Filtrado y paginación
  const filteredColors = useMemo(() =>
    colors.filter(color =>
      !search ||
        color.name.toLowerCase().includes(search.toLowerCase()) ||
        color.hexCode.toLowerCase().includes(search.toLowerCase()) ||
        color.description.toLowerCase().includes(search.toLowerCase())
    ), [colors, search]
  );
  const totalPages = Math.max(1, Math.ceil(filteredColors.length / pageSize));
  const paginatedColors = filteredColors.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search]);

  const handleEdit = (id: number) => {
    navigate(`/colors/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este color?')) {
      try {
        // Simulamos la eliminación
        setColors(colors.filter(color => color.id !== id));
      } catch (error) {
        console.error('Error deleting color:', error);
      }
    }
  };

  return (
    <MainLayout title="Colores">
      <div
        className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full"
        // Ajusta la width aquí para probar diferentes anchos de canvas
        // Ejemplo: w-[1000px] min-w-[900px] max-w-[1100px] mx-auto
      >
        {/* Breadcrumbs */}
        <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-muted-foreground font-medium">Configuración</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Palette className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Colores</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Colores</h2>
          <p className="text-muted-foreground">Todos los colores registrados en el sistema</p>
        </div>
        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre, código HEX o descripción..."
                  className="border rounded px-3 py-2 text-sm w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button onClick={() => navigate("/colors/new")}> 
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Color
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
                    <TableHead>Color</TableHead>
                    <TableHead>Código HEX</TableHead>
                    <TableHead>Descripción</TableHead>
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
                  ) : paginatedColors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Tags className="h-10 w-10 opacity-30" />
                          <span>No hay colores para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedColors.map((color) => (
                      <TableRow key={color.id}>
                        <TableCell>{color.name}</TableCell>
                        <TableCell>
                          <div 
                            className="w-8 h-8 rounded-full border" 
                            style={{ backgroundColor: color.hexCode }}
                          />
                        </TableCell>
                        <TableCell>{color.hexCode}</TableCell>
                        <TableCell>{color.description}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(color.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(color.id)}
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