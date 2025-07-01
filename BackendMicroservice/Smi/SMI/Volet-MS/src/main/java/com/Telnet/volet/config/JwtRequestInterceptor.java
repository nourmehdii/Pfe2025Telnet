package com.Telnet.volet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import feign.RequestInterceptor;
import feign.RequestTemplate;

@Component
public class JwtRequestInterceptor implements RequestInterceptor {


    @Override
    public void apply(RequestTemplate template) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getCredentials() instanceof String) {
            String jwtToken = (String) authentication.getCredentials();
            template.header("Authorization", "Bearer " + jwtToken);
        }
    }
}



