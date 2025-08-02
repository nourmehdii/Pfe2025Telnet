package com.telnet.enjeux_strategique.controller;

import com.telnet.enjeux_strategique.model.Risque;
import com.telnet.enjeux_strategique.service.RisqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risques")
@CrossOrigin("*")
public class RisqueController {

    @Autowired
    private RisqueService service;

    @GetMapping
    public List<Risque> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Risque save(@RequestBody Risque risque) {
        return service.save(risque);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

