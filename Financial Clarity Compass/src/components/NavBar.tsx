import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  TrendingUp, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  PiggyBank,
  Receipt,
  Target,
  Bell
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';

export function NavBar() {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You've been successfully logged out"
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature is currently in development`,
    });
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">FinanceFlow</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={() => handleComingSoon('Income')}
            >
              <PiggyBank className="h-4 w-4" />
              Income
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={() => handleComingSoon('Expenses')}
            >
              <Receipt className="h-4 w-4" />
              Expenses
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={() => handleComingSoon('Goals')}
            >
              <Target className="h-4 w-4" />
              Goals
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleComingSoon('Notifications')}
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="hidden sm:block font-medium">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name || 'Finance User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => handleComingSoon('Profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleComingSoon('Settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  handleComingSoon('Income');
                  setIsMobileMenuOpen(false);
                }}
              >
                <PiggyBank className="mr-2 h-4 w-4" />
                Income
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  handleComingSoon('Expenses');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Receipt className="mr-2 h-4 w-4" />
                Expenses
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  handleComingSoon('Goals');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Target className="mr-2 h-4 w-4" />
                Goals
              </Button>

              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  handleComingSoon('Notifications');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}