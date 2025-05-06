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
import { Boxes } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const itemTypeSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  active: z.boolean(),
});

type ItemTypeFormValues = z.infer<typeof itemTypeSchema>;

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

export default function ItemTypeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<ItemTypeFormValues>({
    resolver: zodResolver(itemTypeSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchItemType = async () => {
        try {
          // Simulamos la carga de un tipo de item existente
          const itemType = mockItemTypes.find(t => t.id === Number(id));
          if (itemType) {
            form.reset(itemType);
          }
        } catch (error) {
          console.error('Error fetching item type:', error);
        }
      };
      fetchItemType();
    }
  }, [id, form]);

  const onSubmit = async (data: ItemTypeFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/item-types");
    } catch (error) {
      console.error('Error saving item type:', error);
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
              <Boxes className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbLink href="/item-types">Tipos de Items</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Tipo de Item" : "Nuevo Tipo de Item"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      
      </div>
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles del tipo de item</h3>
          <p className="text-muted-foreground text-sm">
            Ingresa el código, nombre, descripción y estado del tipo de item.
          </p>
        </div>
        <div className="md:w-2/3">
          <Card className="w-full">
            <CardHeader >
            <CardTitle>{id ? "Editar Tipo de Item" : "Nuevo Tipo de Item"}</CardTitle>
            <CardDescription>
              {id ? "Modifica los datos del tipo de item" : "Complete los datos para crear un nuevo tipo de item"}
            </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <Input placeholder="Código del tipo de item" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del tipo de item" {...field} />
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
                            placeholder="Descripción del tipo de item"
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
                            Indica si el tipo de item está activo
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
                    <Button type="button" variant="outline" onClick={() => navigate("/item-types")}>Cancelar</Button>
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