package com.telnet.enjeux_strategique.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telnet.enjeux_strategique.model.Enjeu;
import com.telnet.enjeux_strategique.model.EnjeuHistory;
import com.telnet.enjeux_strategique.repository.EnjeuHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnjeuHistoryService {

    @Autowired
    private EnjeuHistoryRepository historyRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public void enregistrerHistorique(Enjeu ancien, Enjeu nouveau, String commentaire) {
        try {
            EnjeuHistory historique = new EnjeuHistory();
            historique.setEnjeu(nouveau); // lien vers l'enjeu actuel
            historique.setCommentaire(commentaire);
            /*historique.setEtatAvant(objectMapper.writeValueAsString(ancien));
            historique.setEtatApres(objectMapper.writeValueAsString(nouveau));*/

            historyRepository.save(historique);
        } catch (Exception e) {
            System.err.println("Erreur lors de la journalisation d'historique : " + e.getMessage());
        }
    }
}
