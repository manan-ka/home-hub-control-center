
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { BackendInfo } from '@/components/BackendInfo';
import { useNavigate } from 'react-router-dom';
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

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-4">
        {devicesLoading || roomsLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading your smart home...</p>
          </div>
        ) : (
          <Dashboard devices={devices || []} rooms={rooms || []} />
        )}
        <BackendInfo />
      </div>
    </div>
  );
};

export default Index;
