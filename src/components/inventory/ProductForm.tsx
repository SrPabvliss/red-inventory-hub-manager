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
import { Barcode, Tags } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

interface BienFormValues {
  codigoBien: string;
  codigoAnterior: string;
  identificador: string;
  nroActaMatriz: string;
  bldBca: string;
  bien: string;
  serieIdentificacion: string;
  modeloCaracteristicas: string;
  marcaRazaOtros: string;
  color: string;
  material: string;
  dimensiones: string;
  custodioActual: string;
  itemRenglon: string;
  cuentaContable: string;
  fechaIngreso: Date;
  valorContable: number;
  ubicacion: string;
  oficinaLaboratorio: string;
}

// Mocks para los dropdowns
const mockColors = [
  { id: 1, name: "Rojo" },
  { id: 2, name: "Azul" },
  { id: 3, name: "Verde" },
  { id: 4, name: "Amarillo" },
];
const mockMaterials = [
  { id: 1, name: "Madera" },
  { id: 2, name: "Acero" },
  { id: 3, name: "Plástico" },
];
const mockLocations = [
  { id: 1, name: "Ubicación Central" },
  { id: 2, name: "Almacén Secundario" },
];
const mockCustodians = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "Ana López" },
];
const mockOffices = [
  { id: 1, name: "Oficina 101" },
  { id: 2, name: "Laboratorio A" },
];
const mockAccounts = [
  { id: 1, name: "1101 - Caja" },
  { id: 2, name: "1202 - Bancos" },
];
const mockItems = [
  { id: 1, name: "Renglón 1" },
  { id: 2, name: "Renglón 2" },
];

export function ProductForm() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const form = useForm<BienFormValues>({
    defaultValues: {
      codigoBien: "",
      codigoAnterior: "",
      identificador: "",
      nroActaMatriz: "",
      bldBca: "",
      bien: "",
      serieIdentificacion: "",
      modeloCaracteristicas: "",
      marcaRazaOtros: "",
      color: "",
      material: "",
      dimensiones: "",
      custodioActual: "",
      itemRenglon: "",
      cuentaContable: "",
      fechaIngreso: new Date(),
      valorContable: 0,
      ubicacion: "",
      oficinaLaboratorio: "",
    },
  });

  const handleScanBarcode = () => {
    setIsScanning(true);
    setTimeout(() => {
      form.setValue("codigoBien", `BIEN-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsScanning(false);
    }, 200);
  };

  const onSubmit = (data: BienFormValues) => {
    console.log("Bien registrado:", data);
    alert("Bien registrado correctamente");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <span className="text-muted-foreground font-medium">Operaciones</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Tags className="inline mr-1 h-4 w-4 text-primary align-middle" />
            <BreadcrumbLink href="/inventory">Inventario</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{"Nuevo Bien"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Sección 1: Identificación y códigos */}
          <Card>
            <CardHeader>
              <CardTitle>Identificación y Códigos</CardTitle>
              <CardDescription>Datos básicos para identificar el bien en el sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="codigoBien"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código del Bien</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Código único del bien"
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
                          {isScanning ? "Escaneando..." : "Generar"}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codigoAnterior"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Anterior</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Código anterior del bien" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="identificador"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identificador</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Identificador único" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nroActaMatriz"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nro de Acta/Matriz</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Número de acta o matriz" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bldBca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>(BLD) o (BCA)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BLD">BLD</SelectItem>
                          <SelectItem value="BCA">BCA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sección 2: Características del bien */}
          <Card>
            <CardHeader>
              <CardTitle>Características del Bien</CardTitle>
              <CardDescription>Información detallada sobre el bien.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="bien"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bien (nombre)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nombre del bien" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serieIdentificacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serie/Identificación</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Serie o identificación" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="modeloCaracteristicas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo/Características</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Modelo o características" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marcaRazaOtros"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca/Raza/Otros</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Marca, raza u otros" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockColors.map((color) => (
                            <SelectItem key={color.id} value={color.name}>{color.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockMaterials.map((material) => (
                            <SelectItem key={material.id} value={material.name}>{material.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensiones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensiones</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dimensiones del bien" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sección 3: Ubicación y responsable */}
          <Card>
            <CardHeader>
              <CardTitle>Ubicación y Responsable</CardTitle>
              <CardDescription>¿Dónde se encuentra el bien y quién es el responsable?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="custodioActual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custodio Actual</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nombre del custodio actual" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una ubicación" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockLocations.map((location) => (
                            <SelectItem key={location.id} value={location.name}>{location.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="oficinaLaboratorio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Oficina/Laboratorio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una oficina" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockOffices.map((office) => (
                            <SelectItem key={office.id} value={office.name}>{office.name}</SelectItem>
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

          {/* Sección 4: Información contable */}
          <Card>
            <CardHeader>
              <CardTitle>Información Contable</CardTitle>
              <CardDescription>Datos contables y administrativos del bien.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="itemRenglon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ítem/Renglón</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ítem o renglón" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuentaContable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuenta Contable</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Cuenta contable" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fechaIngreso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Ingreso</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                          onChange={e => field.onChange(new Date(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valorContable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Contable</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Valor contable" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sección 5: Acciones */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" className="px-8" onClick={() => navigate("/inventory")}>Cancelar</Button>
            <Button type="submit" className="px-8">Registrar Bien</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
