package com.telnet.enjeux_strategique.communication;

import com.telnet.enjeux_strategique.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "pip-service", configuration = FeignConfig.class)
public interface PipClient {

    @GetMapping("/pip/api/pips")
    List<Object> getAllPips(); // Idem, remplace par ton vrai modèle si besoin
}

