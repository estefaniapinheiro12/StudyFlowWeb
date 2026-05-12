package com.studyflow.backend.controller;

import com.studyflow.backend.dto.EventoDTO;
import com.studyflow.backend.model.Evento;
import com.studyflow.backend.model.User;
import com.studyflow.backend.repository.EventoRepository;
import com.studyflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/eventos")
@RequiredArgsConstructor
public class EventoController {

    private final EventoRepository eventoRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<EventoDTO>> listar(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        List<EventoDTO> eventos = eventoRepository.findByUser(user)
            .stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(eventos);
    }

    @PostMapping
    public ResponseEntity<EventoDTO> criar(@RequestBody EventoDTO dto, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        Evento ev = new Evento();
        ev.setTitulo(dto.getTitulo());
        ev.setLocal(dto.getLocal());
        ev.setCategoria(dto.getCategoria());
        ev.setCor(dto.getCor());
        ev.setDiaSemana(dto.getDiaSemana());
        ev.setHoraInicio(dto.getHoraInicio());
        ev.setMinutoInicio(dto.getMinutoInicio());
        ev.setDuracaoMinutos(dto.getDuracaoMinutos());
        ev.setFixo(dto.isFixo());
        ev.setUser(user);
        return ResponseEntity.ok(toDTO(eventoRepository.save(ev)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoDTO> atualizar(@PathVariable String id, @RequestBody EventoDTO dto, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        Evento ev = eventoRepository.findById(id).orElseThrow();
        if (!ev.getUser().getId().equals(user.getId())) return ResponseEntity.status(403).build();
        ev.setTitulo(dto.getTitulo());
        ev.setLocal(dto.getLocal());
        ev.setCategoria(dto.getCategoria());
        ev.setCor(dto.getCor());
        ev.setDiaSemana(dto.getDiaSemana());
        ev.setHoraInicio(dto.getHoraInicio());
        ev.setMinutoInicio(dto.getMinutoInicio());
        ev.setDuracaoMinutos(dto.getDuracaoMinutos());
        return ResponseEntity.ok(toDTO(eventoRepository.save(ev)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        Evento ev = eventoRepository.findById(id).orElseThrow();
        if (!ev.getUser().getId().equals(user.getId())) return ResponseEntity.status(403).build();
        eventoRepository.delete(ev);
        return ResponseEntity.noContent().build();
    }

    private EventoDTO toDTO(Evento ev) {
        EventoDTO dto = new EventoDTO();
        dto.setId(ev.getId());
        dto.setTitulo(ev.getTitulo());
        dto.setLocal(ev.getLocal());
        dto.setCategoria(ev.getCategoria());
        dto.setCor(ev.getCor());
        dto.setDiaSemana(ev.getDiaSemana());
        dto.setHoraInicio(ev.getHoraInicio());
        dto.setMinutoInicio(ev.getMinutoInicio());
        dto.setDuracaoMinutos(ev.getDuracaoMinutos());
        dto.setFixo(ev.isFixo());
        return dto;
    }
}