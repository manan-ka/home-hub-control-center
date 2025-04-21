
package com.homehub.web.controller;

import com.homehub.service.AuthService;
import com.homehub.web.dto.AuthRequestDto;
import com.homehub.web.dto.AuthResponseDto;
import com.homehub.web.dto.RegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
