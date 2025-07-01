package test;

import com.Telnet.volet.Controller.CadranController;
import com.Telnet.volet.Service.CadranService;
import com.Telnet.volet.dto.CadranDto;
import com.Telnet.volet.model.Cadran;
import com.Telnet.volet.model.EType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CadranControllerTest {

    @Mock
    private CadranService cadranService;

    @InjectMocks
    private CadranController cadranController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCadran_shouldCreateCadran() {
        CadranDto dto = new CadranDto();
        Cadran expected = new Cadran();

        when(cadranService.createCadran(any(CadranDto.class))).thenReturn(expected);

        ResponseEntity<?> response = cadranController.createCadran(dto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(expected, response.getBody());
        verify(cadranService, times(1)).createCadran(any(CadranDto.class));
    }

    @Test
    void getCadranList_shouldReturnListOfCadrans() {
        Cadran cadran = new Cadran();
        when(cadranService.getAllCadrans()).thenReturn(Collections.singletonList(cadran));

        List<Cadran> cadranList = cadranController.getCadranList();

        assertNotNull(cadranList);
        assertEquals(1, cadranList.size());
        verify(cadranService, times(1)).getAllCadrans();
    }

    @Test
    void getCadranById_shouldReturnCadranWhenFound() {
        Cadran cadran = new Cadran();
        when(cadranService.getCadranById(1L)).thenReturn(cadran);

        ResponseEntity<Cadran> response = cadranController.getCadranById(1L);

        assertNotNull(response.getBody());
        assertEquals(cadran, response.getBody());
        verify(cadranService, times(1)).getCadranById(1L);
    }

    @Test
    void updateCadran_shouldUpdateCadran() {
        CadranDto dto = new CadranDto();
        Cadran updatedCadran = new Cadran();
        updatedCadran.setName("Updated");

        when(cadranService.updateCadran(eq(1L), any(CadranDto.class))).thenReturn(updatedCadran);

        ResponseEntity<Cadran> response = cadranController.updateCadran(1L, dto);

        assertNotNull(response.getBody());
        assertEquals("Updated", response.getBody().getName());
        verify(cadranService, times(1)).updateCadran(eq(1L), any(CadranDto.class));
    }

    @Test
    void getCadranListByAxeVolet_shouldReturnList() {
        Cadran cadran = new Cadran();
        when(cadranService.getCadransByAxe("axe")).thenReturn(Collections.singletonList(cadran));

        List<Cadran> list = cadranController.getCadranListByAxeVolet("axe");

        assertNotNull(list);
        assertEquals(1, list.size());
        verify(cadranService, times(1)).getCadransByAxe("axe");
    }

    @Test
    void getCadranListByTypeS_shouldReturnList() {
        Cadran cadran = new Cadran();
        when(cadranService.getCadransByType(EType.STRENGTH)).thenReturn(Collections.singletonList(cadran));

        List<Cadran> list = cadranController.getCadranListByTypeS();

        assertNotNull(list);
        assertEquals(1, list.size());
        verify(cadranService, times(1)).getCadransByType(EType.STRENGTH);
    }

    @Test
    void getStatisticsByType_shouldReturnCounts() {
        when(cadranService.countByType(EType.STRENGTH)).thenReturn(5L);
        when(cadranService.countByType(EType.WEAKNESS)).thenReturn(3L);
        when(cadranService.countByType(EType.OPPORTUNITY)).thenReturn(2L);
        when(cadranService.countByType(EType.THREAT)).thenReturn(4L);

        ResponseEntity<Map<String, Long>> response = cadranController.getStatisticsByType();

        assertEquals(200, response.getStatusCodeValue());
        Map<String, Long> stats = response.getBody();
        assertNotNull(stats);
        assertEquals(5L, stats.get("forceCount"));
        assertEquals(3L, stats.get("faiblesseCount"));
        assertEquals(2L, stats.get("opportuniteCount"));
        assertEquals(4L, stats.get("menaceCount"));
    }

    @Test
    void getCadransByVoletId_shouldReturnList() {
        List<Cadran> expected = Arrays.asList(new Cadran());
        when(cadranService.getCadransByVoletId(1L)).thenReturn(expected);

        ResponseEntity<List<Cadran>> response = cadranController.getCadransByVoletId(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(expected, response.getBody());
        verify(cadranService, times(1)).getCadransByVoletId(1L);
    }

    @Test
    void deleteCadran_shouldReturnSuccessMap() {
        doNothing().when(cadranService).deleteCadran(1L);

        Map<String, Boolean> response = cadranController.deleteCadran(1L);

        assertTrue(response.get("Cadran successfully deleted"));
        verify(cadranService, times(1)).deleteCadran(1L);
    }
}
