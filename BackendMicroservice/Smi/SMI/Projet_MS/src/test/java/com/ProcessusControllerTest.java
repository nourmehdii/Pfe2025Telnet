package com;

import com.Telnet.projet.Controller.ProcessusController;
import com.Telnet.projet.models.Kpi;
import com.Telnet.projet.models.Processus;
import com.Telnet.projet.repository.ProcessusRepository;
import com.Telnet.projet.repository.kpiRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ProcessusControllerTest {

    @Mock
    private ProcessusRepository processusRepository;

    @Mock
    private kpiRepository kpiRepository;

    @InjectMocks
    private ProcessusController processusController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }




    @Test
    void updateProcessus_Success() throws ResourceNotFoundException {
        // Setup
        Long processusId = 1L;
        Processus existingProcessus = new Processus();
        existingProcessus.setId(processusId);
        Processus updatedDetails = new Processus();
        updatedDetails.setName("Updated Name");
        updatedDetails.setDescription("Updated Description");

        // Mock behavior
        when(processusRepository.findById(processusId)).thenReturn(Optional.of(existingProcessus));
        when(processusRepository.save(any(Processus.class))).thenReturn(existingProcessus);

        // Execute
        ResponseEntity<Processus> responseEntity = processusController.updateProcessus(processusId, updatedDetails);

        // Verify
        assertNotNull(responseEntity);
        assertEquals("Updated Name", existingProcessus.getName());
        assertEquals("Updated Description", existingProcessus.getDescription());
        verify(processusRepository, times(1)).findById(processusId);
        verify(processusRepository, times(1)).save(existingProcessus);
    }

    @Test
    void updateProcessus_NotFound() {
        // Setup
        Long processusId = 1L;
        Processus updatedDetails = new Processus();

        // Mock behavior
        when(processusRepository.findById(processusId)).thenReturn(Optional.empty());

        // Execute & Verify
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            processusController.updateProcessus(processusId, updatedDetails);
        });
        assertEquals("Processus not found :: " + processusId, exception.getMessage());
        verify(processusRepository, times(1)).findById(processusId);
        verify(processusRepository, times(0)).save(any(Processus.class));
    }

    @Test
    void deleteProcessus_Success() {
        // Setup
        Long processusId = 1L;
        Processus existingProcessus = new Processus();
        existingProcessus.setId(processusId);

        // Mock behavior
        when(processusRepository.findById(processusId)).thenReturn(Optional.of(existingProcessus));

        // Execute
        ResponseEntity<?> responseEntity = processusController.deleteProcessus(processusId);

        // Verify
        assertNotNull(responseEntity);
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(processusRepository, times(1)).findById(processusId);
        verify(processusRepository, times(1)).delete(existingProcessus);
    }

    @Test
    void deleteProcessus_NotFound() {
        // Setup
        Long processusId = 1L;

        // Mock behavior
        when(processusRepository.findById(processusId)).thenReturn(Optional.empty());

        // Execute
        ResponseEntity<?> responseEntity = processusController.deleteProcessus(processusId);

        // Verify
        assertNotNull(responseEntity);
        assertEquals(404, responseEntity.getStatusCodeValue());
        verify(processusRepository, times(1)).findById(processusId);
        verify(processusRepository, times(0)).delete(any(Processus.class));
    }

    @Test
    void getProcessusById_Success() throws ResourceNotFoundException {
        // Setup
        Long processusId = 1L;
        Processus processus = new Processus();
        processus.setId(processusId);

        // Mock behavior
        when(processusRepository.findById(processusId)).thenReturn(Optional.of(processus));

        // Execute
        ResponseEntity<Processus> responseEntity = processusController.getProcessusById(processusId);

        // Verify
        assertNotNull(responseEntity);
        assertEquals(processus, responseEntity.getBody());
        verify(processusRepository, times(1)).findById(processusId);
    }

    @Test
    void getProcessusById_NotFound() {
        // Setup
        Long processusId = 1L;

        // Mock behavior
        when(processusRepository.findById(processusId)).thenReturn(Optional.empty());

        // Execute & Verify
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            processusController.getProcessusById(processusId);
        });
        assertEquals("Processus not found ::" + processusId, exception.getMessage());
        verify(processusRepository, times(1)).findById(processusId);
    }
}
