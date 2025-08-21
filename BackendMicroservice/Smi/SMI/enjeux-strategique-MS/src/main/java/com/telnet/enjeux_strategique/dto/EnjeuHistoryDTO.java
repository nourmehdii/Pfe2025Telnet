package com.telnet.enjeux_strategique.dto;
 import lombok.Data;
 import java.util.List;

@Data
public class EnjeuHistoryDTO {

    private String description;                        // Nom de l'enjeu
    private String poids;                              // Poids de l'enjeu
    private List<Long> cadransSources;                 // IDs des cadrans sources
    private List<Long> attentesPartiesPrenantes;      // IDs des attentes des parties prenantes
    private String creePar;                            // Créé par
    private String dateCreation;                       // Optionnel : date de création
    private String dateModification;                  // Optionnel : date de modification
    private String commentaireDerniereModification;   // Optionnel : commentaire
}

