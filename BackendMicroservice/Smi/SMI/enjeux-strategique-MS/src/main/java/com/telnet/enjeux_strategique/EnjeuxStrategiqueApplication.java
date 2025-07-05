package com.telnet.enjeux_strategique;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.telnet.enjeux_strategique.communication")
public class EnjeuxStrategiqueApplication {
	public static void main(String[] args) {
		SpringApplication.run(EnjeuxStrategiqueApplication.class, args);
	}
}
