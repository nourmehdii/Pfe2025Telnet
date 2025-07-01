package com.Telnet.pip.Controller;

import com.Telnet.pip.Service.PipService;
import com.Telnet.pip.model.Pip;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/pip")
@PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
public class PipController {

    private static final Logger logger = LoggerFactory.getLogger(PipController.class);

    @Autowired
    private PipService pipService;

    @GetMapping("/listpips")
    public String getListOfPips() {
        // Données JSON statiques
        String jsonData = "{\"pips\": [{\"id\": 1, \"name\": \"Pip1\"}, {\"id\": 2, \"name\": \"Pip2\"}]}";
        return jsonData;
    }

    @GetMapping("/list")
    public List<Pip> getPipList() {
        return pipService.getAllPips();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pip> getPipById(@PathVariable(value = "id") Long pipId) {
        Pip pip = pipService.getPipById(pipId)
                .orElseThrow(() -> new ResourceNotFoundException("Pip not found with id: " + pipId));
        return ResponseEntity.ok().body(pip);
    }

    @PostMapping("/add/category/{category_id}")
    public Pip createPip(@PathVariable(value = "category_id") Long categoryId, @Valid @RequestBody Pip pip)
            throws ResourceNotFoundException {
        return pipService.createPip(categoryId, pip);
    }

    @GetMapping("/byCategory/{categoryId}")
    public List<Pip> getPipsByCategory(@PathVariable Long categoryId) {
        return pipService.getPipsByCategory(categoryId);
    }

    @PutMapping("/{id}/{category_id}")
    public ResponseEntity<Pip> updatePip(
            @PathVariable(value = "id") Long pipId,
            @PathVariable(value = "category_id") Long categoryId,
            @Valid @RequestBody Pip pipDetails) throws ResourceNotFoundException {
        Pip updatedPip = pipService.updatePip(pipId, categoryId, pipDetails);
        return ResponseEntity.ok(updatedPip);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deletePip(@PathVariable(value = "id") Long pipId) throws ResourceNotFoundException {
        pipService.deletePip(pipId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
