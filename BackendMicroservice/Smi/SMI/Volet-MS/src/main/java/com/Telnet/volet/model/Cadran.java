package com.Telnet.volet.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Table(name = "cadrans")
@Entity
public class Cadran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Enumerated(EnumType.STRING)
    private EType type;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "volet_id")
    private Volet volet;

    private String secteur;
    private String contexte;
    private String processus;
    private String origineInfo;
    private String creePar;

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
    }

    public Cadran() {
    }

    public Cadran(@NotBlank String name, EType type, Volet volet) {
        this.name = name;
        this.type = type;
        this.volet = volet;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public EType getType() {
        return type;
    }

    public void setType(EType type) {
        this.type = type;
    }

    public Volet getVolet() {
        return volet;
    }

    public void setVolet(Volet volet) {
        this.volet = volet;
    }

    public String getSecteur() {
        return secteur;
    }

    public void setSecteur(String secteur) {
        this.secteur = secteur;
    }

    public String getContexte() {
        return contexte;
    }

    public void setContexte(String contexte) {
        this.contexte = contexte;
    }

    public String getProcessus() {
        return processus;
    }

    public void setProcessus(String processus) {
        this.processus = processus;
    }

    public String getOrigineInfo() {
        return origineInfo;
    }

    public void setOrigineInfo(String origineInfo) {
        this.origineInfo = origineInfo;
    }

    public String getCreePar() {
        return creePar;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

}
