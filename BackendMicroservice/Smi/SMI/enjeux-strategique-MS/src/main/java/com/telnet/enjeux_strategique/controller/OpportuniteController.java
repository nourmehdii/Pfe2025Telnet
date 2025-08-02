package com.telnet.enjeux_strategique.controller;


import com.telnet.enjeux_strategique.model.Opportunite;
import com.telnet.enjeux_strategique.service.OpportuniteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunites")
@CrossOrigin("*")
public class OpportuniteController {

    @Autowired
    private OpportuniteService service;

    @GetMapping
    public List<Opportunite> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Opportunite save(@RequestBody Opportunite opportunite) {
        return service.save(opportunite);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

