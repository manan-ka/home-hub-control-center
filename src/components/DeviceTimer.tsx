
import { useState } from 'react';
import { Button } from './ui/button';
import { Timer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';

interface DeviceTimerProps {
  deviceId: string;
  onUpdateDevice: (id: string, updates: { is_on: boolean }) => void;
}

export function DeviceTimer({ deviceId, onUpdateDevice }: DeviceTimerProps) {
  const [minutes, setMinutes] = useState('');
  const [timerActive, setTimerActive] = useState(false);

  const handleSetTimer = () => {
    const duration = parseInt(minutes);
    if (duration > 0) {
      setTimerActive(true);
      // Set timer to turn off device after specified minutes
      setTimeout(() => {
        onUpdateDevice(deviceId, { is_on: false });
        setTimerActive(false);
      }, duration * 60 * 1000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className={timerActive ? "bg-purple-light" : ""}>
          <Timer className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Timer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            min="1"
          />
          <Button onClick={handleSetTimer} disabled={!minutes || parseInt(minutes) <= 0}>
            Start Timer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
