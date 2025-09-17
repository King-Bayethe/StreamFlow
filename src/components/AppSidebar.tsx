import { 
  Home, 
  Compass, 
  Play, 
  Settings, 
  User, 
  LogOut, 
  BarChart3, 
  Shield,
  Tv,
  Radio,
  Users,
  DollarSign,
  Zap,
  PieChart
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Helper function to get home URL based on user role
const getHomeUrl = (user: any, isAdmin: boolean, isCreator: boolean) => {
  if (!user) return "/";
  if (isAdmin) return "/admin";
  if (isCreator) return "/dashboard";
  return "/home";
};

// Navigation items
const mainNavItems = [
  { title: "Browse", url: "/browse", icon: Compass },
];

const creatorNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Analytics", url: "/creator/analytics", icon: PieChart },
  { title: "Streaming", url: "/creator/streaming", icon: Radio },
  { title: "Engagement", url: "/creator/engagement", icon: Users },
  { title: "Monetization", url: "/creator/monetization", icon: DollarSign },
  { title: "AI Suite", url: "/creator/ai-suite", icon: Zap },
  { title: "Settings", url: "/creator/settings", icon: Settings },
  { title: "Channel", url: "/channel", icon: Tv },
];

const userNavItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Support", url: "/support", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, userRole, isAdmin, isCreator, signOut } = useAuth();
  const navigate = useNavigate();
  
  const collapsed = state === "collapsed";
  const homeUrl = getHomeUrl(user, isAdmin, isCreator);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Play className="h-4 w-4" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StreamFlow
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home - dynamic based on user role */}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NavLink to={homeUrl} end className={getNavCls}>
                    <div className="flex items-center gap-3 w-full">
                      <Home className="h-4 w-4" />
                      {!collapsed && <span>Home</span>}
                    </div>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Other main navigation items */}
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <NavLink to={item.url} end className={getNavCls}>
                      <div className="flex items-center gap-3 w-full">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                    </NavLink>    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Creator Tools */}
        {isCreator && (
          <SidebarGroup>
            <SidebarGroupLabel>Creator Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {creatorNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <NavLink 
                        to={item.url === "/channel" ? `/channel/${user?.user_metadata?.username || 'me'}` : item.url} 
                        className={getNavCls}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Admin Tools */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/admin" className={getNavCls}>
                      <div className="flex items-center gap-3 w-full">
                        <Shield className="h-4 w-4" />
                        {!collapsed && <span>Admin Dashboard</span>}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* User Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <NavLink to={item.url} className={getNavCls}>
                      <div className="flex items-center gap-3 w-full">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {user && (
          <div className="p-3">
            {!collapsed ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.user_metadata?.username || user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {userRole}
                    </p>
                  </div>
                </div>
                <Separator />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="p-1"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
        
        {!user && !collapsed && (
          <div className="p-3">
            <Button className="w-full">
              <NavLink to="/login" className="flex items-center justify-center w-full">
                Sign In
              </NavLink>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}