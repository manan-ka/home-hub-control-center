import { useState } from 'react';
import { Device } from '../types';
import { Lightbulb, Thermometer, Fan, Tv, Blinds } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { cn } from '../lib/utils';
import { DeviceTimer } from './DeviceTimer';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string, isOn: boolean) => void;
  onUpdateStatus: (id: string, status: any) => void;
}

export function DeviceCard({ device, onToggle, onUpdateStatus }: DeviceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getDeviceIcon = () => {
    switch (device.icon) {
      case 'lightbulb':
        return <Lightbulb className={cn("h-6 w-6", device.is_on ? "text-orange-bright" : "text-gray-neutral")} />;
      case 'thermometer':
        return <Thermometer className={cn("h-6 w-6", device.is_on ? "text-blue-bright" : "text-gray-neutral")} />;
      case 'fan':
        return <Fan className={cn("h-6 w-6", device.is_on ? "text-blue-bright" : "text-gray-neutral")} />;
      case 'tv':
        return <Tv className={cn("h-6 w-6", device.is_on ? "text-blue-bright" : "text-gray-neutral")} />;
      case 'blinds':
        return <Blinds className={cn("h-6 w-6", device.is_on ? "text-blue-bright" : "text-gray-neutral")} />;
      default:
        return <Lightbulb className={cn("h-6 w-6", device.is_on ? "text-orange-bright" : "text-gray-neutral")} />;
    }
  };

  const getDeviceControls = () => {
    if (!device.is_on) return null;
    
    switch (device.type) {
      case 'light':
        return (
          <div className="mt-4">
            <label className="block text-sm text-gray-neutral mb-1">Brightness</label>
            <Slider
              value={[device.status?.brightness || 0]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => {
                onUpdateStatus(device.id, { ...device.status, brightness: value[0] });
              }}
              className="my-2"
            />
          </div>
        );
      case 'thermostat':
        return (
          <div className="mt-4">
            <label className="block text-sm text-gray-neutral mb-1">Temperature</label>
            <div className="flex items-center justify-between">
              <button 
                className="bg-gray-light text-gray-dark h-8 w-8 rounded-full flex items-center justify-center"
                onClick={() => onUpdateStatus(device.id, { ...device.status, temperature: (device.status?.temperature || 72) - 1 })}
              >
                -
              </button>
              <span className="text-lg font-medium">{device.status?.temperature || 72}°</span>
              <button 
                className="bg-gray-light text-gray-dark h-8 w-8 rounded-full flex items-center justify-center"
                onClick={() => onUpdateStatus(device.id, { ...device.status, temperature: (device.status?.temperature || 72) + 1 })}
              >
                +
              </button>
            </div>
          </div>
        );
      case 'fan':
        return (
          <div className="mt-4">
            <label className="block text-sm text-gray-neutral mb-1">Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((mode) => (
                <button
                  key={mode}
                  className={cn(
                    "py-1 px-2 text-sm rounded",
                    device.status?.mode === mode ? "bg-blue-bright text-white" : "bg-gray-light text-gray-dark"
                  )}
                  onClick={() => onUpdateStatus(device.id, { ...device.status, mode })}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );
      case 'blind':
        return (
          <div className="mt-4">
            <label className="block text-sm text-gray-neutral mb-1">Position</label>
            <Slider
              value={[device.status?.position || 0]}
              min={0}
              max={100}
              step={10}
              onValueChange={(value) => {
                onUpdateStatus(device.id, { ...device.status, position: value[0] });
              }}
              className="my-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleDeviceTimerUpdate = (id: string, updates: { is_on: boolean }) => {
    onToggle(id, updates.is_on);
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm transition-all duration-300",
        isHovered ? "shadow-md" : "",
        device.is_on ? "border-l-4 border-purple" : "border border-gray-light"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3">
            {getDeviceIcon()}
          </div>
          <div>
            <h3 className="font-medium">{device.name}</h3>
            <p className="text-xs text-gray-neutral capitalize">
              {device.is_on ? 'On' : 'Off'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DeviceTimer deviceId={device.id} onUpdateDevice={handleDeviceTimerUpdate} />
          <Switch 
            checked={device.is_on} 
            onCheckedChange={(checked) => onToggle(device.id, checked)}
          />
        </div>
      </div>
      
      {getDeviceControls()}
    </div>
  );
}
