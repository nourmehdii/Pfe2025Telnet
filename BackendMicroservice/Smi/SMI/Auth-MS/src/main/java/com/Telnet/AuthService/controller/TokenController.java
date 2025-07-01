package com.Telnet.AuthService.controller;

import com.Telnet.AuthService.model.Token;
import com.Telnet.AuthService.model.User;
import com.Telnet.AuthService.service.TokenService;
import com.Telnet.AuthService.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@RestController
@RequestMapping("/tokens")
public class TokenController {

    private static final Logger logger = LoggerFactory.getLogger(TokenController.class);

    private final TokenService tokenService;
    private final JwtService jwtService;

    @Autowired
    public TokenController(TokenService tokenService, JwtService jwtService) {
        this.tokenService = tokenService;
        this.jwtService = jwtService;
    }

    @GetMapping("/{token}")
    public ResponseEntity<Token> getTokenByValue(@PathVariable String token) {
        return tokenService.getTokenByValue(token);
    }

    @PutMapping("/update")
    public ResponseEntity<Token> updateTokenStatus(@RequestBody Token token) {
        return tokenService.updateTokenStatus(token);
    }

    @GetMapping("/user/{token}")
    public ResponseEntity<User> getUserByToken(@PathVariable("token") String tokenValue) {
        return tokenService.getUserByToken(tokenValue);
    }

    @GetMapping("/validate/{token}")
    public ResponseEntity<Boolean> checkTokenValidity(@PathVariable String token, @RequestParam("user") String userEmail) {
        return tokenService.checkTokenValidity(token, userEmail);
    }

    @GetMapping("/extractUsername/{token}")
    public String extractUsername(@PathVariable String token) {
        return jwtService.extractUsername(token);
    }

    @GetMapping("/loadUserByUsername/{email}")
    public UserDetails loadUserByUsername(@PathVariable String email) {
        return tokenService.loadUserByUsername(email);
    }

    @GetMapping("/getAuthorities/{email}")
    public ResponseEntity<Collection<? extends GrantedAuthority>> getAuthorities(@PathVariable String email) {
        return tokenService.getAuthorities(email);
    }

    @GetMapping("/userDetails")
    public ResponseEntity<UserDetails> getUserDetailsFromToken(@RequestParam("token") String token) {
        return tokenService.getUserDetailsFromToken(token);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        tokenService.logout(request, response);
    }
}
