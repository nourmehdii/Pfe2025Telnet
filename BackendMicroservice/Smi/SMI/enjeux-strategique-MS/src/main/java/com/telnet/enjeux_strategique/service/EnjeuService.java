package com.telnet.enjeux_strategique.service;

import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.repository.EnjeuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnjeuService {

    @Autowired
    private EnjeuRepository enjeuRepository;

    public Enjeu createEnjeu(Enjeu enjeu) {
        return enjeuRepository.save(enjeu);
    }

    public List<Enjeu> getAllEnjeux() {
        return enjeuRepository.findAll();
    }

    public Optional<Enjeu> getEnjeuById(Long id) {
        return enjeuRepository.findById(id);
    }

    public void deleteEnjeu(Long id) {
        enjeuRepository.deleteById(id);
    }

    public Enjeu updateEnjeu(Long id, Enjeu updatedEnjeu) {
        updatedEnjeu.setId(id);
        return enjeuRepository.save(updatedEnjeu);
    }
}
