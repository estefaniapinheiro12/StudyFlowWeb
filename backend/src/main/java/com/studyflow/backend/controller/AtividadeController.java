package com.studyflow.backend.controller;

import com.studyflow.backend.dto.AtividadeDTO;
import com.studyflow.backend.service.AtividadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atividades")
@RequiredArgsConstructor
public class AtividadeController {

    private final AtividadeService atividadeService;

    @GetMapping
    public ResponseEntity<List<AtividadeDTO>> listar() {
        return ResponseEntity.ok(atividadeService.listar());
    }

    @PostMapping
    public ResponseEntity<AtividadeDTO> criar(@RequestBody AtividadeDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(atividadeService.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AtividadeDTO> atualizar(@PathVariable String id, @RequestBody AtividadeDTO dto) {
        return ResponseEntity.ok(atividadeService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        atividadeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}