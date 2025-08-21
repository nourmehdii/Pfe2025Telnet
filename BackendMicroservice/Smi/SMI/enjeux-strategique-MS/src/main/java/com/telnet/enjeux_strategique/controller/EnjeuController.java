package com.telnet.enjeux_strategique.controller;

import com.telnet.enjeux_strategique.dto.UpdateEnjeuRequest;
import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.model.EnjeuHistory;
import com.telnet.enjeux_strategique.repository.EnjeuHistoryRepository;
import com.telnet.enjeux_strategique.service.EnjeuService;
//import okhttp3.MediaType;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;


@RestController
@RequestMapping("/api/enjeux")
@CrossOrigin(origins = "*") // à sécuriser plus tard
public class EnjeuController {

    @Autowired
    private EnjeuService enjeuService;

    @Autowired
    private EnjeuHistoryRepository enjeuHistoryRepository;

//Créer un nouvel enjeu POST
    @PostMapping("/add")
    public Enjeu create(@RequestBody Enjeu enjeu) {

        return enjeuService.createEnjeu(enjeu);
    }

//Liste des enjeux GET
    @GetMapping
    public List<Enjeu> getAll() {
        return enjeuService.getAllEnjeux();
    }

//Obtenir un enjeu par son ID GET
    @GetMapping("/{id}")
    public Optional<Enjeu> getById(@PathVariable Long id) {
        return enjeuService.getEnjeuById(id);
    }

    //Supprimer un enjeu DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        enjeuService.deleteEnjeu(id);
    }


    //Modifier un enjeu existant PUT
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UpdateEnjeuRequest request) {
        try {
            Enjeu updated = enjeuService.updateEnjeu(id, request.getEnjeu(), request.getCommentaire());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();  // pour voir l'erreur dans la console
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Ajouter la méthode GET pour récupérer l'historique par enjeuId
@GetMapping("/{id}/history")
public List<EnjeuHistory> getHistoryByEnjeuId(@PathVariable Long id) {
    return enjeuHistoryRepository.findByEnjeuId(id);
}
//ia
@Value("${gemini.api.key}")
String apiKey;
    private static final String GEMINI_MODEL = "gemini-2.5-pro";
    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/"
            + GEMINI_MODEL + ":generateContent";
    @PostMapping("/ask")
    public ResponseEntity<?> chatWithGemini(@RequestBody Map<String, String> body) {
        String userMessage = body.get("message");
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Message is required");
        }

        try {
            // Prepare the request payload
            Map<String, Object> requestPayload = new HashMap<>();
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", userMessage);
            Map<String, Object> content = new HashMap<>();
            content.put("parts", Collections.singletonList(part));
            contents.add(content);
            requestPayload.put("contents", contents);

            // Build URL with API Key
            String url = UriComponentsBuilder.fromHttpUrl(GEMINI_URL)
                    .queryParam("key", apiKey)
                    .toUriString();

            // Prepare HTTP entity
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestPayload, headers);

            // Send request
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.exchange(
                    url, HttpMethod.POST, entity, Map.class);

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error calling Gemini API: " + e.getMessage());
        }

}

}


