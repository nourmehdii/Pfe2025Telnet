package com.telnet.enjeux_strategique.controller;

import com.telnet.enjeux_strategique.model.Risque;
import com.telnet.enjeux_strategique.service.RisqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risques")
@CrossOrigin("*")
public class RisqueController {

    @Autowired
    private RisqueService risqueService;

    @GetMapping
    public List<Risque> getAll() {
        return risqueService.getAll();
    }

    @PostMapping
    public Risque save(@RequestBody Risque risque) {
        return risqueService.save(risque);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        risqueService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Risque> updateRisque(@PathVariable Long id, @RequestBody Risque risque) {
        Risque updated = risqueService.update(id, risque);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

}

