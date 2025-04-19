
import { Json } from "@/integrations/supabase/types";

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'camera' | 'lock' | 'speaker' | 'tv' | 'fan' | 'blind';
  room_id?: string;
  user_id: string;
  is_on: boolean;
  is_online: boolean;
  status?: {
    brightness?: number;
    temperature?: number;
    volume?: number;
    color?: string;
    position?: number;
    mode?: string;
  };
  created_at: string;
  last_updated: string;
  
  // Frontend properties (computed from database fields)
  room?: string;
  isOn?: boolean; // For backward compatibility
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  
  // Frontend properties (computed from database fields)
  devices?: string[]; // Array of device IDs
}
