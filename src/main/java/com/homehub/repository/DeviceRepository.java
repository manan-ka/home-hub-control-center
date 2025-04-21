
package com.homehub.repository;

import com.homehub.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DeviceRepository extends JpaRepository<Device, UUID> {
    List<Device> findAllByUserId(UUID userId);
    List<Device> findAllByRoomId(UUID roomId);
    List<Device> findAllByUserIdAndRoomId(UUID userId, UUID roomId);
}
