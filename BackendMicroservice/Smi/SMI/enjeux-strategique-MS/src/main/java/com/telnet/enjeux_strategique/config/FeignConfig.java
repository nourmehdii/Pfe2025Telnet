package com.telnet.enjeux_strategique.config;

import feign.Logger;
import feign.Request;
import feign.RequestInterceptor;
import org.apache.http.impl.client.CloseableHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@LoadBalancerClient(name = "auth-service")
public class FeignConfig {

    @Autowired
    private JwtRequestInterceptor jwtRequestInterceptor;

    private final CloseableHttpClient httpClient;

    @Autowired
    public FeignConfig(CloseableHttpClient httpClient) {
        this.httpClient = httpClient;
    }

    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL; // Journalisation complète
    }

    @Bean
    public Request.Options requestOptions() {
        return new Request.Options(5000, 30000); // Connexion & read timeout
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return jwtRequestInterceptor;
    }

    @Bean
    public CloseableHttpClient feignHttpClient() {
        return httpClient;
    }
}

