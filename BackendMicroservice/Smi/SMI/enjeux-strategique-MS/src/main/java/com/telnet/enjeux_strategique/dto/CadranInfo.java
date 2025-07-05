package com.telnet.enjeux_strategique.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CadranInfo {
    private Long id;
    private String name;
    private String type; // (Strength, Threat, etc.)
}



