
import { useState, useEffect } from 'react';
import { Device, Room } from '../types';
import { DeviceCard } from './DeviceCard';
import { RoomSelector } from './RoomSelector';

interface DashboardProps {
  devices: Device[];
  rooms: Room[];
}

export function Dashboard({ devices, rooms }: DashboardProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  const [deviceStates, setDeviceStates] = useState<Device[]>(devices);

  useEffect(() => {
    if (selectedRoom) {
      const filtered = deviceStates.filter(device => device.room === selectedRoom);
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(deviceStates);
    }
  }, [selectedRoom, deviceStates]);

  const handleRoomSelect = (roomId: string | null) => {
    setSelectedRoom(roomId);
  };

  const handleDeviceToggle = (id: string, isOn: boolean) => {
    const updatedDevices = deviceStates.map(device => 
      device.id === id ? { ...device, isOn } : device
    );
    setDeviceStates(updatedDevices);
    
    // This would normally send a request to the backend
    console.log(`Toggle device ${id} to ${isOn ? 'on' : 'off'}`);
  };

  const handleUpdateDeviceStatus = (id: string, status: any) => {
    const updatedDevices = deviceStates.map(device => 
      device.id === id ? { ...device, status: { ...device.status, ...status } } : device
    );
    setDeviceStates(updatedDevices);
    
    // This would normally send a request to the backend
    console.log(`Update device ${id} status:`, status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to your Smart Home</h2>
        <p className="text-gray-neutral">Control all your connected devices</p>
      </div>
      
      <RoomSelector 
        rooms={rooms} 
        selectedRoom={selectedRoom} 
        onRoomSelect={handleRoomSelect} 
      />
      
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
