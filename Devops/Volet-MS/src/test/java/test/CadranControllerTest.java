package test;

import com.Telnet.volet.Controller.CadranController;
import com.Telnet.volet.Service.CadranService;
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
        Cadran cadran = new Cadran();
        when(cadranService.createCadran(anyLong(), any(Cadran.class))).thenReturn(cadran);

        ResponseEntity<?> response = cadranController.createCadran(1L, cadran);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(cadran, response.getBody());
        verify(cadranService, times(1)).createCadran(anyLong(), any(Cadran.class));
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
    void updateCadran_shouldUpdateCadranWhenFound() {
        Cadran cadran = new Cadran();
        Cadran updatedCadran = new Cadran();
        updatedCadran.setName("Updated Cadran");

        when(cadranService.updateCadran(eq(1L), any(Cadran.class))).thenReturn(updatedCadran);

        ResponseEntity<Cadran> response = cadranController.updateCadran(1L, updatedCadran);

        assertNotNull(response.getBody());
        assertEquals("Updated Cadran", response.getBody().getName());
        verify(cadranService, times(1)).updateCadran(eq(1L), any(Cadran.class));
    }

    @Test
    void getCadranListByAxeVolet_shouldReturnListOfCadrans() {
        Cadran cadran = new Cadran();
        when(cadranService.getCadransByAxe("testAxe")).thenReturn(Collections.singletonList(cadran));

        List<Cadran> cadranList = cadranController.getCadranListByAxeVolet("testAxe");

        assertNotNull(cadranList);
        assertEquals(1, cadranList.size());
        verify(cadranService, times(1)).getCadransByAxe("testAxe");
    }

    @Test
    void getCadranListByTypeS_shouldReturnListOfCadrans() {
        Cadran cadran = new Cadran();
        when(cadranService.getCadransByType(EType.STRENGTH)).thenReturn(Collections.singletonList(cadran));

        List<Cadran> cadranList = cadranController.getCadranListByTypeS();

        assertNotNull(cadranList);
        assertEquals(1, cadranList.size());
        verify(cadranService, times(1)).getCadransByType(EType.STRENGTH);
    }

    // Ajoutez d'autres tests pour les autres méthodes...
}
