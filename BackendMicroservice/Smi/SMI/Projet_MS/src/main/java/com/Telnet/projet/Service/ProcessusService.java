package com.Telnet.projet.Service;

import com.Telnet.projet.models.Kpi;
import com.Telnet.projet.models.Processus;
import com.Telnet.projet.repository.ProcessusRepository;
import com.Telnet.projet.repository.kpiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProcessusService {

    @Autowired
    private ProcessusRepository processusRepository;

    @Autowired
    private kpiRepository kpiRepository;

    public List<Processus> getAllProcessus() {
        return processusRepository.findAll();
    }

    public Processus createProcessus(Processus processus) {
        return processusRepository.save(processus);
    }

    public ResponseEntity<Processus> updateProcessus(Long processusId, Processus processusDetails) {
        Processus processus = processusRepository.findById(processusId)
                .orElseThrow(() -> new ResourceNotFoundException("Processus not found :: " + processusId));

        processus.setName(processusDetails.getName());
        processus.setDescription(processusDetails.getDescription());
        processus.setKpis(processusDetails.getKpis());

        final Processus updatedProcessus = processusRepository.save(processus);
        return ResponseEntity.ok(updatedProcessus);
    }

    public Processus createProcessusWithKpis(Processus processus) {
        Set<Kpi> kpis = processus.getKpis();
        Set<Kpi> associatedKpis = new HashSet<>();

        if (kpis != null && !kpis.isEmpty()) {
            for (Kpi kpi : kpis) {
                Kpi existingKpi = kpiRepository.findById(kpi.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("KPI not found with ID: " + kpi.getId()));
                associatedKpis.add(existingKpi);
            }
        }

        processus.setKpis(associatedKpis);
        return processusRepository.save(processus);
    }

    public ResponseEntity<?> deleteProcessus(Long id) {
        Optional<Processus> processusOptional = processusRepository.findById(id);
        if (!processusOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Processus processus = processusOptional.get();
        processus.getKpis().clear();
        processusRepository.delete(processus);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Processus> getProcessusById(Long processusId) {
        Processus processus = processusRepository.findById(processusId)
                .orElseThrow(() -> new ResourceNotFoundException("Processus not found ::" + processusId));
        return ResponseEntity.ok().body(processus);
    }
}
