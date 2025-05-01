import { Product, ProductCategory, Department, ProductStatus } from "@/types";
import clsx from "clsx";

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
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Código</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Categoría</th>
            <th className="p-3 text-left">Departamento</th>
            <th className="p-3 text-left">Cantidad</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{product.barcode}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{translateCategory(product.category)}</td>
              <td className="p-3">{translateDepartment(product.department)}</td>
              <td className="p-3">{product.quantity}</td>
              <td className="p-3">
                <span className={statusColor(product.status)}>
                  {translateStatus(product.status)}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => onViewClick(product)}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </button>
                <button
                  onClick={() => onLoanClick(product)}
                  className="text-green-600 hover:underline"
                >
                  Prestar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
