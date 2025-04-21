
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { UserRole } from "@/types";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  userRole?: UserRole;
}

export function MainLayout({ children, title, userRole = UserRole.ADMIN }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
