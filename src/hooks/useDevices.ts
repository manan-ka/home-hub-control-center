
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Device } from '@/types';
import {
  getDevices,
  addDevice as apiAddDevice,
  updateDeviceToggle,
  updateDeviceStatus,
} from '@/api/backend';

export function useDevices() {
  const queryClient = useQueryClient();

  const { data: devices, isLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const data = await getDevices();
      return data as Device[];
    },
  });

  const addDevice = useMutation({
    mutationFn: async (device: Omit<Device, 'id' | 'created_at' | 'last_updated'>) => {
      return await apiAddDevice(device);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({ title: 'Success', description: 'Device added!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const updateDevice = useMutation({
    mutationFn: async ({
      id,
      is_on,
      status,
    }: {
      id: string;
      is_on?: boolean;
      status?: any;
    }) => {
      if (typeof is_on === "boolean") {
        return await updateDeviceToggle(id, is_on);
      }
      if (status) {
        return await updateDeviceStatus(id, status);
      }
      throw new Error("No update data provided");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({ title: 'Success', description: 'Device updated!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  return { devices, isLoading, addDevice, updateDevice };
}
