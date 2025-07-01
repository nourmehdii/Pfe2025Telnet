package com;

import com.Telnet.projet.Controller.AnalyseController;
import com.Telnet.projet.Service.AnalyseService;
import com.Telnet.projet.models.Analyse;
import com.Telnet.projet.models.TypeProbleme;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AnalyseControllerTest {

    @Mock
    private AnalyseService analyseService;

    @InjectMocks
    private AnalyseController analyseController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }




}
