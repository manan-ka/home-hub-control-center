
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Room } from '@/types';
import { useAuth } from '@/components/AuthProvider';

export function useRooms() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database records to match our Room interface
      return data.map((item): Room => ({
        ...item,
        devices: [], // We'll populate this elsewhere or in a more complex query
      }));
    },
    enabled: !!user,
  });

  const addRoom = useMutation({
    mutationFn: async (newRoom: Omit<Room, 'id' | 'created_at'>) => {
      const roomToInsert = {
        name: newRoom.name,
        user_id: user?.id
      };

      const { data, error } = await supabase
        .from('rooms')
        .insert([roomToInsert])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Success',
        description: 'Room added successfully',
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

  const updateRoom = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Room> & { id: string }) => {
      // Transform to database format
      const roomUpdates: any = {};
      
      if (updates.name) roomUpdates.name = updates.name;

      const { data, error } = await supabase
        .from('rooms')
        .update(roomUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Success',
        description: 'Room updated successfully',
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

  const deleteRoom = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Success',
        description: 'Room deleted successfully',
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

  return {
    rooms,
    isLoading,
    addRoom,
    updateRoom,
    deleteRoom,
  };
}
