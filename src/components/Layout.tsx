
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-16 md:pl-64">
        <Header />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
      <Button 
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-100 border-gray-200"
        onClick={() => navigate('/settings')}
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Layout;
