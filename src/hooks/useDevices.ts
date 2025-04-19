
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Device } from '@/types';
import { useAuth } from '@/components/AuthProvider';

export function useDevices() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: devices, isLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database records to match our Device interface
      return data.map((item): Device => ({
        ...item,
        isOn: item.is_on, // For backward compatibility
        icon: getIconNameForDeviceType(item.type),
        room: item.room_id || '', // This is simplified - in a real app we'd fetch room name
      }));
    },
    enabled: !!user,
  });

  const addDevice = useMutation({
    mutationFn: async (newDevice: Omit<Device, 'id' | 'created_at' | 'last_updated'>) => {
      // Transform the frontend Device format to match the database schema
      const deviceToInsert = {
        name: newDevice.name,
        type: newDevice.type,
        room_id: newDevice.room_id,
        user_id: user?.id,
        is_on: newDevice.is_on !== undefined ? newDevice.is_on : false,
        is_online: true,
        status: newDevice.status || {}
      };

      const { data, error } = await supabase
        .from('devices')
        .insert([deviceToInsert])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Success',
        description: 'Device added successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateDevice = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Device> & { id: string }) => {
      // Transform to database format
      const deviceUpdates: any = {};
      
      if (updates.name) deviceUpdates.name = updates.name;
      if (updates.type) deviceUpdates.type = updates.type;
      if (updates.room_id !== undefined) deviceUpdates.room_id = updates.room_id;
      if (updates.is_on !== undefined) deviceUpdates.is_on = updates.is_on;
      if (updates.isOn !== undefined) deviceUpdates.is_on = updates.isOn; // Handle both formats
      if (updates.status) deviceUpdates.status = updates.status;
      if (updates.is_online !== undefined) deviceUpdates.is_online = updates.is_online;

      const { data, error } = await supabase
        .from('devices')
        .update(deviceUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Success',
        description: 'Device updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Success',
        description: 'Device deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Helper function to map device types to icon names
  const getIconNameForDeviceType = (type: string): string => {
    const iconMap: Record<string, string> = {
      'light': 'lightbulb',
      'thermostat': 'thermometer',
      'camera': 'camera',
      'lock': 'lock',
      'speaker': 'speaker',
      'tv': 'tv',
      'fan': 'fan',
      'blind': 'blinds'
    };
    
    return iconMap[type] || 'lightbulb';
  };

  return {
    devices,
    isLoading,
    addDevice,
    updateDevice,
    deleteDevice,
  };
}
