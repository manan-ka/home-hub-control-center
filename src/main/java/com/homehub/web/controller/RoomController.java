
package com.homehub.web.controller;

import com.homehub.model.Room;
import com.homehub.service.RoomService;
import com.homehub.web.dto.RoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
@RequiredArgsConstructor
public class RoomController {
    
    private final RoomService roomService;
    
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        UUID userId = UUID.fromString("11111111-1111-1111-1111-111111111111"); // Just for example, you would get the actual user ID
        
        return ResponseEntity.ok(roomService.getAllRoomsByUserId(userId));
    }
    
    @PostMapping
    public ResponseEntity<Room> addRoom(@RequestBody RoomDto roomDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        UUID userId = UUID.fromString("11111111-1111-1111-1111-111111111111"); // Just for example, you would get the actual user ID
        
        return ResponseEntity.ok(roomService.addRoom(roomDto, userId));
    }
}
