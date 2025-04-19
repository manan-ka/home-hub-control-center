
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { BackendInfo } from '@/components/BackendInfo';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useDevices } from '@/hooks/useDevices';
import { useRooms } from '@/hooks/useRooms';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { devices, isLoading: devicesLoading } = useDevices();
  const { rooms, isLoading: roomsLoading } = useRooms();

  useEffect(() => {
    // Set up real-time subscriptions for devices and rooms
    const channel = supabase.channel('db-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'devices' },
        (payload) => {
          console.log('Device change received:', payload);
          toast({
            title: 'Device Update',
            description: `A device has been ${payload.eventType}`,
          });
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        (payload) => {
          console.log('Room change received:', payload);
          toast({
            title: 'Room Update',
            description: `A room has been ${payload.eventType}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (devicesLoading || roomsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
      <Dashboard devices={devices || []} rooms={rooms || []} />
      <div className="max-w-7xl mx-auto px-4">
        <BackendInfo />
      </div>
    </div>
  );
};

export default Index;
