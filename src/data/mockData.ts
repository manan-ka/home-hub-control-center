
import { Device, Room } from '../types';

// Current timestamp for mocks
const now = new Date().toISOString();
const mockUserId = "00000000-0000-0000-0000-000000000000"; // Placeholder user ID

export const mockDevices: Device[] = [
  {
    id: 'd1',
    name: 'Living Room Light',
    type: 'light',
    room_id: 'living-room',
    user_id: mockUserId,
    is_on: true,
    is_online: true,
    status: {
      brightness: 80,
      color: '#FFFFFF'
    },
    created_at: now,
    last_updated: now,
    room: 'living-room',
    isOn: true,
    icon: 'lightbulb'
  },
  {
    id: 'd2',
    name: 'Kitchen Light',
    type: 'light',
    room_id: 'kitchen',
    user_id: mockUserId,
    is_on: false,
    is_online: true,
    status: {
      brightness: 100,
      color: '#FFFFFF'
    },
    created_at: now,
    last_updated: now,
    room: 'kitchen',
    isOn: false,
    icon: 'lightbulb'
  },
  {
    id: 'd3',
    name: 'Smart TV',
    type: 'tv',
    room_id: 'living-room',
    user_id: mockUserId,
    is_on: false,
    is_online: true,
    status: {
      volume: 50
    },
    created_at: now,
    last_updated: now,
    room: 'living-room',
    isOn: false,
    icon: 'tv'
  },
  {
    id: 'd4',
    name: 'Thermostat',
    type: 'thermostat',
    room_id: 'living-room',
    user_id: mockUserId,
    is_on: true,
    is_online: true,
    status: {
      temperature: 72,
      mode: 'cooling'
    },
    created_at: now,
    last_updated: now,
    room: 'living-room',
    isOn: true,
    icon: 'thermometer'
  },
  {
    id: 'd5',
    name: 'Bedroom Fan',
    type: 'fan',
    room_id: 'bedroom',
    user_id: mockUserId,
    is_on: true,
    is_online: true,
    status: {
      mode: 'medium'
    },
    created_at: now,
    last_updated: now,
    room: 'bedroom',
    isOn: true,
    icon: 'fan'
  },
  {
    id: 'd6',
    name: 'Bathroom Light',
    type: 'light',
    room_id: 'bathroom',
    user_id: mockUserId,
    is_on: false,
    is_online: true,
    status: {
      brightness: 100,
      color: '#F5F5DC'
    },
    created_at: now,
    last_updated: now,
    room: 'bathroom',
    isOn: false,
    icon: 'lightbulb'
  },
  {
    id: 'd7',
    name: 'Living Room Blinds',
    type: 'blind',
    room_id: 'living-room',
    user_id: mockUserId,
    is_on: true,
    is_online: true,
    status: {
      position: 50
    },
    created_at: now,
    last_updated: now,
    room: 'living-room',
    isOn: true,
    icon: 'blinds'
  },
  {
    id: 'd8',
    name: 'Bedroom Light',
    type: 'light',
    room_id: 'bedroom',
    user_id: mockUserId,
    is_on: true,
    is_online: true,
    status: {
      brightness: 60,
      color: '#FFF0DB'
    },
    created_at: now,
    last_updated: now,
    room: 'bedroom',
    isOn: true,
    icon: 'lightbulb'
  }
];

export const mockRooms: Room[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    user_id: mockUserId,
    created_at: now,
    devices: ['d1', 'd3', 'd4', 'd7']
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    user_id: mockUserId,
    created_at: now,
    devices: ['d2']
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    user_id: mockUserId,
    created_at: now,
    devices: ['d5', 'd8']
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    user_id: mockUserId,
    created_at: now,
    devices: ['d6']
  }
];
