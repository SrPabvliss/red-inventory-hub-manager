import { Product } from "@/types";
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

export function ProductTable({ products, onLoanClick, onViewClick }: ProductTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.barcode}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.department}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === 'available' ? 'bg-green-100 text-green-800' :
                  product.status === 'in_use' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell className="space-x-2">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
