package com.telnet.enjeux_strategique.controller;

import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.service.EnjeuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enjeux")
@CrossOrigin(origins = "*") // à sécuriser plus tard
public class EnjeuController {

    @Autowired
    private EnjeuService enjeuService;

//Créer un nouvel enjeu POST
    @PostMapping
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
    public Enjeu update(@PathVariable Long id, @RequestBody Enjeu enjeu) {
        return enjeuService.updateEnjeu(id, enjeu);
    }
}

