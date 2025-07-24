package com.telnet.enjeux_strategique.dto;

import com.telnet.enjeux_strategique.model.Enjeu;

public class UpdateEnjeuRequest {

    private Enjeu enjeu;
    private String commentaire;

    public Enjeu getEnjeu() {
        return enjeu;
    }

    public void setEnjeu(Enjeu enjeu) {
        this.enjeu = enjeu;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
}
