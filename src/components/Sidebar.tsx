
import { 
  Home, 
  LineChart, 
  BarChart3, 
  ListChecks, 
  Briefcase, 
  MessageSquareText, 
  Bell, 
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: Home, href: '/' },
  { title: 'Market Data', icon: LineChart, href: '/market' },
  { title: 'Technical Analysis', icon: BarChart3, href: '/analysis' },
  { title: 'Watchlist', icon: ListChecks, href: '/watchlist' },
  { title: 'Portfolio', icon: Briefcase, href: '/portfolio' },
  { title: 'AI Assistant', icon: MessageSquareText, href: '/assistant' },
  { title: 'Alerts', icon: Bell, href: '/alerts' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "h-screen fixed left-0 top-0 z-40 bg-white border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-14 flex items-center px-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-bold text-nifty font-heading">
              BSI
            </h2>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href 
                  ? "bg-nifty text-white hover:bg-nifty/90" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="px-2 py-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full flex items-center text-gray-700 hover:bg-gray-100",
              collapsed && "justify-center"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
          
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center mt-2 text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              <span>Help & Support</span>
            </Button>
          )}
          
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="w-full flex justify-center mt-2 text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="px-4 py-2 text-xs text-center text-gray-500">
          {!collapsed && "v1.0.0 • "}SEBI Compliant
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
