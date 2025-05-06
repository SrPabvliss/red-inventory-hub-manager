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
import { PlusCircle, Pencil, Trash2, Tags } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Category {
  id: number;
  code: string;
  name: string;
  description: string;
  parentCategoryId: number | null;
  standardUsefulLife: number;
  depreciationPercentage: string;
}

// Datos mock para pruebas
const mockCategories: Category[] = [
  {
    id: 1,
    code: "CAT001",
    name: "Electrónica",
    description: "Productos electrónicos y dispositivos",
    parentCategoryId: null,
    standardUsefulLife: 5,
    depreciationPercentage: "20.00"
  },
  {
    id: 2,
    code: "CAT002",
    name: "Muebles",
    description: "Muebles y mobiliario",
    parentCategoryId: null,
    standardUsefulLife: 10,
    depreciationPercentage: "10.00"
  },
  {
    id: 3,
    code: "CAT003",
    name: "Computadoras",
    description: "Equipos de cómputo y accesorios",
    parentCategoryId: 1,
    standardUsefulLife: 4,
    depreciationPercentage: "25.00"
  },
  {
    id: 4,
    code: "CAT004",
    name: "Sillas",
    description: "Sillas y asientos",
    parentCategoryId: 2,
    standardUsefulLife: 8,
    depreciationPercentage: "12.50"
  }
];

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [parentFilter, setParentFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos una llamada a la API
    const fetchCategories = async () => {
      try {
        // Simulamos un delay de red
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Filtrado y paginación
  const filteredCategories = useMemo(() =>
    categories.filter(cat =>
      (!search ||
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.code.toLowerCase().includes(search.toLowerCase())
      ) &&
      (parentFilter === "all" || String(cat.parentCategoryId) === parentFilter)
    ), [categories, search, parentFilter]
  );
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));
  const paginatedCategories = filteredCategories.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search, parentFilter]);

  const handleEdit = (id: number) => {
    navigate(`/categories/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      try {
        // Simulamos la eliminación
        setCategories(categories.filter(cat => cat.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <MainLayout title="Categorías">
      <div
        className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full"
        // Ajusta la width aquí para probar diferentes anchos de canvas
        // Ejemplo: w-[1000px] min-w-[900px] max-w-[1100px] mx-auto
      >
        {/* Breadcrumbs */}
        {/* Título principal y descripción fuera de la tarjeta */}
        <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground font-medium">Configuración</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Tags className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbPage>Categorías</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Categorías</h2>
          <p className="text-muted-foreground">Todas las categorías registradas en el sistema</p>
        </div>
        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre o código..."
                  className="border rounded px-3 py-2 text-sm w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Select value={parentFilter} onValueChange={setParentFilter}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Todas las categorías padre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías padre</SelectItem>
                    {categories.filter(cat => cat.parentCategoryId === null).map(cat => (
                      <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center h-full"> {/* Alineación vertical */}
                <Button onClick={() => navigate("/categories/new")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nueva Categoría
                </Button>
              </div>
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
                    <TableHead>Categoría Padre</TableHead>
                    <TableHead>Vida Útil (años)</TableHead>
                    <TableHead>Depreciación (%)</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Cargando...
                      </TableCell>
                    </TableRow>
                  ) : paginatedCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Tags className="h-10 w-10 opacity-30" />
                          <span>No hay categorías para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.code}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          {category.parentCategoryId 
                            ? categories.find(c => c.id === category.parentCategoryId)?.name 
                            : "Ninguna"}
                        </TableCell>
                        <TableCell>{category.standardUsefulLife}</TableCell>
                        <TableCell>{category.depreciationPercentage}%</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(category.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(category.id)}
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