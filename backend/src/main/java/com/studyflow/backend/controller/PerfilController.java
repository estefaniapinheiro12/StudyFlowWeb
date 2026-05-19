package com.studyflow.backend.controller;

import com.studyflow.backend.dto.PerfilDTO;
import com.studyflow.backend.model.User;
import com.studyflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/perfil")
@RequiredArgsConstructor
public class PerfilController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<PerfilDTO> getPerfil(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        return ResponseEntity.ok(toDTO(user));
    }

    @PutMapping
    public ResponseEntity<PerfilDTO> updatePerfil(@RequestBody PerfilDTO dto, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        if (dto.getNome() != null)
            user.setNome(dto.getNome());
        if (dto.getSobrenome() != null)
            user.setSobrenome(dto.getSobrenome());
        if (dto.getCurso() != null)
            user.setCurso(dto.getCurso());
        if (dto.getInstituicao() != null)
            user.setInstituicao(dto.getInstituicao());
        if (dto.getBio() != null)
            user.setBio(dto.getBio());
        if (dto.getFoto() != null)
            user.setFoto(dto.getFoto());
        return ResponseEntity.ok(toDTO(userRepository.save(user)));
    }

    @PutMapping("/senha")
    public ResponseEntity<?> updateSenha(@RequestBody Map<String, String> body, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        String senhaAtual = body.get("senhaAtual");
        String novaSenha = body.get("novaSenha");
        if (!passwordEncoder.matches(senhaAtual, user.getSenha())) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Senha atual incorreta"));
        }
        if (novaSenha == null || novaSenha.length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Nova senha deve ter pelo menos 8 caracteres"));
        }
        user.setSenha(passwordEncoder.encode(novaSenha));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("mensagem", "Senha alterada com sucesso!"));
    }

    @PutMapping("/email")
    public ResponseEntity<?> updateEmail(@RequestBody Map<String, String> body, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        String novoEmail = body.get("novoEmail");
        if (novoEmail == null || !novoEmail.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("erro", "E-mail inválido"));
        }
        if (userRepository.findByEmail(novoEmail).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "E-mail já cadastrado"));
        }
        user.setEmail(novoEmail);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("mensagem", "E-mail alterado com sucesso!"));
    }

    private PerfilDTO toDTO(User user) {
        PerfilDTO dto = new PerfilDTO();
        dto.setId(user.getId());
        dto.setNome(user.getNome());
        dto.setSobrenome(user.getSobrenome());
        dto.setEmail(user.getEmail());
        dto.setCurso(user.getCurso());
        dto.setInstituicao(user.getInstituicao());
        dto.setBio(user.getBio());
        dto.setFoto(user.getFoto());
        return dto;
    }
}