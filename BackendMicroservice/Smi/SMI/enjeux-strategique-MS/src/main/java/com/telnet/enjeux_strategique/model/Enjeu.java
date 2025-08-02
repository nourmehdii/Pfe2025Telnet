package com.telnet.enjeux_strategique.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.ToString;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
@ToString(exclude = "historiqueModifications")
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

    //unused inutile
    @Column(name = "commentaire_derniere_modification")
    private String commentaireDerniereModification;


    @OneToMany(mappedBy = "enjeu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("enjeu")
    private List<EnjeuHistory> historiqueModifications;



    // 🔽 Relations vers risques et opportunités
    @OneToMany(mappedBy = "enjeu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("enjeu")
    private List<Risque> risques;

    @OneToMany(mappedBy = "enjeu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("enjeu")
    private List<Opportunite> opportunites;




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
