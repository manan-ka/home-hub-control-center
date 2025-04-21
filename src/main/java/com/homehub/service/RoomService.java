
package com.homehub.service;

import com.homehub.model.Room;
import com.homehub.repository.RoomRepository;
import com.homehub.web.dto.RoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    
    public List<Room> getAllRoomsByUserId(UUID userId) {
        return roomRepository.findAllByUserId(userId);
    }
    
    public Room addRoom(RoomDto roomDto, UUID userId) {
        Room room = new Room();
        room.setName(roomDto.getName());
        room.setUserId(userId);
        
        return roomRepository.save(room);
    }
}
