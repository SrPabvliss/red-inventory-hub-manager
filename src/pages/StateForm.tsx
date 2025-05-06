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
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { AlertCircle } from "lucide-react";

const stateSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  requiresMaintenance: z.boolean(),
  active: z.boolean(),
});

type StateFormValues = z.infer<typeof stateSchema>;

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

export default function StateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<StateFormValues>({
    resolver: zodResolver(stateSchema),
    defaultValues: {
      name: "",
      description: "",
      requiresMaintenance: false,
      active: true,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchState = async () => {
        try {
          // Simulamos la carga de un estado existente
          const state = mockStates.find(s => s.id === Number(id));
          if (state) {
            form.reset(state);
          }
        } catch (error) {
          console.error('Error fetching state:', error);
        }
      };
      fetchState();
    }
  }, [id, form]);

  const onSubmit = async (data: StateFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Datos a guardar:', data);
      navigate("/states");
    } catch (error) {
      console.error('Error saving state:', error);
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
              <AlertCircle className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbLink href="/states">Estados</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Estado" : "Nuevo Estado"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
       
      </div>

      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles del estado</h3>
          <p className="text-muted-foreground text-sm">
            Ingresa la información general del estado, incluyendo nombre, descripción y configuración de mantenimiento.
          </p>
        </div>
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
                <CardTitle>{id ? "Editar Estado" : "Nuevo Estado"}</CardTitle>
                <CardDescription>
                {id ? "Modifica los datos del estado" : "Complete los datos para crear un nuevo estado"}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del estado" {...field} />
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
                          <Textarea
                            placeholder="Descripción detallada del estado"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiresMaintenance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Requiere Mantenimiento
                          </FormLabel>
                          <FormDescription>
                            Indica si este estado requiere mantenimiento
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
                            Indica si el estado está activo
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
                      onClick={() => navigate("/states")}
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