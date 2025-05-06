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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Palette } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const colorSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Debe ser un código de color HEX válido"),
  description: z.string().min(1, "La descripción es requerida"),
});

type ColorFormValues = z.infer<typeof colorSchema>;

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

export default function ColorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      hexCode: "#000000",
      description: "",
    },
  });

  useEffect(() => {
    if (id) {
      const fetchColor = async () => {
        try {
          // Simulamos la carga de un color existente
          const color = mockColors.find(c => c.id === Number(id));
          if (color) {
            form.reset(color);
          }
        } catch (error) {
          console.error('Error fetching color:', error);
        }
      };
      fetchColor();
    }
  }, [id, form]);

  const onSubmit = async (data: ColorFormValues) => {
    setLoading(true);
    try {
      // Simulamos el envío al backend
      console.log('Datos a guardar:', data);
      navigate("/colors");
    } catch (error) {
      console.error('Error saving color:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="space-y-6 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto"
    >
      {/* Breadcrumbs */}
      <div className="mb-2 w-[1200px] min-w-[1200px] max-w-[1200px] mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground font-medium">Configuración</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Palette className="inline mr-1 h-4 w-4 text-primary align-middle" />
              <BreadcrumbLink href="/colors">Colores</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id ? "Editar Color" : "Nuevo Color"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
       
      </div>
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 w-full">
        {/* Descripción a la izquierda */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-1">Detalles del color</h3>
          <p className="text-muted-foreground text-sm">
            Ingresa el nombre, código HEX y una breve descripción para el color.
          </p>
        </div>
        {/* Formulario a la derecha */}
        <div className="md:w-2/3">
          <Card className="w-full">
            <CardHeader className="px-4 md:px-8">
              <CardTitle>{id ? "Editar Color" : "Nuevo Color"}</CardTitle>
              <CardDescription>
                {id ? "Modifica los datos del color" : "Complete los datos para crear un nuevo color"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-8 pb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hexCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código HEX</FormLabel>
                        <div className="flex gap-4 items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-[220px] justify-start text-left font-normal"
                              >
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-6 h-6 rounded-full border" 
                                    style={{ backgroundColor: field.value }}
                                  />
                                  <span>{field.value}</span>
                                </div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-3">
                              <HexColorPicker
                                color={field.value}
                                onChange={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                          <div 
                            className="w-12 h-12 rounded-full border" 
                            style={{ backgroundColor: field.value }}
                          />
                        </div>
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
                            placeholder="Descripción del color"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => navigate("/colors")}>Cancelar</Button>
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