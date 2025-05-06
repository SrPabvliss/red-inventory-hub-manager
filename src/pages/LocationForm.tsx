import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const locationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  warehouseId: z.number().min(1, "La bodega es requerida"),
  parentLocationId: z.number().nullable(),
  type: z.string().min(1, "El tipo es requerido"),
  building: z.string().min(1, "El edificio es requerido"),
  floor: z.string().min(1, "El piso es requerido"),
  reference: z.string().min(1, "La referencia es requerida"),
  capacity: z.number().min(0, "La capacidad debe ser mayor o igual a 0"),
  capacityUnit: z.string().min(1, "La unidad de capacidad es requerida"),
  occupancy: z.number().min(0, "La ocupación debe ser mayor o igual a 0"),
  qrCode: z.string().min(1, "El código QR es requerido"),
  coordinates: z.string().min(1, "Las coordenadas son requeridas"),
  notes: z.string().optional(),
  active: z.boolean(),
});

type LocationFormValues = z.infer<typeof locationSchema>;

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

// Datos mock para bodegas
const mockWarehouses = [
  { id: 1, name: "Bodega Principal" },
  { id: 2, name: "Bodega Secundaria" },
];

// Tipos de ubicación predefinidos
const locationTypes = [
  "Almacén",
  "Oficina",
  "Laboratorio",
  "Sala de Servidores",
  "Área de Mantenimiento",
];

// Unidades de capacidad predefinidas
const capacityUnits = [
  "Cajas",
  "Unidades",
  "Metros Cúbicos",
  "Pallets",
  "Estantes",
];

export default function LocationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      description: "",
      warehouseId: 1,
      parentLocationId: null,
      type: "",
      building: "",
      floor: "",
      reference: "",
      capacity: 0,
      capacityUnit: "",
      occupancy: 0,
      qrCode: "",
      coordinates: "",
      notes: "",
      active: true,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchLocation = async () => {
        try {
          // Simulamos la carga de una ubicación existente
          const location = mockLocations.find(l => l.id === Number(id));
          if (location) {
            form.reset(location);
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      };
      fetchLocation();
    }
  }, [id, form]);

  const onSubmit = async (data: LocationFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/locations");
    } catch (error) {
      console.error('Error saving location:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="space-y-6 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"
    >
      <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground font-medium">Configuración</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <MapPin className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbLink href="/locations">Ubicaciones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Ubicación" : "Nueva Ubicación"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bloque: Información General */}
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-1">Información General</h3>
              <p className="text-muted-foreground text-sm">
                Ingresa el nombre, descripción, tipo y estado de la ubicación.
              </p>
            </div>
            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                <CardTitle>{id ? "Editar Ubicación" : "Nueva Ubicación"}</CardTitle>
                <CardDescription>
                  {id ? "Modifica los datos de la ubicación" : "Complete los datos para crear una nueva ubicación"}
                </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre de la ubicación" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descripción de la ubicación" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locationTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Estado</FormLabel>
                            <FormDescription>Indica si la ubicación está activa</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bloque: Ubicación Física */}
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-1">Ubicación Física</h3>
              <p className="text-muted-foreground text-sm">
                Especifica el edificio, piso, referencia y coordenadas de la ubicación.
              </p>
            </div>
            <div className="md:w-2/3">
              <Card>
         
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="building"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Edificio</FormLabel>
                          <FormControl>
                            <Input placeholder="Edificio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="floor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Piso</FormLabel>
                          <FormControl>
                            <Input placeholder="Piso" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referencia</FormLabel>
                          <FormControl>
                            <Input placeholder="Referencia" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coordinates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coordenadas</FormLabel>
                          <FormControl>
                            <Input placeholder="Coordenadas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bloque: Capacidad y Ocupación */}
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-1">Capacidad y Ocupación</h3>
              <p className="text-muted-foreground text-sm">
                Define la capacidad total, unidad de medida y ocupación actual de la ubicación.
              </p>
            </div>
            <div className="md:w-2/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacidad</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Capacidad" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capacityUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidad de Capacidad</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una unidad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {capacityUnits.map((unit) => (
                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occupancy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ocupación</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ocupación" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bloque: Relaciones */}
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-1">Relaciones</h3>
              <p className="text-muted-foreground text-sm">
                Establece las relaciones con la bodega y la ubicación padre si corresponde.
              </p>
            </div>
            <div className="md:w-2/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="warehouseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bodega</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una bodega" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockWarehouses.map((warehouse) => (
                                <SelectItem key={warehouse.id} value={String(warehouse.id)}>{warehouse.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentLocationId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación Padre</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ? String(field.value) : undefined}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una ubicación padre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockLocations.map((location) => (
                                <SelectItem key={location.id} value={String(location.id)}>{location.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bloque: Información Adicional */}
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-1">Información Adicional</h3>
              <p className="text-muted-foreground text-sm">
                Agrega el código QR y notas adicionales sobre la ubicación.
              </p>
            </div>
            <div className="md:w-2/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="qrCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código QR</FormLabel>
                          <FormControl>
                            <Input placeholder="Código QR" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notas</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Notas adicionales" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/locations")}>Cancelar</Button>
            <Button type="submit" disabled={loading}>Guardar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 