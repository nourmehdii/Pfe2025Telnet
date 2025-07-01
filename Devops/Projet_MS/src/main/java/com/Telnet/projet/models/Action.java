package com.Telnet.projet.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Table(name = "action")
@Entity
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Spécifiez que c'est un type d'énumération
    private String typeAction;
    private String responsable;
    private Date datePlanification;
    private Date dateRealisation;
    private String critereEfficacite;
    private boolean efficace;
    private String commentaire;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public Cause getCause() {
        return cause;
    }

    public void setCause(Cause cause) {
        this.cause = cause;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cause_id")
    private Cause cause;

    public Action() {}

    public Action(String typeAction, String responsable, Date datePlanification, Date dateRealisation,
                  String critereEfficacite, boolean efficace, String commentaire) {
        this.typeAction = typeAction;
        this.responsable = responsable;
        this.datePlanification = datePlanification;
        this.dateRealisation = dateRealisation;
        this.critereEfficacite = critereEfficacite;
        this.efficace = efficace;
        this.commentaire = commentaire;
    }

    public String getTypeAction() {
        return typeAction;
    }

    public void setTypeAction(String typeAction) {
        this.typeAction = typeAction;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public Date getDatePlanification() {
        return datePlanification;
    }

    public void setDatePlanification(Date datePlanification) {
        this.datePlanification = datePlanification;
    }

    public Date getDateRealisation() {
        return dateRealisation;
    }

    public void setDateRealisation(Date dateRealisation) {
        this.dateRealisation = dateRealisation;
    }

    public String getCritereEfficacite() {
        return critereEfficacite;
    }

    public void setCritereEfficacite(String critereEfficacite) {
        this.critereEfficacite = critereEfficacite;
    }

    public boolean isEfficace() {
        return efficace;
    }

    public void setEfficace(boolean efficace) {
        this.efficace = efficace;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }


}