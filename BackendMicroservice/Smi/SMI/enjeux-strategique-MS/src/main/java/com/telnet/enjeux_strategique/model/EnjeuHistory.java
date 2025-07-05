package com.telnet.enjeux_strategique.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
@Data
@Entity
public class EnjeuHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Enjeu enjeu;

    private String commentaire; // Exemple : "Ajout d'un nouveau cadran SWOT"

    private LocalDateTime dateModification;

    @Lob
    private String etatAvant;

    @Lob
    private String etatApres;

    @PrePersist
    protected void onCreate() {
        this.dateModification = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateModification = LocalDateTime.now();
    }

    // Getters/setters par @Data
}
