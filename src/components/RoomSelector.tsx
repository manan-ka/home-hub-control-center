
import { Room } from '../types';
import { cn } from '../lib/utils';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoom: string | null;
  onRoomSelect: (roomId: string | null) => void;
}

export function RoomSelector({ rooms, selectedRoom, onRoomSelect }: RoomSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-colors",
          selectedRoom === null 
            ? "bg-purple text-white shadow-md" 
            : "bg-gray-light text-gray-dark hover:bg-purple-light hover:text-white"
        )}
        onClick={() => onRoomSelect(null)}
      >
        All Rooms
      </button>
      
      {rooms.map((room) => (
        <button
          key={room.id}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-colors",
            selectedRoom === room.id 
              ? "bg-purple text-white shadow-md" 
              : "bg-gray-light text-gray-dark hover:bg-purple-light hover:text-white"
          )}
          onClick={() => onRoomSelect(room.id)}
        >
          {room.name}
        </button>
      ))}
    </div>
  );
}
