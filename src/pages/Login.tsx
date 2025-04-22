
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una aplicación real, aquí haríamos la autenticación real
    // Por ahora simplemente simularemos un inicio de sesión exitoso
    localStorage.setItem("userRole", role);
    navigate("/inventory");
  };

  // Para demo solamente: cambiar rol para probar diferentes vistas
  const handleRoleChange = () => {
    if (role === UserRole.ADMIN) {
      setRole(UserRole.TEACHER);
    } else if (role === UserRole.TEACHER) {
      setRole(UserRole.STUDENT);
    } else {
      setRole(UserRole.ADMIN);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="absolute top-10 left-10">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">GITT</span>
          </div>
          <h1 className="text-2xl font-bold">Gestión de Inventario Talleres Tecnológicos</h1>
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Sistema de gestión de inventario para talleres tecnológicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email o ID de usuario</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@universidad.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>

          {/* Este botón solo es para simular diferentes tipos de usuario en el prototipo */}
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground mb-2">
              Demo: Modo de usuario actual - {" "}
              <span className="font-semibold">
                {role === UserRole.ADMIN 
                  ? "Administrador" 
                  : role === UserRole.TEACHER 
                  ? "Docente" 
                  : "Estudiante"}
              </span>
            </p>
            <Button variant="outline" size="sm" onClick={handleRoleChange}>
              Cambiar modo de usuario
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center w-full">
            <a href="#" className="hover:underline">
              ¿Olvidó su contraseña?
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
