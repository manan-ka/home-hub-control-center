
export interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'camera' | 'lock' | 'speaker' | 'tv' | 'fan' | 'blind';
  room: string;
  isOn: boolean;
  status?: {
    brightness?: number;
    temperature?: number;
    volume?: number;
    color?: string;
    position?: number;
    mode?: string;
  };
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  devices: string[]; // Array of device IDs
}
