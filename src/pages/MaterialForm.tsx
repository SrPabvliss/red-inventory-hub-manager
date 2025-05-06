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
import { Package } from "lucide-react";

const materialSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  materialType: z.string().min(1, "El tipo de material es requerido"),
  active: z.boolean(),
});

type MaterialFormValues = z.infer<typeof materialSchema>;

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

// Tipos de materiales predefinidos
const materialTypes = [
  { value: "Natural", label: "Natural" },
  { value: "Sintético", label: "Sintético" },
  { value: "Compuesto", label: "Compuesto" },
  { value: "Reciclado", label: "Reciclado" }
];

export default function MaterialForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: "",
      description: "",
      materialType: "",
      active: true,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchMaterial = async () => {
        try {
          // Simulamos la carga de un material existente
          const material = mockMaterials.find(m => m.id === Number(id));
          if (material) {
            form.reset(material);
          }
        } catch (error) {
          console.error('Error fetching material:', error);
        }
      };
      fetchMaterial();
    }
  }, [id, form]);

  const onSubmit = async (data: MaterialFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/materials");
    } catch (error) {
      console.error('Error saving material:', error);
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
              <Package className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbLink href="/materials">Materiales</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Material" : "Nuevo Material"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
       
      </div>

      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles del material</h3>
          <p className="text-muted-foreground text-sm">
            Ingresa la información general del material, incluyendo nombre, tipo, descripción y estado.
          </p>
        </div>
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>{id ? "Editar Material" : "Nuevo Material"}</CardTitle>
              <CardDescription>
                {id ? "Modifica los datos del material" : "Complete los datos para crear un nuevo material"}
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
                            <Input placeholder="Nombre del material" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="materialType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Material</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione un tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {materialTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
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
                            placeholder="Descripción detallada del material"
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
                            Indica si el material está activo
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
                      onClick={() => navigate("/materials")}
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