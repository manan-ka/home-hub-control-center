
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { useRooms } from '@/hooks/useRooms';
import { Plus } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export function AddRoomDialog() {
  const [name, setName] = useState('');
  const { addRoom } = useRooms();
  const { user } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && user) {
      addRoom.mutate({ 
        name,
        user_id: user.id
      });
      setName('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={20} />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={!name.trim() || !user}>
            Add Room
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
