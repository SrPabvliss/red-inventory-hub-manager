
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserRole } from "@/types";
import { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {
  // En un sistema real, este rol se obtendría de la autenticación
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // Datos simulados para el dashboard
  const loansByDepartment = [
    { name: "Computación", value: 28 },
    { name: "Electrónica", value: 22 },
    { name: "Diseño", value: 15 },
    { name: "Mecánica", value: 12 },
    { name: "General", value: 8 },
  ];

  const productsByCategory = [
    { name: "Tecnología", cantidad: 85 },
    { name: "Electrónica", cantidad: 67 },
    { name: "Herramientas", cantidad: 45 },
    { name: "Materiales", cantidad: 30 },
    { name: "Muebles", cantidad: 18 },
    { name: "Otros", cantidad: 12 },
  ];

  const productStatus = [
    { name: "Disponible", value: 156 },
    { name: "En Uso", value: 84 },
    { name: "Mantenimiento", value: 12 },
    { name: "Dañado", value: 5 },
  ];

  const recentLoans = [
    {
      id: "L001",
      product: "MacBook Pro 16''",
      user: "Carlos Méndez",
      startDate: "12/04/2023",
      dueDate: "19/04/2023",
      status: "active"
    },
    {
      id: "L002",
      product: "Cámara DSLR Canon",
      user: "María Rodríguez",
      startDate: "10/04/2023",
      dueDate: "17/04/2023",
      status: "returned"
    },
    {
      id: "L003",
      product: "Arduino Kit",
      user: "Juan Pérez",
      startDate: "08/04/2023",
      dueDate: "15/04/2023",
      status: "overdue"
    },
    {
      id: "L004",
      product: "Monitor 4K Dell",
      user: "Ana López",
      startDate: "12/04/2023",
      dueDate: "26/04/2023",
      status: "active"
    },
  ];

  const COLORS = ['#ea384c', '#4299e1', '#f6ad55', '#a0aec0', '#68d391'];
  const STATUS_COLORS = ['#68d391', '#4299e1', '#f6ad55', '#ea384c'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600";
      case "returned": return "text-blue-600";
      case "overdue": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activo";
      case "returned": return "Devuelto";
      case "overdue": return "Vencido";
      default: return status;
    }
  };

  return (
    <MainLayout title="Panel Principal" userRole={userRole}>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Productos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">257</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12 en el último mes
              </p>
              <Progress className="mt-2" value={80} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Préstamos Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84</div>
              <p className="text-xs text-muted-foreground mt-1">
                32% del inventario
              </p>
              <Progress className="mt-2" value={32} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Préstamos Retrasados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">7</div>
              <p className="text-xs text-muted-foreground mt-1">
                8% de préstamos activos
              </p>
              <Progress className="mt-2" value={8} color="bg-destructive" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Productos Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1">
                60% del inventario
              </p>
              <Progress className="mt-2" value={60} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Préstamos por Departamento</CardTitle>
              <CardDescription>
                Distribución actual de préstamos
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loansByDepartment}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {loansByDepartment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value} préstamos`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Productos por Categoría</CardTitle>
              <CardDescription>
                Inventario total por tipo
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productsByCategory}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} unidades`, ""]} />
                    <Bar dataKey="cantidad" fill="#ea384c" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
              <CardTitle>Estado del Inventario</CardTitle>
              <CardDescription>
                Distribución por estado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productStatus}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {productStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} unidades`, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Préstamos Recientes</CardTitle>
              <CardDescription>
                Últimos préstamos registrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left font-medium">ID</th>
                      <th className="py-3 text-left font-medium">Producto</th>
                      <th className="py-3 text-left font-medium">Usuario</th>
                      <th className="py-3 text-left font-medium">Fecha Inicio</th>
                      <th className="py-3 text-left font-medium">Fecha Devolución</th>
                      <th className="py-3 text-left font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLoans.map((loan) => (
                      <tr key={loan.id} className="border-b last:border-b-0">
                        <td className="py-3">{loan.id}</td>
                        <td className="py-3">{loan.product}</td>
                        <td className="py-3">{loan.user}</td>
                        <td className="py-3">{loan.startDate}</td>
                        <td className="py-3">{loan.dueDate}</td>
                        <td className={`py-3 ${getStatusColor(loan.status)}`}>
                          {getStatusText(loan.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
