package com.studyflow.backend.service;

import com.studyflow.backend.dto.AtividadeDTO;
import com.studyflow.backend.model.Atividade;
import com.studyflow.backend.model.User;
import com.studyflow.backend.repository.AtividadeRepository;
import com.studyflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AtividadeService {

    private final AtividadeRepository atividadeRepository;
    private final UserRepository userRepository;

    private User getUsuarioLogado() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public List<AtividadeDTO> listar() {
        User user = getUsuarioLogado();
        return atividadeRepository.findByUserOrderByPrazoAsc(user)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AtividadeDTO criar(AtividadeDTO dto) {
        User user = getUsuarioLogado();
        Atividade a = new Atividade();
        a.setTitulo(dto.getTitulo());
        a.setDescricao(dto.getDescricao());
        a.setMateria(dto.getMateria());
        a.setTipo(dto.getTipo());
        a.setPrazo(dto.getPrazo());
        a.setPrioridade(dto.getPrioridade());
        a.setDone(dto.isDone());
        a.setNotes(dto.getNotes());
        a.setSubtasks(dto.getSubtasks() != null ? dto.getSubtasks() : List.of());
        a.setUser(user);
        return toDTO(atividadeRepository.save(a));
    }

    public AtividadeDTO atualizar(String id, AtividadeDTO dto) {
        Atividade a = atividadeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atividade não encontrada"));
        a.setTitulo(dto.getTitulo());
        a.setDescricao(dto.getDescricao());
        a.setMateria(dto.getMateria());
        a.setTipo(dto.getTipo());
        a.setPrazo(dto.getPrazo());
        a.setPrioridade(dto.getPrioridade());
        a.setDone(dto.isDone());
        a.setNotes(dto.getNotes());
        a.setSubtasks(dto.getSubtasks() != null ? dto.getSubtasks() : List.of());
        return toDTO(atividadeRepository.save(a));
    }

    public void deletar(String id) {
        atividadeRepository.deleteById(id);
    }

    private AtividadeDTO toDTO(Atividade a) {
        AtividadeDTO dto = new AtividadeDTO();
        dto.setId(a.getId());
        dto.setTitulo(a.getTitulo());
        dto.setDescricao(a.getDescricao());
        dto.setMateria(a.getMateria());
        dto.setTipo(a.getTipo());
        dto.setPrazo(a.getPrazo());
        dto.setPrioridade(a.getPrioridade());
        dto.setDone(a.isDone());
        dto.setNotes(a.getNotes());
        dto.setSubtasks(a.getSubtasks());
        return dto;
    }
}