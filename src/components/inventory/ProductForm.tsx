
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Department, ProductCategory, ProductStatus } from "@/types";
import { Barcode, Upload } from "lucide-react";

interface ProductFormValues {
  barcode: string;
  name: string;
  category: ProductCategory;
  department: Department;
  quantity: number;
  status: ProductStatus;
  cost: number;
  description: string;
}

export function ProductForm() {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      barcode: "",
      name: "",
      category: ProductCategory.TECHNOLOGY,
      department: Department.COMPUTING,
      quantity: 1,
      status: ProductStatus.AVAILABLE,
      cost: 0,
      description: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanBarcode = () => {
    setIsScanning(true);
    // En un sistema real, aquí se activaría el lector de código de barras
    // Simulamos la lectura después de un breve retraso
    setTimeout(() => {
      form.setValue("barcode", `INV-${Math.floor(1000000 + Math.random() * 9000000)}`);
      setIsScanning(false);
    }, 2000);
  };

  const onSubmit = (data: ProductFormValues) => {
    console.log("Producto registrado:", data);
    alert("Producto registrado correctamente");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Registrar Nuevo Producto</CardTitle>
          <CardDescription>
            Complete los datos del producto para registrarlo en el inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="barcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código de Barras</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Escanear o ingresar código de barras"
                                className="flex-grow"
                              />
                            </FormControl>
                            <Button
                              type="button"
                              onClick={handleScanBarcode}
                              disabled={isScanning}
                              className="flex items-center gap-2"
                              variant="secondary"
                            >
                              <Barcode size={16} />
                              {isScanning ? "Escaneando..." : "Escanear"}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Producto</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ingrese el nombre del producto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(ProductCategory).map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat === ProductCategory.TECHNOLOGY
                                    ? "Tecnología"
                                    : cat === ProductCategory.FURNITURE
                                    ? "Muebles"
                                    : cat === ProductCategory.ELECTRONICS
                                    ? "Electrónica"
                                    : cat === ProductCategory.TOOLS
                                    ? "Herramientas"
                                    : cat === ProductCategory.MATERIALS
                                    ? "Materiales"
                                    : "Otros"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departamento</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(Department).map((dep) => (
                                <SelectItem key={dep} value={dep}>
                                  {dep === Department.COMPUTING
                                    ? "Computación"
                                    : dep === Department.ELECTRONICS
                                    ? "Electrónica"
                                    : dep === Department.DESIGN
                                    ? "Diseño"
                                    : dep === Department.MECHANICS
                                    ? "Mecánica"
                                    : "General"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(ProductStatus).map((stat) => (
                                <SelectItem key={stat} value={stat}>
                                  {stat === ProductStatus.AVAILABLE
                                    ? "Disponible"
                                    : stat === ProductStatus.IN_USE
                                    ? "En uso"
                                    : stat === ProductStatus.MAINTENANCE
                                    ? "En mantenimiento"
                                    : "Dañado"}
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
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Costo (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción técnica</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Ingrese las características técnicas del producto"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Imagen del producto</FormLabel>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer transition">
                      <input
                        type="file"
                        accept="image/*"
                        id="productImage"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="productImage" className="cursor-pointer block">
                        {image ? (
                          <div className="aspect-video mx-auto flex items-center justify-center overflow-hidden">
                            <img
                              src={image}
                              alt="Vista previa"
                              className="max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center py-4">
                            <Upload size={40} className="text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">Haga clic para subir una imagen</p>
                            <p className="text-xs text-muted-foreground">O arrastre y suelte</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="reset" onClick={() => form.reset()}>
                  Cancelar
                </Button>
                <Button type="submit">Registrar Producto</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
