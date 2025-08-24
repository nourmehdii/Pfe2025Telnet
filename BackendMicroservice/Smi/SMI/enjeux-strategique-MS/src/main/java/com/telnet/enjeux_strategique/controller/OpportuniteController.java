package com.telnet.enjeux_strategique.controller;


import com.telnet.enjeux_strategique.model.Opportunite;
import com.telnet.enjeux_strategique.service.OpportuniteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunites")
@CrossOrigin("*")
public class OpportuniteController {

    @Autowired
    private OpportuniteService opportuniteService;

    @GetMapping
    public List<Opportunite> getAll() {
        return opportuniteService.getAll();
    }

    @PostMapping
    public Opportunite save(@RequestBody Opportunite opportunite) {
        return opportuniteService.save(opportunite);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
       opportuniteService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Opportunite> updateOpportunite(@PathVariable Long id, @RequestBody Opportunite opportunite) {
        Opportunite updated = opportuniteService.update(id, opportunite);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Obtenir une opportunité par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Opportunite> getOpportuniteById(@PathVariable Long id) {
        return opportuniteService.getOppById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}

