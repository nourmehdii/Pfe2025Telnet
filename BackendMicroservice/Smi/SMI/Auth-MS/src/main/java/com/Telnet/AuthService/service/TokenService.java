package com.Telnet.AuthService.service;

import com.Telnet.AuthService.config.CustomLogoutHandler;
import com.Telnet.AuthService.model.Token;
import com.Telnet.AuthService.model.User;
import com.Telnet.AuthService.repository.TokenRepository;
import com.Telnet.AuthService.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.Optional;

@Service
public class TokenService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    private final JwtService jwtService;
    private final UserDetailsServiceImp userDetailsService;
    private final TokenRepository tokenRepository;
    private final CustomLogoutHandler customLogoutHandler;
    private final UserRepository userRepository;

    @Autowired
    public TokenService(JwtService jwtService, UserDetailsServiceImp userDetailsService,
                        TokenRepository tokenRepository, CustomLogoutHandler customLogoutHandler,
                        UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.tokenRepository = tokenRepository;
        this.customLogoutHandler = customLogoutHandler;
        this.userRepository = userRepository;
    }

    public ResponseEntity<Token> getTokenByValue(String token) {
        logger.info("Fetching token by value: {}", token);
        try {
            Optional<Token> tokenObject = tokenRepository.findByToken(token);
            if (tokenObject.isPresent()) {
                logger.info("Token found: {}", tokenObject.get());
                return ResponseEntity.ok(tokenObject.get());
            } else {
                logger.warn("Token not found: {}", token);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error fetching token by value: {}", token, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Token> updateTokenStatus(Token token) {
        logger.info("Updating token status: {}", token);
        try {
            Token updatedToken = tokenRepository.save(token);
            logger.info("Token updated successfully: {}", updatedToken);
            return ResponseEntity.ok(updatedToken);
        } catch (Exception e) {
            logger.error("Error updating token: {}", token, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<User> getUserByToken(String tokenValue) {
        logger.info("Fetching user by token: {}", tokenValue);
        try {
            Optional<Token> tokenObject = tokenRepository.findByToken(tokenValue);
            return tokenObject.map(tokenEntity -> {
                logger.info("User found: {}", tokenEntity.getUser());
                return ResponseEntity.ok(tokenEntity.getUser());
            }).orElseGet(() -> {
                logger.warn("User not found for token: {}", tokenValue);
                return ResponseEntity.notFound().build();
            });
        } catch (Exception e) {
            logger.error("Error fetching user by token: {}", tokenValue, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Boolean> checkTokenValidity(String token, String userEmail) {
        logger.info("Validating token: {}", token);
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            boolean isValid = jwtService.isValid(token, userDetails);
            return ResponseEntity.ok(isValid);
        } catch (UsernameNotFoundException e) {
            logger.error("User not found with email: {}", userEmail, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (Exception e) {
            logger.error("Error validating token: {}", token, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    public UserDetails loadUserByUsername(String email) {
        logger.info("Loading user by username: {}", email);
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            logger.info("User found: {}", userDetails.getUsername());
            return userDetails;
        } catch (Exception e) {
            logger.error("Error loading user by username: {}", email, e);
            return null;
        }
    }

    public ResponseEntity<Collection<? extends GrantedAuthority>> getAuthorities(String email) {
        logger.info("Getting authorities for user: {}", email);
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            Collection<? extends GrantedAuthority> authorities = userDetailsService.getAuthorities(user);
            return ResponseEntity.ok(authorities);
        } catch (UsernameNotFoundException e) {
            logger.error("User not found with email: {}", email, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            logger.error("Error getting authorities for user: {}", email, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<UserDetails> getUserDetailsFromToken(String token) {
        logger.info("Fetching user details from token: {}", token);
        try {
            String username = jwtService.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return ResponseEntity.ok(userDetails);
        } catch (Exception e) {
            logger.error("Error fetching user details for token: {}", token, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Logging out");
        customLogoutHandler.logout(request, response, null);
    }
}
