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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Warehouse } from "lucide-react";

const warehouseSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  responsibleId: z.number().min(1, "El responsable es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  active: z.boolean(),
});

type WarehouseFormValues = z.infer<typeof warehouseSchema>;

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

export default function WarehouseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      name: "",
      location: "",
      responsibleId: 1,
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchWarehouse = async () => {
        try {
          // Simulamos la carga de un almacén existente
          const warehouse = mockWarehouses.find(w => w.id === Number(id));
          if (warehouse) {
            form.reset(warehouse);
          }
        } catch (error) {
          console.error('Error fetching warehouse:', error);
        }
      };
      fetchWarehouse();
    }
  }, [id, form]);

  const onSubmit = async (data: WarehouseFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/warehouses");
    } catch (error) {
      console.error('Error saving warehouse:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 px-6 md:px-12 w-full">
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
              <BreadcrumbLink href="/warehouses">Almacenes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Almacén" : "Nuevo Almacén"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
       
      </div>

      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles del almacén</h3>
          <p className="text-muted-foreground text-sm">
            Ingresa la información general del almacén, incluyendo nombre, ubicación, responsable y estado.
          </p>
        </div>
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>{id ? "Editar Almacén" : "Nuevo Almacén"}</CardTitle>
              <CardDescription>
                {id ? "Modifica los datos del almacén" : "Complete los datos para crear un nuevo almacén"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del almacén" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación</FormLabel>
                          <FormControl>
                            <Input placeholder="Dirección del almacén" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsibleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsable</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione un responsable" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockResponsibles.map((responsible) => (
                                <SelectItem key={responsible.id} value={responsible.id.toString()}>
                                  {responsible.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descripción detallada del almacén"
                            {...field}
                          />
                        </FormControl>
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
                          <FormLabel className="text-base">
                            Estado
                          </FormLabel>
                          <FormDescription>
                            Indica si el almacén está activo
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/warehouses")}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 