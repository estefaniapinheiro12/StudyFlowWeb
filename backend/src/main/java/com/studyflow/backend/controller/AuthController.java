package com.studyflow.backend.controller;

import com.studyflow.backend.dto.LoginRequest;
import com.studyflow.backend.dto.RegisterRequest;
import com.studyflow.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Usuário criado com sucesso!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}