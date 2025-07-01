package com.Telnet.pip.Controller;

import com.Telnet.pip.Service.PipService;
import com.Telnet.pip.Service.ResultsPipService;
import com.Telnet.pip.model.ResultsPip;

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
@RequestMapping("/api/resultspip")
@PreAuthorize("hasAnyAuthority('ROLE_CHEFDEPROJET', 'ROLE_RESPONSABLEQUALITE')")
public class ResultsPipController {

    @Autowired
    private ResultsPipService resultsPipService;

    @Autowired
    private PipService pipService;

    @GetMapping("/list")
    public List<ResultsPip> getResultsPipList() {
        return resultsPipService.getAllResultsPip();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultsPip> getResultsPipById(@PathVariable(value = "id") Long resultspipId)
            throws ResourceNotFoundException {
        ResultsPip resultspip = resultsPipService.getResultsPipById(resultspipId)
                .orElseThrow(() -> new ResourceNotFoundException("ResultsPip not found: " + resultspipId));
        return ResponseEntity.ok().body(resultspip);
    }

    @PostMapping("/add")
    public ResultsPip createResultsPip(@Valid @RequestBody ResultsPip resultspip) {
        return resultsPipService.createResultsPip(resultspip);
    }

    @PostMapping("add/{pip_id}")
    public ResultsPip createResultsPipWithPip(@PathVariable(value = "pip_id") Long pipId,
                                              @Valid @RequestBody ResultsPip resultspip)
            throws ResourceNotFoundException {
        return pipService.getPipById(pipId).map(pip -> {
            resultspip.setPip(pip);
            return resultsPipService.createResultsPip(resultspip);
        }).orElseThrow(() -> new ResourceNotFoundException("PIP not found"));
    }

    @PutMapping("/{id}/{pip_id}")
    public ResponseEntity<ResultsPip> updateResultsPip(
            @PathVariable(value = "id") Long resultspipId,
            @PathVariable(value = "pip_id") Long pipId,
            @Valid @RequestBody ResultsPip resultspipDetails) throws ResourceNotFoundException {
        ResultsPip updatedResultsPip = resultsPipService.updateResultsPip(resultspipId, pipId, resultspipDetails);
        return ResponseEntity.ok(updatedResultsPip);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteResultsPip(
            @PathVariable(value = "id") Long resultspipId) throws ResourceNotFoundException {
        resultsPipService.deleteResultsPip(resultspipId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Results PIP successfully deleted", Boolean.TRUE);
        return response;
    }
}
