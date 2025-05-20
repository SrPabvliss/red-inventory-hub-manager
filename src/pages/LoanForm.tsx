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
import { CalendarIcon, Handshake, Search, Tags, Clock, AlertCircle } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    fechaPrestamo: new Date(),
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

  // Lista de estudiantes morosos/inconvenientes
  const [listaNegra, setListaNegra] = useState([
    {
      id: "1",
      nombres: "Juan Pérez",
      apellidos: "Gómez",
      cedula: "123456789",
      correo: "juan.perez@example.com",
      telefono: "3001234567",
      rol: "estudiante",
      motivo: "Devolución tardía en 3 ocasiones",
      fechaIncidente: "2023-10-15",
      sancion: "Sin préstamos por 3 meses"
    },
    {
      id: "2",
      nombres: "María López",
      apellidos: "Rodríguez",
      cedula: "987654321",
      correo: "maria.lopez@example.com",
      telefono: "3109876543",
      rol: "estudiante",
      motivo: "Daño a equipo prestado",
      fechaIncidente: "2023-11-20",
      sancion: "Sin préstamos por 6 meses"
    },
    {
      id: "3",
      nombres: "Carlos Sánchez",
      apellidos: "Martínez",
      cedula: "456123789",
      correo: "carlos.sanchez@example.com",
      telefono: "3204567890",
      rol: "docente",
      motivo: "No devolvió material",
      fechaIncidente: "2023-12-05",
      sancion: "Sin préstamos por 1 año"
    }
  ]);

  // Estado para el buscador de la lista negra
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar lista negra según el término de búsqueda
  const filteredListaNegra = listaNegra.filter(persona => 
    persona.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.cedula.includes(searchTerm)
  );

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

  const handleDateChange = (date, field) => {
    if (date) {
      const existingDate = formData[field];
      const newDate = new Date(date);
      
      if (existingDate) {
        newDate.setHours(existingDate.getHours());
        newDate.setMinutes(existingDate.getMinutes());
      }
      
      setFormData((prev) => ({ ...prev, [field]: newDate }));
    }
  };

  const handleTimeChange = (time, field) => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(formData[field]);
    newDate.setHours(hours, minutes);
    setFormData((prev) => ({ ...prev, [field]: newDate }));
  };

  const handleBienSearch = () => {
    setShowBienResults(true);
  };

  const handleBienSelect = (bien) => {
    setFormData((prev) => ({ ...prev, bien: bien.nombre }));
    setShowBienResults(false);
  };

  const handleSelectFromList = (estudiante) => {
    setFormData({
      ...formData,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      cedula: estudiante.cedula,
      correo: estudiante.correo,
      telefono: estudiante.telefono,
      rol: estudiante.rol
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitud de préstamo enviada correctamente");
    navigate("/loans");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb>
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Lista Negra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Lista Negra de Estudiantes</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Personas con historial de morosidad o problemas con devoluciones
              </p>
            </DialogHeader>
            
            {/* Buscador para la lista negra */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, apellido o cédula..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              {filteredListaNegra.length > 0 ? (
                filteredListaNegra.map((estudiante) => (
                  <Card key={estudiante.id} className="border-red-200 bg-red-50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {estudiante.nombres} {estudiante.apellidos}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Cédula: {estudiante.cedula} | {estudiante.rol}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-sm">Motivo:</p>
                          <p className="text-red-600">{estudiante.motivo}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Sanción:</p>
                          <p>{estudiante.sancion}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Fecha incidente:</p>
                          <p>{estudiante.fechaIncidente}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Contacto:</p>
                          <p>{estudiante.correo} | {estudiante.telefono}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No se encontraron resultados</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                      
                      {/* Nuevo campo: Fecha de Préstamo con hora */}
                      <div>
                        <label className="block mb-1 font-medium">Fecha y Hora de Préstamo</label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !formData.fechaPrestamo && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.fechaPrestamo ? format(formData.fechaPrestamo, "PPP") : <span>Seleccionar fecha</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={formData.fechaPrestamo}
                                onSelect={(date) => handleDateChange(date, "fechaPrestamo")}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Input
                            type="time"
                            value={format(formData.fechaPrestamo, "HH:mm")}
                            onChange={(e) => handleTimeChange(e.target.value, "fechaPrestamo")}
                            className="w-32"
                          />
                        </div>
                      </div>
                      
                      {/* Campo existente: Fecha de Devolución con hora */}
                      <div>
                        <label className="block mb-1 font-medium">Fecha y Hora de Devolución Programada</label>
                        <div className="flex gap-2">
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
                                onSelect={(date) => handleDateChange(date, "fechaDevolucion")}
                                disabled={(date) => date < formData.fechaPrestamo}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Input
                            type="time"
                            value={format(formData.fechaDevolucion, "HH:mm")}
                            onChange={(e) => handleTimeChange(e.target.value, "fechaDevolucion")}
                            className="w-32"
                          />
                        </div>
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