package com.studyflow.backend.dto;

import lombok.Data;

@Data
public class PerfilDTO {
    private String id;
    private String nome;
    private String sobrenome;
    private String email;
    private String curso;
    private String instituicao;
    private String bio;
    private String foto;
}