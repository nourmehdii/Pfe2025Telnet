package com.telnet.enjeux_strategique.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
@Data
@Entity
public class Enjeu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Long> cadransSources;

    @ElementCollection
    private List<Long> attentesPartiesPrenantes;

    private String description;

    @Enumerated(EnumType.STRING)
    private Poids poids;

    private String creePar;

    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    @OneToMany(mappedBy = "enjeu", cascade = CascadeType.ALL)
    private List<EnjeuHistory> historiqueModifications;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        this.dateModification = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateModification = LocalDateTime.now();
    }

    // Getters et setters par @Data
}
