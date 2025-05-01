import { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  onLoanClick: (product: Product) => void;
  onViewClick: (product: Product) => void;
}

export function ProductTable({ products, onLoanClick, onViewClick }: ProductTableProps) {
  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Código</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Categoría</th>
            <th className="p-2 text-left">Departamento</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.barcode}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.department}</td>
              <td className="p-2">{product.quantity}</td>
              <td className="p-2">{product.status}</td>
              <td className="p-2 space-x-2">
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
