package com.Telnet.pip.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Table(name = "categories")
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "interaction", nullable = false)
    private Interaction interaction;

    public Category() {
        // Initialisation par défaut de interaction pour éviter null
        this.interaction = Interaction.FAR; // Valeur par défaut : Faible
    }

    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
        this.interaction = Interaction.FAR; // Valeur par défaut
    }

    public Category(@NotBlank String name) {
        this.name = name;
        this.interaction = Interaction.FAR; // Valeur par défaut
    }

    public Category(@NotBlank String name, Interaction interaction) {
        this.name = name;
        this.interaction = interaction;
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

    public Interaction getInteraction() {
        return interaction;
    }

    public void setInteraction(Interaction interaction) {
        this.interaction = interaction;
    }
}