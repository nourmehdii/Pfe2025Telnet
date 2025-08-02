package com.telnet.enjeux_strategique.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.telnet.enjeux_strategique.model.Enjeu;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Risque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int probabilite;
    private int impact;
    private float evaluationRisque;

    private String descriptionRisque;
    private String origine;
    private String categorie;

    private String acteurResponsable;

    @Column(length = 1000)
    private String planAction;

    private LocalDate dateSuivi;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    private String severite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enjeu_id")
    @JsonIgnoreProperties("risques")
    private Enjeu enjeu;
}
