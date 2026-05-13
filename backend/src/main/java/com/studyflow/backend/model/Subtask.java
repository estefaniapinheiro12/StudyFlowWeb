package com.studyflow.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subtask {
    private String texto;
    private boolean done = false;
}