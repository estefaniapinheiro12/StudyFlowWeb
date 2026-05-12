package com.studyflow.backend.dto;

import lombok.Data;

@Data
public class EventoDTO {
    private String id;
    private String titulo;
    private String local;
    private String categoria;
    private String cor;
    private Integer diaSemana;
    private Integer horaInicio;
    private Integer minutoInicio;
    private Integer duracaoMinutos;
    private boolean fixo;
}