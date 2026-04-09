package com.studyflow.backend.service;

import com.studyflow.backend.dto.LoginRequest;
import com.studyflow.backend.dto.RegisterRequest;
import com.studyflow.backend.model.User;
import com.studyflow.backend.repository.UserRepository;
import com.studyflow.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public void registrar(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(request.getEmail());
        user.setSenha(passwordEncoder.encode(request.getSenha()));
        userRepository.save(user);
    }

    public String login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
        );
        return jwtUtil.gerarToken(request.getEmail());
    }
}