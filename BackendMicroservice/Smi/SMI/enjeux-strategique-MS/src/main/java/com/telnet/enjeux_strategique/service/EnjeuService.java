package com.telnet.enjeux_strategique.service;

import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.repository.EnjeuHistoryRepository;
import com.telnet.enjeux_strategique.repository.EnjeuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telnet.enjeux_strategique.model.EnjeuHistory;

import java.util.List;
import java.util.Optional;

@Service
public class EnjeuService {

    @Autowired
    private EnjeuRepository enjeuRepository;

    @Autowired
    private EnjeuHistoryRepository enjeuHistoryRepository;


    public Enjeu createEnjeu(Enjeu enjeu) {
        return enjeuRepository.save(enjeu);
    }

    public List<Enjeu> getAllEnjeux() {
        return enjeuRepository.findAllWithHistorique();
    }
    public Optional<Enjeu> getEnjeuById(Long id) {
        return enjeuRepository.findById(id);
    }

    public void deleteEnjeu(Long id) {
        enjeuRepository.deleteById(id);
    }

    public Enjeu updateEnjeu(Long id, Enjeu updatedEnjeu, String commentaire) {
        Optional<Enjeu> existingOpt = enjeuRepository.findById(id);
        if (existingOpt.isPresent()) {
            Enjeu existingEnjeu = existingOpt.get();

            // ✅ Si les listes sont nulles, on garde les anciennes
            if (updatedEnjeu.getCadransSources() == null) {
                updatedEnjeu.setCadransSources(existingEnjeu.getCadransSources());
            }
            if (updatedEnjeu.getAttentesPartiesPrenantes() == null) {
                updatedEnjeu.setAttentesPartiesPrenantes(existingEnjeu.getAttentesPartiesPrenantes());
            }

            try {
                String etatAvant = existingEnjeu.toString();
                String etatApres = updatedEnjeu.toString();

                // ✅ Vérifie s’il y a une réelle modification
                if (!etatAvant.equals(etatApres)) {
                    EnjeuHistory history = new EnjeuHistory();
                    history.setEnjeu(existingEnjeu);
                    history.setCommentaire(commentaire != null ? commentaire : "Modification de l’enjeu");
                    history.setEtatAvant(etatAvant);
                    history.setEtatApres(etatApres);

                    enjeuHistoryRepository.save(history);
                }
            } catch (Exception e) {
                e.printStackTrace(); // 🔺 À sécuriser plus tard
            }

            updatedEnjeu.setId(id); // ✅ Préserve l’ID
            updatedEnjeu.setDateCreation(existingEnjeu.getDateCreation());
            return enjeuRepository.save(updatedEnjeu);
        } else {
            throw new RuntimeException("Enjeu non trouvé avec ID : " + id);
        }
    }




}



