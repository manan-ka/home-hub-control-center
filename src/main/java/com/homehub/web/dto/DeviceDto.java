
package com.homehub.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDto {
    private String name;
    private String type;
    private String roomId;
    private Boolean isOn;
    private Boolean isOnline;
    private String status;
}
