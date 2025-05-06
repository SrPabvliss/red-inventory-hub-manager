import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  PackageSearch, 
  Barcode, 
  Users, 
  Bell, 
  LogOut,
  Menu,
  Handshake,
  ChevronDown,
  List,
  PlusCircle,
  UserCog,
  Tags,
  Palette,
  ShieldCheck,
  Boxes,
  MapPin,
  Warehouse,
  Package,
  CircleDot
} from "lucide-react";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole?: UserRole;
}

export function Sidebar({ userRole = UserRole.ADMIN }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarCategories = [
    {
      title: "Operaciones",
      items: [
        {
          title: "Inventario",
          icon: PackageSearch,
          roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
          defaultRoute: "/inventory",
          subItems: [
            {
              title: "Listar",
              href: "/inventory",
              icon: List,
            },
            {
              title: "Nuevo Bien",
              href: "/products/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Préstamos",
          icon: Handshake,
          roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
          defaultRoute: "/loans",
          subItems: [
            {
              title: "Listar",
              href: "/loans",
              icon: List,
            },
            {
              title: "Nuevo Préstamo",
              href: "/loans/new",
              icon: PlusCircle,
            }
          ]
        }
      ]
    },
    {
      title: "Administración",
      items: [
        {
          title: "Usuarios",
          icon: UserCog,
          roles: [UserRole.ADMIN],
          defaultRoute: "/users",
          subItems: [
            {
              title: "Listar",
              href: "/users",
              icon: List,
            },
            {
              title: "Nuevo Usuario",
              href: "/users/new",
              icon: PlusCircle,
            }
          ]
        }
      ]
    },
    {
      title: "Configuración",
      items: [
        {
          title: "Categorías",
          icon: Tags,
          roles: [UserRole.ADMIN],
          defaultRoute: "/categories",
          subItems: [
            {
              title: "Listar",
              href: "/categories",
              icon: List,
            },
            {
              title: "Nueva Categoría",
              href: "/categories/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Colores",
          icon: Palette,
          roles: [UserRole.ADMIN],
          defaultRoute: "/colors",
          subItems: [
            {
              title: "Listar",
              href: "/colors",
              icon: List,
            },
            {
              title: "Nuevo Color",
              href: "/colors/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Condiciones",
          icon: ShieldCheck,
          roles: [UserRole.ADMIN],
          defaultRoute: "/conditions",
          subItems: [
            {
              title: "Listar",
              href: "/conditions",
              icon: List,
            },
            {
              title: "Nueva Condición",
              href: "/conditions/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Tipos de Items",
          icon: Boxes,
          roles: [UserRole.ADMIN],
          defaultRoute: "/item-types",
          subItems: [
            {
              title: "Listar",
              href: "/item-types",
              icon: List,
            },
            {
              title: "Nuevo Tipo",
              href: "/item-types/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Ubicaciones",
          icon: MapPin,
          roles: [UserRole.ADMIN],
          defaultRoute: "/locations",
          subItems: [
            {
              title: "Listar",
              href: "/locations",
              icon: List,
            },
            {
              title: "Nueva Ubicación",
              href: "/locations/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Almacenes",
          icon: Warehouse,
          roles: [UserRole.ADMIN],
          defaultRoute: "/warehouses",
          subItems: [
            {
              title: "Listar",
              href: "/warehouses",
              icon: List,
            },
            {
              title: "Nuevo Almacén",
              href: "/warehouses/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Materiales",
          icon: Package,
          roles: [UserRole.ADMIN],
          defaultRoute: "/materials",
          subItems: [
            {
              title: "Listar",
              href: "/materials",
              icon: List,
            },
            {
              title: "Nuevo Material",
              href: "/materials/new",
              icon: PlusCircle,
            }
          ]
        },
        {
          title: "Estados",
          icon: CircleDot,
          roles: [UserRole.ADMIN],
          defaultRoute: "/states",
          subItems: [
            {
              title: "Listar",
              href: "/states",
              icon: List,
            },
            {
              title: "Nuevo Estado",
              href: "/states/new",
              icon: PlusCircle,
            }
          ]
        }
      ]
    }
  ];

  const currentPath = location.pathname;
  const expandedModule = sidebarCategories
    .flatMap(category => category.items)
    .find(item =>
      item.defaultRoute === currentPath ||
      item.subItems.some(subItem => subItem.href === currentPath)
    )?.title;

  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const handleModuleClick = (moduleTitle: string, defaultRoute: string, subItems: { href: string }[]) => {
    const isInModule = subItems.some(subItem => subItem.href === currentPath) || defaultRoute === currentPath;
    if (!isInModule) {
      navigate(defaultRoute);
    }
  };

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

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {sidebarCategories.map((category) => (
          <div key={category.title} className="mb-6">
            {!collapsed && (
              <h3 className="px-3 mb-2 text-sm font-semibold text-muted-foreground">
                {category.title}
              </h3>
            )}
            <ul className="space-y-1">
              {category.items
                .filter(item => item.roles.includes(userRole))
                .map((item) => (
                  <li key={item.title}>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleModuleClick(item.title, item.defaultRoute, item.subItems)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors w-full",
                          "text-muted-foreground",
                          expandedModule === item.title && "bg-primary/10 text-primary font-medium",
                          collapsed && "justify-center"
                        )}
                      >
                        <item.icon size={20} />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            <ChevronDown
                              size={16}
                              className={cn(
                                "transition-transform",
                                expandedModule === item.title && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </button>
                      
                      
                      {!collapsed && expandedModule === item.title && (
                        <ul className="ml-6 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.href}>
                              <NavLink
                                to={subItem.href}
                                end
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors",
                                    isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                                  )
                                }
                              >
                                <subItem.icon size={16} />
                                <span>{subItem.title}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
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
