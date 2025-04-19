
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { BackendInfo } from '@/components/BackendInfo';
import { mockDevices, mockRooms } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-end mb-4">
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
      <Dashboard devices={mockDevices} rooms={mockRooms} />
      <div className="max-w-7xl mx-auto px-4">
        <BackendInfo />
      </div>
    </div>
  );
};

export default Index;
