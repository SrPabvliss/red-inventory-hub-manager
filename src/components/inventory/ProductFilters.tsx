
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

  const handleCategoryChange = (value: string) => {
    const categoryValue = value === "all_categories" ? "" : value as ProductCategory;
    setCategory(categoryValue);
    applyFilters(search, categoryValue, department, status);
  };

  const handleDepartmentChange = (value: string) => {
    const departmentValue = value === "all_departments" ? "" : value as Department;
    setDepartment(departmentValue);
    applyFilters(search, category, departmentValue, status);
  };

  const handleStatusChange = (value: string) => {
    const statusValue = value === "all_statuses" ? "" : value as ProductStatus;
    setStatus(statusValue);
    applyFilters(search, category, department, statusValue);
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
    <>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
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
          value={category || "all_categories"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_categories">Todas las categorías</SelectItem>
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
          value={department || "all_departments"}
          onValueChange={handleDepartmentChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_departments">Todos los departamentos</SelectItem>
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
          value={status || "all_statuses"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_statuses">Todos los estados</SelectItem>
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

      </>
  );
}
