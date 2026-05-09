package com.studyflow.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
public class IAController {

    @Value("${gemini.api.key}")
    private String geminiKey;

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Map<String, Object> body) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Monta o prompt completo com system + messages
            String system = (String) body.getOrDefault("system", "");
            List<Map<String, Object>> messages = (List<Map<String, Object>>) body.get("messages");

            // Constrói o texto completo para o Gemini
            StringBuilder fullPrompt = new StringBuilder();
            fullPrompt.append(system).append("\n\n");
            for (Map<String, Object> msg : messages) {
                String role = (String) msg.get("role");
                String content = (String) msg.get("content");
                if ("user".equals(role)) {
                    fullPrompt.append("Usuário: ").append(content).append("\n");
                } else if ("assistant".equals(role)) {
                    fullPrompt.append("Assistente: ").append(content).append("\n");
                }
            }
            fullPrompt.append("Assistente:");

            // Monta o body do Gemini
            Map<String, Object> geminiBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", fullPrompt.toString())
                    ))
                ),
                "generationConfig", Map.of(
                    "maxOutputTokens", 1000,
                    "temperature", 0.7
                )
            );

         String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + geminiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(geminiBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            // Extrai o texto da resposta do Gemini
            Map responseBody = response.getBody();
            List candidates = (List) responseBody.get("candidates");
            Map firstCandidate = (Map) candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List parts = (List) content.get("parts");
            Map firstPart = (Map) parts.get(0);
            String text = (String) firstPart.get("text");

            // Retorna no formato que o frontend espera
            return ResponseEntity.ok(Map.of(
                "content", List.of(Map.of("text", text))
            ));

        } catch (Exception e) {
            System.err.println("ERRO IA: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}