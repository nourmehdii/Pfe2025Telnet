package com.test;

import com.Telnet.pip.Controller.PipController;
import com.Telnet.pip.Service.PipService;
import com.Telnet.pip.model.Category;
import com.Telnet.pip.model.Pip;
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
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PipControllerTest {

    @InjectMocks
    private PipController pipController;

    @Mock
    private PipService pipService;

    private Category category;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        category = new Category("TestCategory");
        category.setId(1L);
    }

    @Test
    void testGetListOfPips() {
        String jsonData = "{\"pips\": [{\"id\": 1, \"name\": \"Pip1\"}, {\"id\": 2, \"name\": \"Pip2\"}]}";
        String result = pipController.getListOfPips();
        assertEquals(jsonData, result);
    }

    @Test
    void testGetPipList() {
        Pip pip1 = new Pip(1L, "Pip1", category, "Type1", "Interaction1");
        Pip pip2 = new Pip(2L, "Pip2", category, "Type2", "Interaction2");
        List<Pip> pips = Arrays.asList(pip1, pip2);

        when(pipService.getAllPips()).thenReturn(pips);

        List<Pip> result = pipController.getPipList();
        assertEquals(2, result.size());
        verify(pipService, times(1)).getAllPips();
    }

    @Test
    void testGetPipById() {
        Long pipId = 1L;
        Pip pip = new Pip(pipId, "Pip1", category, "Type1", "Interaction1");
        when(pipService.getPipById(pipId)).thenReturn(Optional.of(pip));

        ResponseEntity<Pip> response = pipController.getPipById(pipId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pip, response.getBody());
    }

    @Test
    void testGetPipByIdNotFound() {
        Long pipId = 1L;
        when(pipService.getPipById(pipId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            pipController.getPipById(pipId);
        });
    }

    @Test
    void testCreatePip() {
        Long categoryId = 1L;
        Pip pip = new Pip("Pip1", category, "Type1", "Interaction1");
        Pip savedPip = new Pip(1L, "Pip1", category, "Type1", "Interaction1");
        when(pipService.createPip(categoryId, pip)).thenReturn(savedPip);

        Pip result = pipController.createPip(categoryId, pip);
        assertEquals(savedPip, result);
    }

    @Test
    void testGetPipsByCategory() {
        Long categoryId = 1L;
        Pip pip1 = new Pip(1L, "Pip1", category, "Type1", "Interaction1");
        Pip pip2 = new Pip(2L, "Pip2", category, "Type2", "Interaction2");
        List<Pip> pips = Arrays.asList(pip1, pip2);

        when(pipService.getPipsByCategory(categoryId)).thenReturn(pips);

        List<Pip> result = pipController.getPipsByCategory(categoryId);
        assertEquals(2, result.size());
        verify(pipService, times(1)).getPipsByCategory(categoryId);
    }

    @Test
    void testUpdatePip() {
        Long pipId = 1L;
        Long categoryId = 1L;
        Pip pipDetails = new Pip("UpdatedPip", category, "UpdatedType", "UpdatedInteraction");
        Pip updatedPip = new Pip(pipId, "UpdatedPip", category, "UpdatedType", "UpdatedInteraction");

        when(pipService.updatePip(pipId, categoryId, pipDetails)).thenReturn(updatedPip);

        ResponseEntity<Pip> response = pipController.updatePip(pipId, categoryId, pipDetails);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedPip, response.getBody());
    }

    @Test
    void testDeletePip() {
        Long pipId = 1L;
        pipController.deletePip(pipId);
        verify(pipService, times(1)).deletePip(pipId);
    }

}
