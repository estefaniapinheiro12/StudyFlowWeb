package com.studyflow.backend.repository;

import com.studyflow.backend.model.Evento;
import com.studyflow.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, String> {
    List<Evento> findByUser(User user);
}