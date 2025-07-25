package com.Telnet.volet.Controller;

import com.Telnet.volet.Service.CadranService;
import com.Telnet.volet.dto.CadranDto;
import com.Telnet.volet.model.Cadran;
import com.Telnet.volet.model.EType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cadran")
public class CadranController {

    @Autowired
    private CadranService cadranService;

    @PostMapping("/new")
    public ResponseEntity<?> createCadran(@RequestBody CadranDto dto) {
        try {
            Cadran newCadran = cadranService.createCadran(dto);
            return ResponseEntity.ok().body(newCadran);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Type invalide. Utilisez : STRENGTH, WEAKNESS, OPPORTUNITY, THREAT.");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Erreur lors de la création du cadran : " + ex.getMessage());
        }
    }

    @GetMapping("/list")
    public List<Cadran> getCadranList() {
        return cadranService.getAllCadrans();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Cadran> getCadranById(@PathVariable(value = "id") Long cadranId) {
        Cadran cadran = cadranService.getCadranById(cadranId);
        return ResponseEntity.ok().body(cadran);
    }

    @GetMapping("/list/{axe}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Cadran> getCadranListByAxeVolet(@PathVariable(value = "axe") String axe) {
        return cadranService.getCadransByAxe(axe);
    }

    @GetMapping("/list/strength")
    public List<Cadran> getCadranListByTypeS() {
        return cadranService.getCadransByType(EType.STRENGTH);
    }

    @GetMapping("/list/weakness")
    public List<Cadran> getCadranListByTypeW() {
        return cadranService.getCadransByType(EType.WEAKNESS);
    }

    @GetMapping("/list/opportunity")
    public List<Cadran> getCadranListByTypeO() {
        return cadranService.getCadransByType(EType.OPPORTUNITY);
    }

    @GetMapping("/list/threat")
    public List<Cadran> getCadranListByTypeT() {
        return cadranService.getCadransByType(EType.THREAT);
    }
Gg
    // ✅ Nouvelle méthode PUT avec DTO
    @PutMapping("/{id}")
    public ResponseEntity<Cadran> updateCadran(@PathVariable(value = "id") Long cadranId, @RequestBody CadranDto cadranDto) {
        Cadran result = cadranService.updateCadran(cadranId, cadranDto);
        return ResponseEntity.ok(result);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Map<String, Boolean> deleteCadran(@PathVariable(value = "id") Long cadranId) {
        cadranService.deleteCadran(cadranId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Cadran successfully deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/volet/{voletId}/cadrans")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Cadran>> getCadransByVoletId(@PathVariable(value = "voletId") Long voletId) {
        List<Cadran> cadrans = cadranService.getCadransByVoletId(voletId);
        return ResponseEntity.ok(cadrans);
    }

    @GetMapping("/statistiques")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Long>> getStatisticsByType() {
        Map<String, Long> statistics = new HashMap<>();
        statistics.put("forceCount", cadranService.countByType(EType.STRENGTH));
        statistics.put("faiblesseCount", cadranService.countByType(EType.WEAKNESS));
        statistics.put("opportuniteCount", cadranService.countByType(EType.OPPORTUNITY));
        statistics.put("menaceCount", cadranService.countByType(EType.THREAT));
        return ResponseEntity.ok(statistics);
    }
}
