package com.telnet.enjeux_strategique.communication;

import com.telnet.enjeux_strategique.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "volet-service", configuration = FeignConfig.class)
public interface VoletClient {

    @GetMapping("/volet/api/volets")
    List<Object> getAllVolets(); // Remplace `Object` par ton modèle si tu l’as
}

