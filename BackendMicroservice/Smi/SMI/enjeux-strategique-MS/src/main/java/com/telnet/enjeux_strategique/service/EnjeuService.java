package com.telnet.enjeux_strategique.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.telnet.enjeux_strategique.dto.EnjeuHistoryDTO;
import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.repository.EnjeuHistoryRepository;
import com.telnet.enjeux_strategique.repository.EnjeuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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


    private ObjectMapper mapper = new ObjectMapper();


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

  /*  public Enjeu updateEnjeu(Long id, Enjeu updatedEnjeu, String commentaire) {
        Optional<Enjeu> existingOpt = enjeuRepository.findById(id);
        if (existingOpt.isPresent()) {
            Enjeu existingEnjeu = existingOpt.get();

            if (updatedEnjeu.getCadransSources() == null) {
                updatedEnjeu.setCadransSources(existingEnjeu.getCadransSources());
            }
            if (updatedEnjeu.getAttentesPartiesPrenantes() == null) {
                updatedEnjeu.setAttentesPartiesPrenantes(existingEnjeu.getAttentesPartiesPrenantes());
            }

            try {
                String etatAvant = convertToJson(existingEnjeu);
                String etatApres = convertToJson(updatedEnjeu);


                if (!etatAvant.equals(etatApres)) {
                    EnjeuHistory history = new EnjeuHistory();
                    history.setEnjeu(existingEnjeu);
                    history.setCommentaire(commentaire != null ? commentaire : "Modification de l’enjeu");
                    history.setEtatAvant(etatAvant);
                    history.setEtatApres(etatApres);

                    enjeuHistoryRepository.save(history);
                }
            } catch (JsonProcessingException e) {
                    throw new RuntimeException("Erreur lors de la conversion JSON pour l’historique d’Enjeu", e);
            }

            updatedEnjeu.setId(id);
            updatedEnjeu.setDateCreation(existingEnjeu.getDateCreation());
            return enjeuRepository.save(updatedEnjeu);
        } else {
            throw new RuntimeException("Enjeu non trouvé avec ID : " + id);
        }
    } */



   /* private String convertToJson(Enjeu enjeu) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        EnjeuHistoryDTO dto = new EnjeuHistoryDTO();
        dto.setCadransSources(enjeu.getCadransSources());
        dto.setAttentesPartiesPrenantes(enjeu.getAttentesPartiesPrenantes());
        dto.setDescription(enjeu.getDescription());
        dto.setPoids(enjeu.getPoids());

        return mapper.writeValueAsString(dto);
    } }*/


   /* public Enjeu updateEnjeu(Long id, Enjeu updatedEnjeu, String commentaire) {
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
                e.printStackTrace();// 🔺 À sécuriser plus tard
                throw new RuntimeException("Erreur mise à jour enjeu : " + e.getMessage(), e);
            }

            // 🔹 Mise à jour de l'objet existant au lieu de sauvegarder updatedEnjeu directement
            existingEnjeu.setDescription(updatedEnjeu.getDescription());
            existingEnjeu.setPoids(updatedEnjeu.getPoids());
            existingEnjeu.setCreePar(updatedEnjeu.getCreePar());
            existingEnjeu.setCadransSources(updatedEnjeu.getCadransSources());
            existingEnjeu.setAttentesPartiesPrenantes(updatedEnjeu.getAttentesPartiesPrenantes());

            return enjeuRepository.save(existingEnjeu);
        } else {
            throw new RuntimeException("Enjeu non trouvé avec ID : " + id);
        }
    }*/
   public Enjeu updateEnjeu(Long id, Enjeu updatedEnjeu, String commentaire) {
       Optional<Enjeu> existingOpt = enjeuRepository.findById(id);
       if (existingOpt.isEmpty()) {
           throw new RuntimeException("Enjeu non trouvé avec ID : " + id);
       }

       Enjeu existingEnjeu = existingOpt.get();

       try {
           // -------------------
           // 🔹 Capturer l’état avant modification
           // -------------------
           String etatAvant = convertToJson(existingEnjeu);

           // -------------------
           // 🔹 Appliquer les modifications
           // -------------------
           if (updatedEnjeu.getCadransSources() != null) {
               existingEnjeu.getCadransSources().clear();
               existingEnjeu.getCadransSources().addAll(updatedEnjeu.getCadransSources());
           }

           if (updatedEnjeu.getAttentesPartiesPrenantes() != null) {
               existingEnjeu.getAttentesPartiesPrenantes().clear();
               existingEnjeu.getAttentesPartiesPrenantes().addAll(updatedEnjeu.getAttentesPartiesPrenantes());
           }

           existingEnjeu.setDescription(updatedEnjeu.getDescription());
           existingEnjeu.setPoids(updatedEnjeu.getPoids());
           existingEnjeu.setCreePar(updatedEnjeu.getCreePar());

           // -------------------
           // 🔹 Capturer l’état après modification
           // -------------------
           String etatApres = convertToJson(existingEnjeu);

           // -------------------
           // 🔹 Historique
           // -------------------
           if (!etatAvant.equals(etatApres)) {
               EnjeuHistory history = new EnjeuHistory();
               history.setEnjeu(existingEnjeu);
               history.setCommentaire(commentaire != null ? commentaire : "Modification de l’enjeu");
               history.setEtatAvant(etatAvant);
               history.setEtatApres(etatApres);
               enjeuHistoryRepository.save(history);
           }

       } catch (JsonProcessingException e) {
           throw new RuntimeException("Erreur lors de la conversion JSON pour l’historique d’Enjeu", e);
       }

       // -------------------
       // 🔹 Sauvegarde finale
       // -------------------
       return enjeuRepository.save(existingEnjeu);
   }

    private String convertToJson(Enjeu enjeu) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        EnjeuHistoryDTO dto = new EnjeuHistoryDTO();
        dto.setCadransSources(enjeu.getCadransSources());
        dto.setAttentesPartiesPrenantes(enjeu.getAttentesPartiesPrenantes());
        dto.setDescription(enjeu.getDescription());
        dto.setPoids(String.valueOf(enjeu.getPoids()));

        return mapper.writeValueAsString(dto);
    }

}








