package com.studyflow.backend.repository;

import com.studyflow.backend.model.Atividade;
import com.studyflow.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, String> {
    List<Atividade> findByUserOrderByPrazoAsc(User user);
}