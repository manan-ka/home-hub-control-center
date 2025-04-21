
import { House, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b">
      <div className="flex items-center">
        <House className="h-8 w-8 text-purple mr-2" />
        <h1 className="text-2xl font-bold text-gray-dark">HomeHub</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-neutral">
          {currentTime}
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
