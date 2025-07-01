package test;


import com.Telnet.volet.Controller.VoletController;
import com.Telnet.volet.model.Cadran;
import com.Telnet.volet.model.EAxe;
import com.Telnet.volet.model.Volet;
import com.Telnet.volet.repository.CadranRepository;
import com.Telnet.volet.repository.VoletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VoletControllerTest {

    @InjectMocks
    private VoletController voletController;

    @Mock
    private VoletRepository voletRepository;

    @Mock
    private CadranRepository cadranRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCountByAxeInterne() {
        when(voletRepository.countByAxe(EAxe.INTERNE)).thenReturn(5L);
        long count = voletController.countByAxe("interne");
        assertEquals(5L, count);
    }

    @Test
    void testCountByAxeExterne() {
        when(voletRepository.countByAxe(EAxe.EXTERNE)).thenReturn(3L);
        long count = voletController.countByAxe("externe");
        assertEquals(3L, count);
    }

    @Test
    void testGetVoletList() {
        Volet volet1 = new Volet(); // Remplir les détails de l'objet Volet
        Volet volet2 = new Volet();
        when(voletRepository.findAll()).thenReturn(Arrays.asList(volet1, volet2));

        List<Volet> volets = voletController.getVoletList();
        assertEquals(2, volets.size());
    }

    @Test
    void testGetVoletById() {
        Volet volet = new Volet(); // Remplir les détails de l'objet Volet
        when(voletRepository.findById(1L)).thenReturn(Optional.of(volet));

        ResponseEntity<Volet> response = voletController.getVoletById(1L);
        assertEquals(volet, response.getBody());
    }

    @Test
    void testGetListByAxe() {
        Volet volet1 = new Volet(); // Remplir les détails de l'objet Volet
        Volet volet2 = new Volet();
        when(voletRepository.findByAxe(EAxe.INTERNE)).thenReturn(Arrays.asList(volet1, volet2));

        List<Volet> volets = voletController.getListByAxe(EAxe.INTERNE);
        assertEquals(2, volets.size());
    }

    @Test
    void testCreateVolet() {
        Volet volet = new Volet(); // Remplir les détails de l'objet Volet
        when(voletRepository.save(volet)).thenReturn(volet);

        Volet createdVolet = voletController.createVolet(volet);
        assertEquals(volet, createdVolet);
    }

    @Test
    void testUpdateVolet() throws Exception {
        Volet existingVolet = new Volet(); // Remplir les détails de l'objet Volet
        Volet updatedVoletDetails = new Volet(); // Remplir les nouveaux détails

        when(voletRepository.findById(1L)).thenReturn(Optional.of(existingVolet));
        when(voletRepository.save(existingVolet)).thenReturn(existingVolet);

        ResponseEntity<Volet> response = voletController.updateVolet(1L, updatedVoletDetails);
        assertEquals(existingVolet, response.getBody());
    }

    @Test
    void testGetVoletNameByCadranName() {
        Cadran cadran = new Cadran(); // Remplir les détails de l'objet Cadran
        Volet volet = new Volet(); // Remplir les détails de l'objet Volet
        volet.setName("Test Volet");
        cadran.setVolet(volet);
        when(cadranRepository.findByName("Test Cadran")).thenReturn(cadran);

        String voletName = voletController.getVoletNameByCadranName("Test Cadran");
        assertEquals("Test Volet", voletName);
    }

    @Test
    void testDeleteVolet() throws Exception {
        Volet volet = new Volet(); // Remplir les détails de l'objet Volet
        when(voletRepository.findById(1L)).thenReturn(Optional.of(volet));

        Map<String, Boolean> response = voletController.deleteVolet(1L);
        assertTrue(response.get("Volet successefully deleted"));
        verify(voletRepository, times(1)).delete(volet);
    }
}
