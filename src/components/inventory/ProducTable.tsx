import { Product, ProductCategory, Department, ProductStatus } from "@/types";
import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductTableProps {
  products: Product[];
  onLoanClick: (product: Product) => void;
  onViewClick: (product: Product) => void;
}

// Utilidades de traducción
const translateCategory = (category: ProductCategory) => {
  switch (category) {
    case ProductCategory.TECHNOLOGY: return "Tecnología";
    case ProductCategory.ELECTRONICS: return "Electrónica";
    case ProductCategory.TOOLS: return "Herramientas";
    default: return category;
  }
  
};

const translateDepartment = (department: Department) => {
  switch (department) {
    case Department.COMPUTING: return "Computación";
    case Department.ELECTRONICS: return "Electrónica";
    default: return department;
  }
};

const translateStatus = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.AVAILABLE: return "Disponible";
    case ProductStatus.IN_USE: return "En uso";
    case ProductStatus.MAINTENANCE: return "En mantenimiento";
    default: return status;
  }
};

// Clases de colores para los estados
const statusColor = (status: ProductStatus) => {
  return clsx(
    "inline-block px-2 py-1 rounded-full text-xs font-medium",
    {
      [ProductStatus.AVAILABLE]: "bg-green-100 text-green-700",
      [ProductStatus.IN_USE]: "bg-yellow-100 text-yellow-700",
      [ProductStatus.MAINTENANCE]: "bg-red-100 text-red-700"
    }[status]
  );
};

export function ProductTable({ products, onLoanClick, onViewClick }: ProductTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="hover:bg-muted">
            <TableCell className="py-6">{product.barcode}</TableCell>
            <TableCell className="py-2">{product.name}</TableCell>
            <TableCell className="py-2">{translateCategory(product.category)}</TableCell>
            <TableCell className="py-2">{translateDepartment(product.department)}</TableCell>
            <TableCell className="py-2">{product.quantity}</TableCell>
            <TableCell className="py-2">
              <span className={statusColor(product.status)}>
                {translateStatus(product.status)}
              </span>
            </TableCell>
            <TableCell className="text-right space-x-2">
              {/* <button
                onClick={() => onViewClick(product)}
                className="text-blue-600 hover:underline mr-2"
                title="Ver"
              >
                Ver
              </button>
              <button
                onClick={() => onLoanClick(product)}
                className="text-green-600 hover:underline mr-2"
                title="Prestar"
              >
                Prestar
              </button> */}
              <button
                onClick={() => onViewClick(product)}
                className="inline-flex items-center justify-center rounded hover:bg-muted p-1 mr-1"
                title="Editar"
              >
                <Pencil className="h-4 w-4 " />
              </button>
              <button
                onClick={() => onLoanClick(product)}
                className="inline-flex items-center justify-center rounded hover:bg-muted p-1"
                title="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
