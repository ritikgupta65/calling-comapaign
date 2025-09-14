import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, BarChart3, Settings, User, LogOut, Moon, Sun, Headphones, PhoneCall, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
  currentMode: "outbound" | "inbound" | "analytics" | "settings";
  onModeChange: (mode: "outbound" | "inbound" | "analytics" | "settings") => void;
}

export default function Layout({ children, currentMode, onModeChange }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navigationItems = [
    {
      id: "outbound" as const,
      label: "Outbound",
      icon: PhoneCall,
      description: "AI Dialer & Campaigns",
      gradient: "from-primary to-accent"
    },
    {
      id: "inbound" as const,
      label: "Inbound", 
      icon: Headphones,
      description: "AI Receptionist",
      gradient: "from-secondary to-primary"
    },
    {
      id: "analytics" as const,
      label: "Analytics",
      icon: BarChart3,
      description: "Metrics & Reports",
      gradient: "from-accent to-secondary"
    },
    {
      id: "settings" as const,
      label: "Settings",
      icon: Settings,
      description: "Config & Integrations",
      gradient: "from-secondary to-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-poppins font-bold text-gradient-primary">CallFlow AI</h1>
              <p className="text-xs text-muted-foreground">Premium Call Center</p>
            </div>
          </div>

          {/* Mode Navigation */}
          <nav className="flex items-center space-x-2 bg-muted/50 rounded-xl p-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentMode === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onModeChange(item.id)}
                  className={`
                    relative flex items-center space-x-2 px-4 py-2 transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-premium hover:shadow-glow` 
                      : 'hover:bg-muted/80'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg" />
                  )}
                </Button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Status Badge */}
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              Online
            </Badge>

            {/* History Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/history')}
              className="w-9 h-9 rounded-lg hover:bg-muted/80"
            >
              <History className="w-4 h-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg hover:bg-muted/80"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-lg">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                    <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
                    <AvatarFallback className="bg-gradient-primary text-white font-medium">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">John Doe</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      john@company.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}