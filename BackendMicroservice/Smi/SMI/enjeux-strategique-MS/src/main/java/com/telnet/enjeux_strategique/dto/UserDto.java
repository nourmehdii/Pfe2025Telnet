package com.telnet.enjeux_strategique.dto;


import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class UserDto {
    private String username;
    private String password;
    private List<String> roles = new ArrayList<>(); // Always initialized

    // Getters and setters
}


