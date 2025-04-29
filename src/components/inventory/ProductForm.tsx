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
import { Barcode } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

export function ProductForm() {
  const [isScanning, setIsScanning] = useState(false);

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
    }, 2000);
  };

  const onSubmit = (data: BienFormValues) => {
    console.log("Bien registrado:", data);
    alert("Bien registrado correctamente");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Registro de Bien</CardTitle>
          <CardDescription>
            Complete todos los campos para registrar el bien en el inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna 1 - Información básica */}
                <div className="space-y-4">
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

                {/* Columna 2 - Características del bien */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bien"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bien</FormLabel>
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
                          <Input {...field} placeholder="Número de serie o identificación" />
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
                          <Textarea
                            rows={3}
                            placeholder="Modelo y características del bien"
                            {...field}
                          />
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
                          <Input {...field} placeholder="Marca, raza u otras características" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Columna 3 - Detalles físicos */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Color del bien" />
                        </FormControl>
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
                        <FormControl>
                          <Input {...field} placeholder="Material principal" />
                        </FormControl>
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
                          <Input {...field} placeholder="Ej: 120x80x40 cm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fechaIngreso"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de Ingreso</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Seleccione una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Sección de Custodio y Contabilidad */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-bold mb-6">Información Adicional</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="custodioActual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custodio Actual</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nombre del custodio" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="itemRenglon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item/Renglón</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Número de ítem o renglón" />
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
                          <Input {...field} placeholder="Código de cuenta contable" />
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
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            placeholder="Valor contable del bien"
                          />
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
                        <FormControl>
                          <Input {...field} placeholder="Ubicación física del bien" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="oficinaLaboratorio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Oficina o Laboratorio</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Oficina o laboratorio asignado" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="px-6">
                  Registrar Bien
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}