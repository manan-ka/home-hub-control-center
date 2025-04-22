
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useDevices } from '@/hooks/useDevices';
import { Plus } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const deviceTypes = [
  { value: 'light', label: 'Light' },
  { value: 'thermostat', label: 'Thermostat' },
  { value: 'fan', label: 'Fan' },
  { value: 'tv', label: 'TV' },
  { value: 'blind', label: 'Blind' }
];

interface AddDeviceDialogProps {
  roomId: string | null;
}

export function AddDeviceDialog({ roomId }: AddDeviceDialogProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<string>('');
  const { addDevice } = useDevices();
  const { user } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && type && user) {
      // Get the icon name based on the selected device type
      const iconName = getIconNameForDeviceType(type);
      
      addDevice.mutate({ 
        name,
        type: type as any,
        room_id: roomId,
        user_id: user.id,
        is_on: false,
        is_online: true, // Add the missing is_online property
        icon: iconName, // Add the missing icon property
        status: {}
      });
      setName('');
      setType('');
    }
  };
  
  // Helper function to map device types to icon names (same as in useDevices.ts)
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={20} />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Device Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent>
              {deviceTypes.map((deviceType) => (
                <SelectItem key={deviceType.value} value={deviceType.value}>
                  {deviceType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!name.trim() || !type || !user}>
            Add Device
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
