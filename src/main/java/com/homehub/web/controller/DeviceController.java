
package com.homehub.web.controller;

import com.homehub.model.Device;
import com.homehub.service.DeviceService;
import com.homehub.web.dto.DeviceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/devices")
@CrossOrigin
@RequiredArgsConstructor
public class DeviceController {
    
    private final DeviceService deviceService;
    
    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        UUID userId = UUID.fromString("11111111-1111-1111-1111-111111111111"); // Just for example, you would get the actual user ID
        
        return ResponseEntity.ok(deviceService.getAllDevicesByUserId(userId));
    }
    
    @PostMapping
    public ResponseEntity<Device> addDevice(@RequestBody DeviceDto deviceDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        UUID userId = UUID.fromString("11111111-1111-1111-1111-111111111111"); // Just for example, you would get the actual user ID
        
        return ResponseEntity.ok(deviceService.addDevice(deviceDto, userId));
    }
    
    @PutMapping("/{id}/toggle")
    public ResponseEntity<Device> toggleDevice(@PathVariable UUID id, @RequestBody Map<String, Boolean> body) {
        boolean isOn = body.getOrDefault("is_on", false);
        return ResponseEntity.ok(deviceService.toggleDevice(id, isOn));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Device> updateDeviceStatus(@PathVariable UUID id, @RequestBody Map<String, Object> status) {
        return ResponseEntity.ok(deviceService.updateDeviceStatus(id, status));
    }
}
