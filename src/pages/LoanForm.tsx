import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Handshake, Search, Tags } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumb, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";

export default function LoanFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    rol: "",
    cedula: "",
    bien: "",
    motivo: "",
    evento: "",
    ubicacion: "",
    fechaDevolucion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    notas: "",
    acepta: false,
  });
  const [showBienResults, setShowBienResults] = useState(false);
  const [bienResults, setBienResults] = useState([
    { id: "1", nombre: "MacBook Pro 16''", barcode: "TEC-001" },
    { id: "2", nombre: "Monitor Dell UltraSharp 27''", barcode: "TEC-002" },
    { id: "3", nombre: "Arduino Starter Kit", barcode: "TEC-003" },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (date) setFormData((prev) => ({ ...prev, fechaDevolucion: date }));
  };

  const handleBienSearch = () => {
    setShowBienResults(true);
  };

  const handleBienSelect = (bien) => {
    setFormData((prev) => ({ ...prev, bien: bien.nombre }));
    setShowBienResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitud de préstamo enviada correctamente");
    navigate("/loans");
  };

  return (
    <div className="max-w-6xl mx-auto ">
        <Breadcrumb className="mb-6">
            <BreadcrumbList>
            <BreadcrumbItem>
                <span className="text-muted-foreground font-medium">Operaciones</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <Handshake className="inline mr-1 h-4 w-4 text-primary align-middle" />
                <BreadcrumbLink href="/loans">Préstamos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{"Nuevo Préstamo"}</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb> 
      <form onSubmit={handleSubmit}>
        <div className="space-y-10">
          {/* Sección Solicitante */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="pt-2">
              <h2 className="text-lg font-bold">Solicitante</h2>
              <p className="text-muted-foreground text-sm">Datos personales y de contacto del solicitante del préstamo.</p>
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Información del Solicitante</CardTitle>
                  <p className="text-muted-foreground">Complete los datos del solicitante.</p>
                </CardHeader>
                <CardContent>
                  <div className="w-full px-0">
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <div className="space-y-4 w-full">
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div>
                            <label className="block mb-1 font-medium" htmlFor="nombres">Nombres</label>
                            <Input id="nombres" name="nombres" value={formData.nombres} onChange={handleInputChange} required className="w-full" />
                          </div>
                          <div>
                            <label className="block mb-1 font-medium" htmlFor="apellidos">Apellidos</label>
                            <Input id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required className="w-full" />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1 font-medium" htmlFor="correo">Correo Electrónico</label>
                          <Input id="correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} required className="w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div>
                            <label className="block mb-1 font-medium" htmlFor="telefono">Número de Teléfono</label>
                            <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required className="w-full" />
                          </div>
                          <div>
                            <label className="block mb-1 font-medium" htmlFor="cedula">Cédula</label>
                            <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required className="w-full" />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1 font-medium" htmlFor="rol">Rol</label>
                          <Select value={formData.rol} onValueChange={(v) => handleSelectChange("rol", v)}>
                            <SelectTrigger id="rol" className="w-full">
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="estudiante">Estudiante</SelectItem>
                              <SelectItem value="docente">Docente</SelectItem>
                              <SelectItem value="administrativo">Administrativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sección Préstamo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="pt-2">
              <h2 className="text-lg font-bold">Préstamo</h2>
              <p className="text-muted-foreground text-sm">Información del bien, motivo y detalles del préstamo solicitado.</p>
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Información del Préstamo</CardTitle>
                  <p className="text-muted-foreground">Complete los datos del bien y el préstamo.</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-4 w-full">
                      <div className="flex gap-2 w-full">
                        <Input
                          placeholder="Buscar bien por nombre o código"
                          value={formData.bien}
                          name="bien"
                          onChange={handleInputChange}
                          className="w-full"
                        />
                        <Button type="button" variant="destructive" onClick={handleBienSearch}>
                          Buscar
                        </Button>
                      </div>
                      {showBienResults && (
                        <div className="bg-muted rounded p-2 mt-1">
                          {bienResults.map((b) => (
                            <div key={b.id} className="cursor-pointer hover:bg-accent px-2 py-1 rounded" onClick={() => handleBienSelect(b)}>
                              {b.nombre} <span className="text-xs text-muted-foreground">({b.barcode})</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div>
                        <label className="block mb-1 font-medium" htmlFor="motivo">Motivo del Préstamo</label>
                        <Textarea id="motivo" name="motivo" value={formData.motivo} onChange={handleInputChange} required className="w-full" />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium" htmlFor="evento">Evento Asociado (opcional)</label>
                        <Input id="evento" name="evento" value={formData.evento} onChange={handleInputChange} className="w-full" />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium" htmlFor="ubicacion">Ubicación de Uso (opcional)</label>
                        <Input id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} className="w-full" />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">Fecha de Devolución Programada</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.fechaDevolucion && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.fechaDevolucion ? format(formData.fechaDevolucion, "PPP") : <span>Seleccionar fecha</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.fechaDevolucion}
                              onSelect={handleDateChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="block mb-1 font-medium" htmlFor="notas">Notas Adicionales</label>
                        <Textarea id="notas" name="notas" value={formData.notas} onChange={handleInputChange} className="w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Checkbox y acciones */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Checkbox id="acepta" name="acepta" checked={formData.acepta} onCheckedChange={(v) => setFormData((prev) => ({ ...prev, acepta: !!v }))} />
              <label htmlFor="acepta" className="text-sm">
                Acepto la responsabilidad por cualquier daño o pérdida del bien solicitado
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate("/loans")}>Cancelar</Button>
              <Button type="submit" disabled={!formData.acepta} className="bg-primary text-white">Solicitar Préstamo</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 