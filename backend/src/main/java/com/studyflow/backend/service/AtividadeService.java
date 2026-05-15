package com.studyflow.backend.service;

import com.studyflow.backend.dto.AtividadeDTO;
import com.studyflow.backend.model.Atividade;
import com.studyflow.backend.model.Subtask;
import com.studyflow.backend.model.User;
import com.studyflow.backend.repository.AtividadeRepository;
import com.studyflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Comparator;

import java.time.LocalDate;
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
        preencherAtividade(a, dto);
        a.setUser(user);
        return toDTO(atividadeRepository.save(a));
    }

    public AtividadeDTO atualizar(String id, AtividadeDTO dto) {
        Atividade a = atividadeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atividade não encontrada"));
        preencherAtividade(a, dto);
        return toDTO(atividadeRepository.save(a));
    }

    public void deletar(String id) {
        atividadeRepository.deleteById(id);
    }

    private void preencherAtividade(Atividade a, AtividadeDTO dto) {
        a.setTitulo(dto.getTitulo());
        a.setDescricao(dto.getDescricao());
        a.setMateria(dto.getMateria());
        a.setTipo(dto.getTipo());
        a.setPrazo(dto.getPrazo());
        a.setPrioridade(dto.getPrioridade());
        a.setNotes(dto.getNotes());
        a.setSubtasks(dto.getSubtasks() != null
                ? dto.getSubtasks().stream()
                        .map(s -> new Subtask(s.getTexto(), s.isDone()))
                        .collect(Collectors.toList())
                : List.of());

        if (dto.isDone() && !a.isDone()) {
            a.setCompletedAt(LocalDate.now());
        } else if (!dto.isDone()) {
            a.setCompletedAt(null);
        }
        a.setDone(dto.isDone());
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
        dto.setSubtasks(a.getSubtasks() != null
                ? a.getSubtasks().stream()
                        .map(s -> {
                            AtividadeDTO.SubtaskDTO sub = new AtividadeDTO.SubtaskDTO();
                            sub.setTexto(s.getTexto());
                            sub.setDone(s.isDone());
                            return sub;
                        })
                        .collect(Collectors.toList())
                : List.of());
        return dto;
    }

    public int calcularStreak() {
        User user = getUsuarioLogado();
        List<LocalDate> dias = atividadeRepository.findByUserOrderByPrazoAsc(user)
                .stream()
                .filter(a -> a.getCompletedAt() != null)
                .map(Atividade::getCompletedAt)
                .distinct()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        if (dias.isEmpty())
            return 0;

        int streak = 0;
        LocalDate esperado = LocalDate.now();

        for (LocalDate dia : dias) {
            if (dia.equals(esperado) || dia.equals(esperado.minusDays(1))) {
                streak++;
                esperado = dia.minusDays(1);
            } else {
                break;
            }
        }
        return streak;
    }
}