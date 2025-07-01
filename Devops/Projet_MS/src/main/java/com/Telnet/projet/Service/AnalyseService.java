package com.Telnet.projet.Service;


import com.Telnet.projet.models.Analyse;
import com.Telnet.projet.models.Cause;
import com.Telnet.projet.models.Kpi;
import com.Telnet.projet.models.Project;
import com.Telnet.projet.repository.AnalyseRepository;
import com.Telnet.projet.repository.ClientRepository;
import com.Telnet.projet.repository.ProjectRepository;
import com.Telnet.projet.repository.kpiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@Service
public class AnalyseService {

    @Autowired
    private AnalyseRepository analyseRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ClientRepository clientRepository;
   @Autowired
   private kpiRepository kpiRepository;
    public List<Analyse> getAnalysesForProject(Long projectId) {
        return analyseRepository.findByProjectId(projectId);
    }

    public List<Analyse> getAnalysesForKpi(Long kpiId) {
        Kpi kpi = kpiRepository.findById(kpiId)
                .orElseThrow(() -> new EntityNotFoundException("KPI not found"));
        return analyseRepository.findByKpi(kpi);
    }

    public Analyse ajouterAnalyseCausale(Long projectId, Analyse analyseRequest) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("Project not found"));
        if (project == null) {
            throw new EntityNotFoundException("Project not found with ID: " + projectId);
        }
        Analyse analyse = new Analyse(project, analyseRequest.getTypeProbleme(),
                analyseRequest.getIdentificationProbleme(),
                analyseRequest.getMethodeUtilisee());
        analyse.setDate(new Date());
        List<Cause> causes = analyseRequest.getCauses();
        for (Cause cause : causes) {
            cause.setAnalyse(analyse);
        }
        analyse.setCauses(causes);
        return analyseRepository.save(analyse);
    }


    public List<Cause> getCausesForAnalyse(Long analyseId) {
        Analyse analyse = analyseRepository.findById(analyseId)
                .orElseThrow(() -> new EntityNotFoundException("Analyse not found"));
        return analyse.getCauses();
    }

    public Analyse getAnalyseById(Long analyseId) {
        return analyseRepository.findById(analyseId)
                .orElse(null);
    }

    public Analyse modifierAnalyseCausale(Long analyseId, Analyse analyseRequest) {
        Analyse analyse = analyseRepository.findById(analyseId)
                .orElseThrow(() -> new EntityNotFoundException("Analyse not found"));
        analyse.setTypeProbleme(analyseRequest.getTypeProbleme());
        analyse.setIdentificationProbleme(analyseRequest.getIdentificationProbleme());
        analyse.setMethodeUtilisee(analyseRequest.getMethodeUtilisee());
        analyse.setDate(new Date());
        List<Cause> causes = analyseRequest.getCauses();
        for (Cause cause : causes) {
            cause.setAnalyse(analyse);
        }
        analyse.setCauses(causes);
        return analyseRepository.save(analyse);
    }

    public void deleteAnalyseCausale(Long analyseId) {
        if (!analyseRepository.existsById(analyseId)) {
            throw new EntityNotFoundException("Analyse not found");
        }
        analyseRepository.deleteById(analyseId);
    }

    public Analyse ajouterAnalyseByKpiId(Long kpiId, Analyse analyseRequest) {
        Kpi kpi = kpiRepository.findById(kpiId)
                .orElseThrow(() -> new EntityNotFoundException("KPI not found"));
        if (kpi != null) {
            Analyse analyse = new Analyse();
            analyse.setProject(null);
            analyse.setTypeProbleme(analyseRequest.getTypeProbleme());
            analyse.setIdentificationProbleme(analyseRequest.getIdentificationProbleme());
            analyse.setMethodeUtilisee(analyseRequest.getMethodeUtilisee());
            analyse.setDate(new Date());
            analyse.setKpi(kpi);
            List<Cause> causes = analyseRequest.getCauses();
            for (Cause cause : causes) {
                cause.setAnalyse(analyse);
            }
            analyse.setCauses(causes);
            return analyseRepository.save(analyse);
        } else {
            throw new EntityNotFoundException("KPI not found");
        }
    }


    public AnalyseService(AnalyseRepository analyseRepository) {
        this.analyseRepository = analyseRepository;
    }

    public void saveAnalyse(Analyse analyse) {
        analyseRepository.save(analyse);
    }

    public List<Analyse> getAllAnalyses() {
        return analyseRepository.findAll();
    }
}
