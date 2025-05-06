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
import { Wrench } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const conditionSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  requiresMaintenance: z.boolean(),
});

type ConditionFormValues = z.infer<typeof conditionSchema>;

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

export default function ConditionForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<ConditionFormValues>({
    resolver: zodResolver(conditionSchema),
    defaultValues: {
      name: "",
      description: "",
      requiresMaintenance: false,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchCondition = async () => {
        try {
          // Simulamos la carga de una condición existente
          const condition = mockConditions.find(c => c.id === Number(id));
          if (condition) {
            form.reset(condition);
          }
        } catch (error) {
          console.error('Error fetching condition:', error);
        }
      };
      fetchCondition();
    }
  }, [id, form]);

  const onSubmit = async (data: ConditionFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/conditions");
    } catch (error) {
      console.error('Error saving condition:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="space-y-6 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"
    >
      {/* Breadcrumbs, título y descripción */}
      <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground font-medium">Configuración</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Wrench className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbLink href="/conditions">Condiciones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Condición" : "Nueva Condición"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
      </div>
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
        {/* Descripción a la izquierda */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles de la condición</h3>
          <p className="text-muted-foreground text-sm">
            Ingresa el nombre, descripción y si requiere mantenimiento para la condición.
          </p>
        </div>
        {/* Formulario a la derecha */}
        <div className="md:w-2/3">
          <Card className="w-full">
            <CardHeader className="">
              <CardTitle>{id ? "Editar Condición" : "Nueva Condición"}</CardTitle>
              <CardDescription>
                {id
                  ? "Modifica los datos de la condición"
                  : "Complete los datos para crear una nueva condición"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de la condición" {...field} />
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
                            placeholder="Descripción de la condición"
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
                            Indica si los ítems con esta condición requieren mantenimiento
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

                  <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => navigate("/conditions")}>Cancelar</Button>
                    <Button type="submit" disabled={loading}>Guardar</Button>
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