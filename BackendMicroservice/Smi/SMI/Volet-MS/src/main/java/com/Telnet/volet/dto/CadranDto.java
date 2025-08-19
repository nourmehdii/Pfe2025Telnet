package com.Telnet.volet.dto;

public class CadranDto {
    private String name;
    private String type; // Exemple : "STRENGTH", "WEAKNESS", etc.
    private String processus;
    private String origineInfo;
    private String creePar;
    private Long voletId; // Référence au volet associé

    public CadranDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
    public Long getVoletId() {
        return voletId;
    }

    public void setVoletId(Long voletId) {
        this.voletId = voletId;
    }
}
