import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  PackageSearch, 
  Barcode, 
  Users, 
  Bell, 
  LogOut,
  Menu,
  Handshake
} from "lucide-react";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole?: UserRole;
}

export function Sidebar({ userRole = UserRole.ADMIN }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    {
      title: "Inventario",
      href: "/inventory",
      icon: PackageSearch,
      roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
    },
    {
      title: "Registrar Producto",
      href: "/products/new",
      icon: Barcode,
      roles: [UserRole.ADMIN],
    },
    {
      title: "Préstamos",
      href: "/loans",
      icon: Users,
      roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
    },
    {
      title: "Registrar Préstamo",
      href: "/loans/new",
      icon: Handshake,
      roles: [UserRole.ADMIN],
    }
  ];

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside className={cn(
      "bg-sidebar h-screen flex flex-col border-r transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        <div className={cn(
          "flex items-center gap-2 transition-all",
          collapsed && "hidden"
        )}>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">GITT</span>
          </div>
          {/* <h2 className="font-bold text-lg">Gestión de Inventario Talleres Tecnológicos</h2> */}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="ml-auto text-muted-foreground"
        >
          <Menu size={20} />
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {sidebarItems
            .filter(item => item.roles.includes(userRole))
            .map((item) => (
              <li key={item.href}>
                <NavLink 
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors",
                    isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>

      <div className="border-t p-4">
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center gap-2 w-full",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Cerrar Sesión</span>}
        </Button>
      </div>
    </aside>
  );
}
