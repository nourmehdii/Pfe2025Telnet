package com.telnet.enjeux_strategique.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.telnet.enjeux_strategique.model.Enjeu;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Opportunite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int probabilite;
    private int beneficePotentiel;
    private float valeurOpportunite;

    private String descriptionOpportunite;
    private String acteurResponsable;

    @Column(length = 1000)
    private String actionRecommandee;

    private LocalDate dateSuivi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enjeu_id")
    @JsonIgnoreProperties("opportunites")
    private Enjeu enjeu;
}
