import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Pages that should not have sidebar
  const noSidebarRoutes = ["/", "/login", "/register"];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  if (!shouldShowSidebar) {
    // Simple layout without sidebar for landing, login, register pages
    return (
      <div className="min-h-screen w-full">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top header with sidebar trigger */}
          <header className="h-14 flex items-center border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center px-4">
              <SidebarTrigger />
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}