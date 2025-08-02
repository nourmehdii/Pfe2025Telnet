package com.telnet.enjeux_strategique.service;


import com.telnet.enjeux_strategique.model.Opportunite;
import com.telnet.enjeux_strategique.repository.OpportuniteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpportuniteService {

    @Autowired
    private OpportuniteRepository repository;

    public List<Opportunite> getAll() {
        return repository.findAll();
    }

    public Opportunite save(Opportunite opportunite) {
        opportunite.setValeurOpportunite(opportunite.getProbabilite() * opportunite.getBeneficePotentiel());
        return repository.save(opportunite);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

