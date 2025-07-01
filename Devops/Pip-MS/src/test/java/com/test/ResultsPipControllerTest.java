package com.test;

import com.Telnet.pip.Controller.ResultsPipController;
import com.Telnet.pip.Service.ResultsPipService;
import com.Telnet.pip.Service.PipService;
import com.Telnet.pip.model.Pip;
import com.Telnet.pip.model.Processus;
import com.Telnet.pip.model.ResultsPip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ResultsPipControllerTest {

    @InjectMocks
    private ResultsPipController resultsPipController;

    @Mock
    private ResultsPipService resultsPipService;

    @Mock
    private PipService pipService;

    private ResultsPip resultsPip;
    private Pip pip;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        pip = new Pip(1L, "TestPip", null, "Type", "Interaction"); // Utilisation du constructeur de Pip avec les paramètres appropriés
        resultsPip = new ResultsPip(1L, "TestExpectation", "TestRisk", "TestExistantMonitoring", "TestSetupMonitoring", pip, null); // Utilisation du constructeur complet de ResultsPip
    }

    @Test
    void testGetResultsPipList() {
        List<ResultsPip> resultsPipList = Arrays.asList(resultsPip);

        when(resultsPipService.getAllResultsPip()).thenReturn(resultsPipList);

        List<ResultsPip> result = resultsPipController.getResultsPipList();
        assertEquals(1, result.size());
        verify(resultsPipService, times(1)).getAllResultsPip();
    }

    @Test
    void testGetResultsPipById() {
        when(resultsPipService.getResultsPipById(1L)).thenReturn(Optional.of(resultsPip));

        ResponseEntity<ResultsPip> response = resultsPipController.getResultsPipById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(resultsPip, response.getBody());
    }

    @Test
    void testGetResultsPipByIdNotFound() {
        when(resultsPipService.getResultsPipById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            resultsPipController.getResultsPipById(1L);
        });
    }

    @Test
    void testCreateResultsPip() {
        when(resultsPipService.createResultsPip(resultsPip)).thenReturn(resultsPip);

        ResultsPip result = resultsPipController.createResultsPip(resultsPip);
        assertEquals(resultsPip, result);
    }

    @Test
    void testCreateResultsPipWithPip() {
        when(pipService.getPipById(1L)).thenReturn(Optional.of(pip));
        when(resultsPipService.createResultsPip(resultsPip)).thenReturn(resultsPip);

        ResultsPip result = resultsPipController.createResultsPipWithPip(1L, resultsPip);
        assertEquals(resultsPip, result);
    }

    @Test
    void testCreateResultsPipWithPipNotFound() {
        when(pipService.getPipById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            resultsPipController.createResultsPipWithPip(1L, resultsPip);
        });
    }

    @Test
    void testUpdateResultsPip() {
        when(resultsPipService.updateResultsPip(1L, 1L, resultsPip)).thenReturn(resultsPip);

        ResponseEntity<ResultsPip> response = resultsPipController.updateResultsPip(1L, 1L, resultsPip);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(resultsPip, response.getBody());
    }

    @Test
    void testDeleteResultsPip() {
        resultsPipController.deleteResultsPip(1L);
        verify(resultsPipService, times(1)).deleteResultsPip(1L);
    }
}
