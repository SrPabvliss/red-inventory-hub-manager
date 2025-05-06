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
import { PlusCircle, Pencil, Trash2, MapPin } from "lucide-react";
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

interface Location {
  id: number;
  name: string;
  description: string;
  warehouseId: number;
  parentLocationId: number | null;
  type: string;
  building: string;
  floor: string;
  reference: string;
  capacity: number;
  capacityUnit: string;
  occupancy: number;
  qrCode: string;
  coordinates: string;
  notes: string;
  active: boolean;
}

// Datos mock para pruebas
const mockLocations: Location[] = [
  {
    id: 1,
    name: "Ubicación Central",
    description: "Ubicación principal para almacenamiento",
    warehouseId: 1,
    parentLocationId: null,
    type: "Almacén",
    building: "Edificio A",
    floor: "Piso 2",
    reference: "Cerca de la entrada principal",
    capacity: 100,
    capacityUnit: "Cajas",
    occupancy: 50,
    qrCode: "QR12345",
    coordinates: "40.7128,-74.0060",
    notes: "Ubicación con acceso restringido",
    active: true
  },
  {
    id: 2,
    name: "Almacén Secundario",
    description: "Almacén de respaldo",
    warehouseId: 2,
    parentLocationId: 1,
    type: "Almacén",
    building: "Edificio B",
    floor: "Piso 1",
    reference: "Al final del pasillo",
    capacity: 50,
    capacityUnit: "Cajas",
    occupancy: 25,
    qrCode: "QR12346",
    coordinates: "40.7129,-74.0061",
    notes: "Acceso general",
    active: true
  }
];

export default function Locations() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Simulamos una llamada a la API
    const fetchLocations = async () => {
      try {
        // Simulamos un delay de red
        setLocations(mockLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Filtrado y paginación
  const filteredLocations = useMemo(() =>
    locations.filter(location =>
      !search ||
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.type.toLowerCase().includes(search.toLowerCase()) ||
        location.building.toLowerCase().includes(search.toLowerCase()) ||
        location.floor.toLowerCase().includes(search.toLowerCase())
    ), [locations, search]
  );
  const totalPages = Math.max(1, Math.ceil(filteredLocations.length / pageSize));
  const paginatedLocations = filteredLocations.slice((page - 1) * pageSize, page * pageSize);

  // Resetear página si cambia el filtro
  useEffect(() => { setPage(1); }, [search]);

  const handleEdit = (id: number) => {
    navigate(`/locations/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta ubicación?')) {
      try {
        // Simulamos la eliminación
        setLocations(locations.filter(location => location.id !== id));
      } catch (error) {
        console.error('Error deleting location:', error);
      }
    }
  };

  return (
    <MainLayout title="Ubicaciones">
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
                <MapPin className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbPage>Ubicaciones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight">Lista de Ubicaciones</h2>
          <p className="text-muted-foreground">Todas las ubicaciones registradas en el sistema</p>
        </div>
        <Card className="w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"> {/* Ajusta la width aquí */}
          <CardHeader className="px-4 md:px-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto py-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre, tipo, edificio o piso..."
                  className="border rounded px-3 py-2 text-sm w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button onClick={() => navigate("/locations/new")}> 
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Ubicación
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
                    <TableHead>Edificio</TableHead>
                    <TableHead>Piso</TableHead>
                    <TableHead>Capacidad</TableHead>
                    <TableHead>Ocupación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        Cargando...
                      </TableCell>
                    </TableRow>
                  ) : paginatedLocations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <MapPin className="h-10 w-10 opacity-30" />
                          <span>No hay ubicaciones para mostrar</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLocations.map((location) => (
                      <TableRow key={location.id}>
                        <TableCell>{location.name}</TableCell>
                        <TableCell>{location.type}</TableCell>
                        <TableCell>{location.building}</TableCell>
                        <TableCell>{location.floor}</TableCell>
                        <TableCell>{`${location.capacity} ${location.capacityUnit}`}</TableCell>
                        <TableCell>{`${location.occupancy} ${location.capacityUnit}`}</TableCell>
                        <TableCell>
                          <Badge variant={location.active ? "default" : "secondary"}>
                            {location.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(location.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(location.id)}
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