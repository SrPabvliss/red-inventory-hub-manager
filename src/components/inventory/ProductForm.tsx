
import { useState } from "react";
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

export function ProductForm() {
  const [image, setImage] = useState<string | null>(null);
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

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
      setBarcode(`INV-${Math.floor(1000000 + Math.random() * 9000000)}`);
      setIsScanning(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el producto
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="barcode">Código de Barras</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      id="barcode"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="Escanear o ingresar código de barras"
                      required
                      className="flex-grow"
                    />
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
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="name">Nombre del Producto</FormLabel>
                  <Input
                    id="name"
                    placeholder="Ingrese el nombre del producto"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="category">Categoría</FormLabel>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
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
                  </div>

                  <div className="space-y-2">
                    <FormLabel htmlFor="department">Departamento</FormLabel>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
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
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="quantity">Cantidad</FormLabel>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      defaultValue="1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <FormLabel htmlFor="status">Estado</FormLabel>
                    <Select defaultValue={ProductStatus.AVAILABLE}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
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
                  </div>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="cost">Costo (USD)</FormLabel>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="description">Descripción técnica</FormLabel>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Ingrese las características técnicas del producto"
                  />
                </div>

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
              <Button variant="outline" type="reset">
                Cancelar
              </Button>
              <Button type="submit">Registrar Producto</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
