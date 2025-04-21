
// Definición de tipos para el sistema de inventario

// Tipos de usuario
export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  ADMIN = "admin",
}

// Categorías de productos
export enum ProductCategory {
  TECHNOLOGY = "technology",
  FURNITURE = "furniture",
  ELECTRONICS = "electronics",
  TOOLS = "tools",
  MATERIALS = "materials",
  OTHER = "other",
}

// Departamentos
export enum Department {
  COMPUTING = "computing",
  ELECTRONICS = "electronics",
  DESIGN = "design",
  MECHANICS = "mechanics",
  GENERAL = "general",
}

// Estado del producto
export enum ProductStatus {
  AVAILABLE = "available",
  IN_USE = "in_use",
  MAINTENANCE = "maintenance",
  DAMAGED = "damaged",
}

// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: Department;
  studentId?: string;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  category: ProductCategory;
  department: Department;
  quantity: number;
  status: ProductStatus;
  description: string;
  imageUrl?: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Loan {
  id: string;
  productId: string;
  product?: Product;
  userId: string;
  user?: User;
  startDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue";
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  loanId?: string;
  message: string;
  read: boolean;
  type: "reminder" | "overdue" | "system";
  createdAt: Date;
}
