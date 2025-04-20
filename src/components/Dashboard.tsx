
import { useState, useEffect } from 'react';
import { Device, Room } from '../types';
import { DeviceCard } from './DeviceCard';
import { RoomSelector } from './RoomSelector';
import { AddDeviceDialog } from './AddDeviceDialog';
import { useDevices } from '@/hooks/useDevices';

interface DashboardProps {
  devices: Device[];
  rooms: Room[];
}

export function Dashboard({ devices, rooms }: DashboardProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  const { updateDevice } = useDevices();

  useEffect(() => {
    if (selectedRoom) {
      // Filter devices by room_id instead of room
      const filtered = devices.filter(device => device.room_id === selectedRoom);
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(devices);
    }
  }, [selectedRoom, devices]);

  const handleRoomSelect = (roomId: string | null) => {
    setSelectedRoom(roomId);
  };

  const handleDeviceToggle = (id: string, isOn: boolean) => {
    // Update device state in database
    updateDevice.mutate({ 
      id, 
      is_on: isOn 
    });
  };

  const handleUpdateDeviceStatus = (id: string, status: any) => {
    // Update device status in database
    updateDevice.mutate({
      id,
      status
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to your Smart Home</h2>
        <p className="text-gray-neutral">Control all your connected devices</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <RoomSelector 
          rooms={rooms} 
          selectedRoom={selectedRoom} 
          onRoomSelect={handleRoomSelect} 
        />
        <AddDeviceDialog roomId={selectedRoom} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDevices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={handleDeviceToggle}
            onUpdateStatus={handleUpdateDeviceStatus}
          />
        ))}
      </div>
      
      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-neutral">No devices found for this room.</p>
        </div>
      )}
    </div>
  );
}
