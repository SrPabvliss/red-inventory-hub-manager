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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tags } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const categorySchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  parentCategoryId: z.number().nullable(),
  standardUsefulLife: z.number().min(0, "La vida útil debe ser mayor o igual a 0"),
  depreciationPercentage: z.string().regex(/^\d+(\.\d{1,2})?$/, "El porcentaje debe tener máximo 2 decimales"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

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

export default function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      parentCategoryId: null,
      standardUsefulLife: 0,
      depreciationPercentage: "0.00",
    },
  });

  useEffect(() => {
    // Simulamos la carga de datos
    const fetchCategories = async () => {
      try {
        // Simulamos un delay de red
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    if (id) {
      const fetchCategory = async () => {
        try {
          // Simulamos la carga de una categoría existente
          const category = mockCategories.find(c => c.id === Number(id));
          if (category) {
            form.reset(category);
          }
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      };
      fetchCategory();
    }
  }, [id, form]);

  const onSubmit = async (data: CategoryFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/categories");
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="space-y-6  w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"
    >
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <span className="text-muted-foreground font-medium">Configuración</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Tags className="inline mr-1 h-4 w-4 text-primary align-middle" />
            <BreadcrumbLink href="/categories">Categorías</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{id ? "Editar Categoría" : "Nueva Categoría"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Bloque Detalles */}
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles</h3>
          <p className="text-muted-foreground text-sm">
            Información general de la categoría, como nombre, código, descripción y jerarquía.
          </p>
        </div>
        <div className="md:w-2/3">
          <Card className=" mx-auto">
            <CardHeader className="px-4 md:px-8">
              <CardTitle>{id ? "Editar Categoría" : "Nueva Categoría"}</CardTitle>
              <CardDescription>
                {id
                  ? "Modifica los datos de la categoría"
                  : "Complete los datos para crear una nueva categoría"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-8 pb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: CAT001" {...field} />
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
                          <Input placeholder="Nombre de la categoría" {...field} />
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
                          <Textarea placeholder="Descripción de la categoría" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentCategoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría Padre</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value === "none" ? null : Number(value))}
                            value={field.value === null ? "none" : String(field.value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una categoría padre" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Ninguna</SelectItem>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Bloque Depreciación */}
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Depreciación</h3>
          <p className="text-muted-foreground text-sm">
            Datos relacionados a la vida útil y el porcentaje de depreciación de la categoría.
          </p>
        </div>
        <div className="md:w-2/3">
          <Card className=" mx-auto">
            <CardHeader className="px-4 md:px-8">
              <CardTitle>Depreciación</CardTitle>
              <CardDescription>
                Complete los datos de vida útil y depreciación para la categoría.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-8 pb-6">
              <Form {...form}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="standardUsefulLife"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vida Útil (años)</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="depreciationPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Depreciación (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min={0} max={100} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Botones de acción al final */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={() => navigate("/categories")}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </div>
  );
} 