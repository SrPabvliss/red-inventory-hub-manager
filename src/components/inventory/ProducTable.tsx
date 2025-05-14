import { Product, ProductCategory, Department, ProductStatus } from "@/types";
import clsx from "clsx";
import { Pencil, Trash2, Barcode } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductTableProps {
  products: Product[];
  onLoanClick: (product: Product) => void;
  onViewClick: (product: Product) => void;
}

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
  const [isScanning, setIsScanning] = useState(false);

  const handleScanComplete = (barcode: string) => {
    console.log("Código de barras escaneado:", barcode);
    setIsScanning(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-2 whitespace-nowrap">
              <Barcode className="h-4 w-4 mr-2" />
              Escanear código de barras
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Escanear código de barras</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <p>Área de escaneo de código de barras</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Coloca el código de barras frente a la cámara
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => handleScanComplete("1234567890")}
                >
                  Simular escaneo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Código</TableHead>
                <TableHead className="whitespace-nowrap">Nombre</TableHead>
                <TableHead className="whitespace-nowrap">Categoría</TableHead>
                <TableHead className="whitespace-nowrap">Departamento</TableHead>
                <TableHead className="whitespace-nowrap">Cantidad</TableHead>
                <TableHead className="whitespace-nowrap">Estado</TableHead>
                <TableHead className="text-right whitespace-nowrap">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted">
                  <TableCell className="py-4 whitespace-nowrap">{product.barcode}</TableCell>
                  <TableCell className="py-4 whitespace-nowrap">{product.name}</TableCell>
                  <TableCell className="py-4 whitespace-nowrap">{translateCategory(product.category)}</TableCell>
                  <TableCell className="py-4 whitespace-nowrap">{translateDepartment(product.department)}</TableCell>
                  <TableCell className="py-4 whitespace-nowrap">{product.quantity}</TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <span className={statusColor(product.status)}>
                      {translateStatus(product.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => onViewClick(product)}
                      className="inline-flex items-center justify-center rounded hover:bg-muted p-1 mr-1"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
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
        </div>
      </div>
    </div>
  );
}