package com.Telnet.projet.Controller;

import com.Telnet.projet.Service.AnalyseService;
import com.Telnet.projet.models.Analyse;
import com.Telnet.projet.models.Cause;
import com.Telnet.projet.repository.AnalyseRepository;
import com.Telnet.projet.repository.CauseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/analyse")
public class AnalyseController {

    @Autowired
    private AnalyseService analyseService;

    @Autowired
    CauseRepository causeRepository;

    @Autowired
    AnalyseRepository analyseRepository;

    @GetMapping("/analysesp/{projectId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Analyse>> getAnalysesForProject(@PathVariable Long projectId) {
        List<Analyse> analyses = analyseService.getAnalysesForProject(projectId);
        return ResponseEntity.ok().body(analyses);
    }

    @GetMapping("/analyseslist/kpis/{kpiId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Analyse>> getAnalysesForKpi(@PathVariable Long kpiId) {
        List<Analyse> analyses = analyseService.getAnalysesForKpi(kpiId);
        return ResponseEntity.ok().body(analyses);
    }

    @PostMapping("/projets/{projectId}/analyses")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Analyse> ajouterAnalyseCausale(
            @PathVariable Long projectId,
            @RequestBody Analyse analyseRequest) {
        Analyse savedAnalyse = analyseService.ajouterAnalyseCausale(projectId, analyseRequest);
        return new ResponseEntity<>(savedAnalyse, HttpStatus.CREATED);
    }

    @GetMapping("/analyses/{analyseId}/causes")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Cause>> getCausesForAnalyse(@PathVariable Long analyseId) {
        List<Cause> causes = analyseService.getCausesForAnalyse(analyseId);
        return ResponseEntity.ok().body(causes);
    }

    @GetMapping("/analyses/{analyseId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> getAnalyseById(@PathVariable Long analyseId) {
        Analyse analyse = analyseService.getAnalyseById(analyseId);
        if (analyse != null) {
            return ResponseEntity.ok(analyse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/analyses/{analyseId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Analyse> modifierAnalyseCausale(@PathVariable Long analyseId, @Valid @RequestBody Analyse analyseRequest) {
        Analyse updatedAnalyse = analyseService.modifierAnalyseCausale(analyseId, analyseRequest);
        return ResponseEntity.ok().body(updatedAnalyse);
    }

    @DeleteMapping("/analyses/{analyseId}")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<?> deleteAnalyseCausale(@PathVariable Long analyseId) {
        try {
            analyseService.deleteAnalyseCausale(analyseId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/kpis/{kpiId}/analyses")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Analyse> ajouterAnalyseByKpiId(
            @PathVariable Long kpiId,
            @RequestBody Analyse analyseRequest) {
        Analyse savedAnalyse = analyseService.ajouterAnalyseByKpiId(kpiId, analyseRequest);
        return new ResponseEntity<>(savedAnalyse, HttpStatus.CREATED);
    }

    @GetMapping("/analyselist")
    @PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<List<Analyse>> getAllAnalyses() {
        List<Analyse> analyses = analyseService.getAllAnalyses();
        return ResponseEntity.ok().body(analyses);
    }

    @GetMapping("/a")
    public String sayHello() {
        return "Bonjour";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/cause/{id}")
    public ResponseEntity<Cause> updateCause(@PathVariable Long id, @RequestBody Cause updatedCause) {
        // Vérifie si la cause existante est présente dans la base de données
        Optional<Cause> existingCauseOptional = causeRepository.findById(id);
        if (existingCauseOptional.isPresent()) {
            Cause existingCause = existingCauseOptional.get();

            // Assurez-vous que seule la Cause est mise à jour, pas l'Analyse
            existingCause.setNomCause(updatedCause.getNomCause());
            existingCause.setPourcentage(updatedCause.getPourcentage());
            // N'ajoutez pas de code pour mettre à jour l'Analyse ici

            Cause savedCause = causeRepository.save(existingCause);
            return ResponseEntity.ok(savedCause);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/cause/{id}")
    public ResponseEntity<Void> deleteCause(@PathVariable Long id) {
        Optional<Cause> cause = causeRepository.findById(id);
        if (cause.isPresent()) {
            causeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/analysesp/count/{projectId}")
    //@PreAuthorize("hasAuthority('ROLE_RESPONSABLEQUALITE') or hasAuthority('ROLE_CHEFDEPROJET')")
    public ResponseEntity<Long> countAnalysesForProject(@PathVariable Long projectId) {
        long count = analyseRepository.countByProjectId(projectId);
        return ResponseEntity.ok().body(count);
    }


}
