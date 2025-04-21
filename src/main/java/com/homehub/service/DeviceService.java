
package com.homehub.service;

import com.homehub.model.Device;
import com.homehub.repository.DeviceRepository;
import com.homehub.web.dto.DeviceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;
    
    public List<Device> getAllDevicesByUserId(UUID userId) {
        return deviceRepository.findAllByUserId(userId);
    }
    
    public Device addDevice(DeviceDto deviceDto, UUID userId) {
        Device device = new Device();
        device.setName(deviceDto.getName());
        device.setType(deviceDto.getType());
        device.setRoomId(deviceDto.getRoomId() != null ? UUID.fromString(deviceDto.getRoomId()) : null);
        device.setUserId(userId);
        device.setIsOn(deviceDto.getIsOn() != null ? deviceDto.getIsOn() : false);
        device.setIsOnline(deviceDto.getIsOnline() != null ? deviceDto.getIsOnline() : true);
        device.setStatus(deviceDto.getStatus() != null ? deviceDto.getStatus() : "{}");
        device.setIcon(getIconNameForDeviceType(deviceDto.getType()));
        
        return deviceRepository.save(device);
    }
    
    public Device toggleDevice(UUID deviceId, boolean isOn) {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        
        device.setIsOn(isOn);
        return deviceRepository.save(device);
    }
    
    public Device updateDeviceStatus(UUID deviceId, Map<String, Object> status) {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new RuntimeException("Device not found"));
        
        // Convert Map to JSON string (you might need a JSON library for more complex cases)
        String statusJson = status.toString();
        device.setStatus(statusJson);
        
        return deviceRepository.save(device);
    }
    
    // Helper function to map device types to icon names
    private String getIconNameForDeviceType(String type) {
        Map<String, String> iconMap = Map.of(
                "light", "lightbulb",
                "thermostat", "thermometer",
                "camera", "camera",
                "lock", "lock",
                "speaker", "speaker",
                "tv", "tv",
                "fan", "fan",
                "blind", "blinds"
        );
        
        return iconMap.getOrDefault(type, "lightbulb");
    }
}
