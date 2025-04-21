
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Room } from '@/types';
import { useAuth } from '@/components/AuthProvider';
import { getRooms, addRoom as apiAddRoom, updateRoom as apiUpdateRoom, deleteRoom as apiDeleteRoom } from '@/api/backend';

export function useRooms() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const data = await getRooms();
      // Make sure each room matches our Room interface
      return data.map((item: any): Room => ({
        ...item,
        devices: [], // Update later to join devices if needed
      }));
    },
    enabled: !!user,
  });

  const addRoom = useMutation({
    mutationFn: async (newRoom: Omit<Room, 'id' | 'created_at'>) => {
      const roomToInsert = {
        name: newRoom.name,
      };
      return await apiAddRoom(roomToInsert);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Success',
        description: 'Room added successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateRoom = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Room> & { id: string }) => {
      const updatesObj: any = {};
      if (updates.name) updatesObj.name = updates.name;
      return await apiUpdateRoom(id, updatesObj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Success',
        description: 'Room updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteRoom = useMutation({
    mutationFn: async (id: string) => {
      await apiDeleteRoom(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Success',
        description: 'Room deleted successfully',
      });
    },
    onError: (error: Error) => {
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
