package com.telnet.enjeux_strategique.controller;

import com.telnet.enjeux_strategique.dto.UpdateEnjeuRequest;
import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.model.EnjeuHistory;
import com.telnet.enjeux_strategique.repository.EnjeuHistoryRepository;
import com.telnet.enjeux_strategique.service.EnjeuService;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enjeux")
@CrossOrigin(origins = "*") // à sécuriser plus tard
public class EnjeuController {

    @Autowired
    private EnjeuService enjeuService;

    @Autowired
    private EnjeuHistoryRepository enjeuHistoryRepository;

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
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UpdateEnjeuRequest request) {
        try {
            Enjeu updated = enjeuService.updateEnjeu(id, request.getEnjeu(), request.getCommentaire());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();  // pour voir l'erreur dans la console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }







    // Ajouter la méthode GET pour récupérer l'historique par enjeuId
@GetMapping("/{id}/history")
public List<EnjeuHistory> getHistoryByEnjeuId(@PathVariable Long id) {
    return enjeuHistoryRepository.findByEnjeuId(id);
}

}


