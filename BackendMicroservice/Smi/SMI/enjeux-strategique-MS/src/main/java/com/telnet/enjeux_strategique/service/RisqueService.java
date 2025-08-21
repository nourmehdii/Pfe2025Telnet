package com.telnet.enjeux_strategique.service;

import com.telnet.enjeux_strategique.model.Risque;
import com.telnet.enjeux_strategique.repository.RisqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RisqueService {

    @Autowired
    private RisqueRepository repository;

    public List<Risque> getAll() {
        return repository.findAll();
    }

    public Risque save(Risque risque) {
        risque.setEvaluationRisque(risque.getImpact() * risque.getProbabilite());
        return repository.save(risque);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Risque update(Long id, Risque risque) {
        Risque existing = repository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setEnjeu(risque.getEnjeu());
        existing.setProbabilite(risque.getProbabilite());
        existing.setImpact(risque.getImpact());
        existing.setEvaluationRisque(risque.getImpact() * risque.getProbabilite());
        existing.setActeurResponsable(risque.getActeurResponsable());
        existing.setDateSuivi(risque.getDateSuivi());
        existing.setDescriptionRisque(risque.getDescriptionRisque());
        existing.setCategorie(risque.getCategorie());
        existing.setPlanAction(risque.getPlanAction());
        existing.setStatut(risque.getStatut());
        existing.setSeverite(risque.getSeverite());

        return repository.save(existing);
    }

}

