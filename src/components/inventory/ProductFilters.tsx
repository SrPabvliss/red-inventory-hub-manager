
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCategory, ProductStatus, Department } from "@/types";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: ProductCategory | "";
    department: Department | "";
    status: ProductStatus | "";
  }) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "">("");
  const [department, setDepartment] = useState<Department | "">("");
  const [status, setStatus] = useState<ProductStatus | "">("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, category, department, status);
  };

  const handleCategoryChange = (value: ProductCategory | "") => {
    setCategory(value);
    applyFilters(search, value, department, status);
  };

  const handleDepartmentChange = (value: Department | "") => {
    setDepartment(value);
    applyFilters(search, category, value, status);
  };

  const handleStatusChange = (value: ProductStatus | "") => {
    setStatus(value);
    applyFilters(search, category, department, value);
  };

  const applyFilters = (
    search: string,
    category: ProductCategory | "",
    department: Department | "",
    status: ProductStatus | ""
  ) => {
    onFilterChange({ search, category, department, status });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setDepartment("");
    setStatus("");
    applyFilters("", "", "", "");
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
      <h3 className="font-medium mb-4">Filtros</h3>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar producto..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <Select
          value={category}
          onValueChange={(value) => handleCategoryChange(value as ProductCategory | "")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas las categorías</SelectItem>
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

        <Select
          value={department}
          onValueChange={(value) => handleDepartmentChange(value as Department | "")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos los departamentos</SelectItem>
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

        <Select
          value={status}
          onValueChange={(value) => handleStatusChange(value as ProductStatus | "")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos los estados</SelectItem>
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

      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="text-sm"
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
