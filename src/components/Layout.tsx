import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Settings,
  User,
  Headphones,
  PhoneCall,
  History,
  PanelLeft,
  Search,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  currentMode: "outbound" | "inbound" | "analytics" | "settings";
  onModeChange: (mode: "outbound" | "inbound" | "analytics" | "settings") => void;
}

const navigationItems = [
  { id: "outbound" as const, label: "Outbound", icon: PhoneCall },
  { id: "inbound" as const, label: "Inbound", icon: Headphones },
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
];

export default function Layout({ children, currentMode, onModeChange }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard-shell flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden h-screen shrink-0 overflow-hidden border-r border-border bg-sidebar px-3 py-4 transition-[width] duration-200 lg:flex lg:flex-col ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className={`mb-6 flex items-center px-2 ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <div className={`flex min-w-0 items-center gap-2.5 ${isSidebarCollapsed ? "hidden" : ""}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="h-5 w-5" strokeWidth={1.7} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-tight">CallFlow</p>
              {/* <p className="text-[10px] font-medium uppercase tracking-[.12em] text-muted-foreground">Voice operations</p> */}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
            className="icon-button border-0"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* <div className={`relative mb-5 ${isSidebarCollapsed ? "hidden" : ""}`}>
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            autoComplete="off"
            placeholder="Search"
            className="h-9 w-full rounded-lg border border-border bg-input pl-9 pr-14 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/40"
          />
          <kbd className="absolute right-2 top-1.5 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘ K</kbd>
        </div> */}

        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            window.location.href = "http://127.0.0.1:5000/assistent";
          }}
          title={isSidebarCollapsed ? "Start AI Calling Campaign" : undefined}
          className={`mb-5 h-9 w-full rounded-lg border border-primary/60 bg-primary/10 text-primary hover:bg-primary/15 ${
            isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-3 px-3"
          }`}
        >
          <Zap className="h-[18px] w-[18px] shrink-0" strokeWidth={1.7} />
          <span className={isSidebarCollapsed ? "hidden" : "truncate text-xs font-medium"}>
            Start AI Calling Campaign
          </span>
        </Button>

        <p className={`sidebar-group-label mt-0 ${isSidebarCollapsed ? "hidden" : ""}`}>Main</p>
        <nav className="space-y-1">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant="ghost"
              type="button"
              onClick={() => onModeChange(id)}
              title={isSidebarCollapsed ? label : undefined}
              className={`relative flex h-9 w-full rounded-lg px-3 transition-colors duration-150 ${
                isSidebarCollapsed ? "justify-center" : "justify-start gap-3"
              } ${
                currentMode === id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/[.05] hover:text-foreground"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className={isSidebarCollapsed ? "hidden" : ""}>{label}</span>
            </Button>
          ))}
        </nav>

        <div className="mt-2 flex min-h-0 flex-1 flex-col space-y-1">
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate("/history")}
            title={isSidebarCollapsed ? "Campaign History" : undefined}
            className={`flex h-9 w-full rounded-lg px-3 text-muted-foreground hover:bg-white/[.05] hover:text-foreground ${
              isSidebarCollapsed ? "justify-center" : "justify-start gap-3"
            }`}
          >
            <History className="h-[18px] w-[18px]" />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Campaign History</span>
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => onModeChange("settings")}
            title={isSidebarCollapsed ? "Settings" : undefined}
            className={`flex h-9 w-full rounded-lg px-3 text-muted-foreground hover:bg-white/[.05] hover:text-foreground ${
              isSidebarCollapsed ? "justify-center" : "justify-start gap-3"
            }`}
          >
            <Settings className="h-[18px] w-[18px]" />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Settings</span>
          </Button>

          {!isSidebarCollapsed && (
            <div className="pt-1">
              <Button
                variant="ghost"
                type="button"
                onClick={() => navigate("/profile")}
                className="h-9 w-full justify-start gap-3 px-2 text-muted-foreground hover:bg-white/[.05] hover:text-foreground"
              >
                <User className="h-4 w-4" /> Profile
              </Button>
            </div>
          )}

          <div className={`mt-auto pt-4 ${isSidebarCollapsed ? "hidden" : ""}`}>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs font-medium">No package</p>
              <p className="mt-1 text-xs text-muted-foreground">0 credits remaining</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">Buy credits</Button>
            </div>
          </div>
        </div>
      </aside>

      <div className={`flex min-h-screen min-w-0 flex-1 flex-col ${isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur-md lg:px-8">
          <div>
            <h1 className="text-[16px] font-semibold tracking-tight text-foreground">
              {navigationItems.find((item) => item.id === currentMode)?.label}
            </h1>
            {/* <p className="text-xs text-muted-foreground">Voice operations workspace</p> */}
          </div>
          <nav className="flex items-center gap-1 lg:hidden" aria-label="Main navigation">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onModeChange(id)}
                aria-current={currentMode === id ? "page" : undefined}
                className={currentMode === id ? "bg-primary/15 text-primary" : "text-muted-foreground"}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">{label}</span>
              </Button>
            ))}
          </nav>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
