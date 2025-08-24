package com.telnet.enjeux_strategique.service;


import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.model.Opportunite;
import com.telnet.enjeux_strategique.repository.OpportuniteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OpportuniteService {

    @Autowired
    private OpportuniteRepository repository;

    public List<Opportunite> getAll() {
        return repository.findAll();
    }

    public Optional<Opportunite> getOppById(Long id) {
        return repository.findById(id);
    }


    public Opportunite save(Opportunite opportunite) {
        opportunite.setValeurOpportunite(opportunite.getProbabilite() * opportunite.getBeneficePotentiel());
        return repository.save(opportunite);
    }
    public Opportunite update(Long id, Opportunite opportunite) {
        Opportunite existing = repository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setEnjeu(opportunite.getEnjeu());
        existing.setProbabilite(opportunite.getProbabilite());
        existing.setBeneficePotentiel(opportunite.getBeneficePotentiel());
        existing.setValeurOpportunite(opportunite.getProbabilite() * opportunite.getBeneficePotentiel());
        existing.setActeurResponsable(opportunite.getActeurResponsable());
        existing.setDateSuivi(opportunite.getDateSuivi());
        existing.setDescriptionOpportunite(opportunite.getDescriptionOpportunite());
        existing.setActionRecommandee(opportunite.getActionRecommandee());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

