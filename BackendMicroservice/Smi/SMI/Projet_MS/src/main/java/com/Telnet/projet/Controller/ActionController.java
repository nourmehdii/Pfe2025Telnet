package com.Telnet.projet.Controller;

import com.Telnet.projet.Service.ActionService;
import com.Telnet.projet.models.Action;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/action")
@CrossOrigin("*")
public class ActionController {

    @Autowired
    private ActionService actionService;

    @PostMapping("/planifier/{causeId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> planifierAction(@PathVariable Long causeId, @RequestBody Action action) {
        try {
            Action newAction = actionService.planifierAction(causeId, action);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Action planifiée avec succès");
            return ResponseEntity.status(HttpStatus.CREATED).body(newAction);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erreur lors de la planification de l'action: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/details/{actionId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> getActionById(@PathVariable Long actionId) {
        try {
            Action action = actionService.getActionById(actionId);
            return ResponseEntity.ok(action);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erreur lors de la récupération de l'action: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/cause/{causeId}/actions")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> getActionsByCauseId(@PathVariable Long causeId) {
        try {
            List<Action> actions = actionService.getActionsByCauseId(causeId);
            if (actions.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Aucune action associée à cette cause");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
            }
            return ResponseEntity.ok(actions);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erreur lors de la récupération des actions pour cette cause: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/modifier/{actionId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> modifierAction(@PathVariable Long actionId, @RequestBody Action actionDetails) {
        try {
            Action updatedAction = actionService.modifierAction(actionId, actionDetails);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Action modifiée avec succès");
            return ResponseEntity.ok(updatedAction);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erreur lors de la modification de l'action: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/supprimer/{actionId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> supprimerAction(@PathVariable Long actionId) {
        try {
            actionService.supprimerAction(actionId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Action supprimée avec succès");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erreur lors de la suppression de l'action: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
