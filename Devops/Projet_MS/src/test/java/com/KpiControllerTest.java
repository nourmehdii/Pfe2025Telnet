package com;

import com.Telnet.projet.Controller.KpiController;
import com.Telnet.projet.Service.KpiHistoryService;
import com.Telnet.projet.Service.KpiService;
import com.Telnet.projet.models.Kpi;
import com.Telnet.projet.models.KpiHistory;
import com.Telnet.projet.models.KpiHistoryRequest;
import com.Telnet.projet.repository.KpiHistoryRepository;
import com.Telnet.projet.repository.kpiRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class KpiControllerTest {

    @Mock
    private kpiRepository kpiRepository;

    @Mock
    private KpiHistoryRepository kpiHistoryRepository;

    @Mock
    private KpiService kpiService;

    @Mock
    private KpiHistoryService kpiHistoryService;

    @InjectMocks
    private KpiController kpiController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getKpiList_shouldReturnListOfKpis() {
        Kpi kpi = new Kpi();
        when(kpiRepository.findAll()).thenReturn(Collections.singletonList(kpi));

        List<Kpi> kpiList = kpiController.getKpiList();

        assertNotNull(kpiList);
        assertEquals(1, kpiList.size());
        verify(kpiRepository, times(1)).findAll();
    }

    @Test
    void getKpiById_shouldReturnKpiWhenFound() {
        Kpi kpi = new Kpi();
        when(kpiService.getKpiById(1L)).thenReturn(kpi);

        ResponseEntity<Kpi> response = kpiController.getKpiById(1L);

        assertNotNull(response.getBody());
        assertEquals(kpi, response.getBody());
        verify(kpiService, times(1)).getKpiById(1L);
    }

    @Test
    void getKpiById_shouldReturnNotFoundWhenKpiDoesNotExist() {
        when(kpiService.getKpiById(1L)).thenReturn(null);

        ResponseEntity<Kpi> response = kpiController.getKpiById(1L);

        assertNull(response.getBody());
        assertEquals(404, response.getStatusCodeValue());
        verify(kpiService, times(1)).getKpiById(1L);
    }

    @Test
    void deleteKpi_shouldDeleteKpiWhenFound() {
        Kpi kpi = new Kpi();
        when(kpiRepository.findById(1L)).thenReturn(Optional.of(kpi));

        ResponseEntity<Void> response = kpiController.deleteKpi(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(kpiRepository, times(1)).delete(kpi);
    }

    @Test
    void deleteKpi_shouldReturnNotFoundWhenKpiDoesNotExist() {
        when(kpiRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Void> response = kpiController.deleteKpi(1L);

        assertEquals(404, response.getStatusCodeValue());
        verify(kpiRepository, times(0)).delete(any(Kpi.class));
    }

    @Test
    void updateKpi_shouldUpdateKpiWhenFound() {
        Kpi kpi = new Kpi();
        kpi.setName("Original Name");

        Kpi updatedKpi = new Kpi();
        updatedKpi.setName("Updated Name");

        when(kpiRepository.findById(1L)).thenReturn(Optional.of(kpi));
        when(kpiRepository.save(any(Kpi.class))).thenReturn(updatedKpi);

        ResponseEntity<Kpi> response = kpiController.updateKpi(1L, updatedKpi);

        assertNotNull(response.getBody());
        assertEquals("Updated Name", response.getBody().getName());
        verify(kpiRepository, times(1)).findById(1L);
        verify(kpiRepository, times(1)).save(any(Kpi.class));
    }

    @Test
    void updateKpi_shouldReturnNotFoundWhenKpiDoesNotExist() {
        Kpi updatedKpi = new Kpi();
        updatedKpi.setName("Updated Name");

        when(kpiRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Kpi> response = kpiController.updateKpi(1L, updatedKpi);

        assertNull(response.getBody());
        assertEquals(404, response.getStatusCodeValue());
        verify(kpiRepository, times(1)).findById(1L);
        verify(kpiRepository, times(0)).save(any(Kpi.class));
    }

    @Test
    void updateKpiHistory_shouldUpdateKpiHistoryWhenFound() {
        KpiHistory kpiHistory = new KpiHistory();
        kpiHistory.setStartDateP(LocalDate.now());

        KpiHistoryRequest request = new KpiHistoryRequest();
        request.setStartDateP(LocalDate.now().plusDays(1));
        request.setValue(10);

        when(kpiHistoryRepository.findById(1L)).thenReturn(Optional.of(kpiHistory));
        when(kpiHistoryRepository.save(any(KpiHistory.class))).thenReturn(kpiHistory);

        ResponseEntity<KpiHistory> response = kpiController.updateKpiHistory(1L, request);

        assertNotNull(response.getBody());
        assertEquals(10, response.getBody().getValue());
        verify(kpiHistoryRepository, times(1)).findById(1L);
        verify(kpiHistoryRepository, times(1)).save(any(KpiHistory.class));
    }

    @Test
    void updateKpiHistory_shouldReturnNotFoundWhenKpiHistoryDoesNotExist() {
        KpiHistoryRequest request = new KpiHistoryRequest();
        request.setStartDateP(LocalDate.now().plusDays(1));
        request.setValue(10);

        when(kpiHistoryRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<KpiHistory> response = kpiController.updateKpiHistory(1L, request);

        assertNull(response.getBody());
        assertEquals(404, response.getStatusCodeValue());
        verify(kpiHistoryRepository, times(1)).findById(1L);
        verify(kpiHistoryRepository, times(0)).save(any(KpiHistory.class));
    }

    // Add more tests for other endpoints and methods...
}
