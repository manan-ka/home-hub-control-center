
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Timer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

interface DeviceTimerProps {
  deviceId: string;
  onUpdateDevice: (id: string, updates: { is_on: boolean }) => void;
}

export function DeviceTimer({ deviceId, onUpdateDevice }: DeviceTimerProps) {
  const [minutes, setMinutes] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(time => {
          if (time <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, remainingTime]);

  const handleSetTimer = () => {
    const duration = parseInt(minutes);
    if (duration > 0) {
      setTimerActive(true);
      const timeInSeconds = duration * 60;
      setTotalTime(timeInSeconds);
      setRemainingTime(timeInSeconds);
      
      // Set timer to turn off device after specified minutes
      setTimeout(() => {
        onUpdateDevice(deviceId, { is_on: false });
        setTimerActive(false);
        setRemainingTime(0);
      }, duration * 60 * 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timerActive ? ((remainingTime / totalTime) * 100) : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={timerActive ? "bg-purple-light relative" : ""}
        >
          <Timer className="h-4 w-4" />
          {timerActive && (
            <span className="absolute -top-2 -right-2 bg-purple text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {Math.ceil(remainingTime / 60)}m
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Timer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {timerActive ? (
            <div className="space-y-2">
              <div className="text-center text-lg font-medium">
                {formatTime(remainingTime)}
              </div>
              <Progress value={progress} />
              <Button 
                variant="destructive" 
                onClick={() => {
                  setTimerActive(false);
                  setRemainingTime(0);
                }}
                className="w-full"
              >
                Cancel Timer
              </Button>
            </div>
          ) : (
            <>
              <Input
                type="number"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="1"
              />
              <Button 
                onClick={handleSetTimer} 
                disabled={!minutes || parseInt(minutes) <= 0}
                className="w-full"
              >
                Start Timer
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
