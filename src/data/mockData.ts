
import { Device, Room } from '../types';

export const mockDevices: Device[] = [
  {
    id: 'd1',
    name: 'Living Room Light',
    type: 'light',
    room: 'living-room',
    isOn: true,
    status: {
      brightness: 80,
      color: '#FFFFFF'
    },
    icon: 'lightbulb'
  },
  {
    id: 'd2',
    name: 'Kitchen Light',
    type: 'light',
    room: 'kitchen',
    isOn: false,
    status: {
      brightness: 100,
      color: '#FFFFFF'
    },
    icon: 'lightbulb'
  },
  {
    id: 'd3',
    name: 'Smart TV',
    type: 'tv',
    room: 'living-room',
    isOn: false,
    status: {
      volume: 50
    },
    icon: 'tv'
  },
  {
    id: 'd4',
    name: 'Thermostat',
    type: 'thermostat',
    room: 'living-room',
    isOn: true,
    status: {
      temperature: 72,
      mode: 'cooling'
    },
    icon: 'thermometer'
  },
  {
    id: 'd5',
    name: 'Bedroom Fan',
    type: 'fan',
    room: 'bedroom',
    isOn: true,
    status: {
      mode: 'medium'
    },
    icon: 'fan'
  },
  {
    id: 'd6',
    name: 'Bathroom Light',
    type: 'light',
    room: 'bathroom',
    isOn: false,
    status: {
      brightness: 100,
      color: '#F5F5DC'
    },
    icon: 'lightbulb'
  },
  {
    id: 'd7',
    name: 'Living Room Blinds',
    type: 'blind',
    room: 'living-room',
    isOn: true,
    status: {
      position: 50
    },
    icon: 'blinds'
  },
  {
    id: 'd8',
    name: 'Bedroom Light',
    type: 'light',
    room: 'bedroom',
    isOn: true,
    status: {
      brightness: 60,
      color: '#FFF0DB'
    },
    icon: 'lightbulb'
  }
];

export const mockRooms: Room[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    devices: ['d1', 'd3', 'd4', 'd7']
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    devices: ['d2']
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    devices: ['d5', 'd8']
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    devices: ['d6']
  }
];
