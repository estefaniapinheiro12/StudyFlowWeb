package com.studyflow.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "eventos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String titulo;

    private String local;
    private String categoria;
    private String cor;

    @Column(nullable = false)
    private Integer diaSemana; // 0=Dom, 1=Seg... 6=Sab

    @Column(nullable = false)
    private Integer horaInicio;

    @Column(nullable = false)
    private Integer minutoInicio;

    @Column(nullable = false)
    private Integer duracaoMinutos;

    private boolean fixo = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}