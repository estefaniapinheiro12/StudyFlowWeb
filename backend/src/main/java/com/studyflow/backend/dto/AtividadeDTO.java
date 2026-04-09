package com.studyflow.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class AtividadeDTO {
    private String id;
    private String titulo;
    private String descricao;
    private String materia;
    private String tipo;
    private LocalDate prazo;
    private String prioridade;
    private boolean done;
    private String notes;
    private List<String> subtasks;
}