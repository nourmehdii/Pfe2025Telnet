package com;

import com.Telnet.projet.Controller.ActionController;
import com.Telnet.projet.Service.ActionService;
import com.Telnet.projet.models.Action;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class ActionControllerTest {

    @InjectMocks
    private ActionController actionController;

    @Mock
    private ActionService actionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testPlanifierAction() {
        Long causeId = 1L;
        Action action = new Action();
        Action newAction = new Action();
        when(actionService.planifierAction(causeId, action)).thenReturn(newAction);

        ResponseEntity<?> response = actionController.planifierAction(causeId, action);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(newAction, response.getBody());
    }

    @Test
    void testPlanifierActionException() {
        Long causeId = 1L;
        Action action = new Action();
        when(actionService.planifierAction(causeId, action)).thenThrow(new RuntimeException("Erreur"));

        ResponseEntity<?> response = actionController.planifierAction(causeId, action);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        Map<String, String> expectedResponse = new HashMap<>();
        expectedResponse.put("error", "Erreur lors de la planification de l'action: Erreur");
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testGetActionById() {
        Long actionId = 1L;
        Action action = new Action();
        when(actionService.getActionById(actionId)).thenReturn(action);

        ResponseEntity<?> response = actionController.getActionById(actionId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(action, response.getBody());
    }

    @Test
    void testGetActionByIdException() {
        Long actionId = 1L;
        when(actionService.getActionById(actionId)).thenThrow(new RuntimeException("Erreur"));

        ResponseEntity<?> response = actionController.getActionById(actionId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        Map<String, String> expectedResponse = new HashMap<>();
        expectedResponse.put("error", "Erreur lors de la récupération de l'action: Erreur");
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testGetActionsByCauseId() {
        Long causeId = 1L;
        List<Action> actions = Collections.singletonList(new Action());
        when(actionService.getActionsByCauseId(causeId)).thenReturn(actions);

        ResponseEntity<?> response = actionController.getActionsByCauseId(causeId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(actions, response.getBody());
    }

    @Test
    void testGetActionsByCauseIdNoContent() {
        Long causeId = 1L;
        when(actionService.getActionsByCauseId(causeId)).thenReturn(Collections.emptyList());

        ResponseEntity<?> response = actionController.getActionsByCauseId(causeId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        Map<String, String> expectedResponse = new HashMap<>();
        expectedResponse.put("message", "Aucune action associée à cette cause");
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testModifierAction() {
        Long actionId = 1L;
        Action actionDetails = new Action();
        Action updatedAction = new Action();
        when(actionService.modifierAction(actionId, actionDetails)).thenReturn(updatedAction);

        ResponseEntity<?> response = actionController.modifierAction(actionId, actionDetails);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedAction, response.getBody());
    }

    @Test
    void testModifierActionException() {
        Long actionId = 1L;
        Action actionDetails = new Action();
        when(actionService.modifierAction(actionId, actionDetails)).thenThrow(new RuntimeException("Erreur"));

        ResponseEntity<?> response = actionController.modifierAction(actionId, actionDetails);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        Map<String, String> expectedResponse = new HashMap<>();
        expectedResponse.put("error", "Erreur lors de la modification de l'action: Erreur");
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testSupprimerAction() {
        Long actionId = 1L;
        doNothing().when(actionService).supprimerAction(actionId);

        ResponseEntity<?> response = actionController.supprimerAction(actionId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> expectedResponse = new HashMap<>();
        expectedResponse.put("message", "Action supprimée avec succès");
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testSupprimerActionException() {
        Long actionId = 1L;
        doThrow(new RuntimeException("Erreur")).when(actionService).supprimerAction(actionId);

        ResponseEntity<?> response = actionController.supprimerAction(actionId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        Map<String, String> expectedResponse = new HashMap<>();
        expectedResponse.put("error", "Erreur lors de la suppression de l'action: Erreur");
        assertEquals(expectedResponse, response.getBody());
    }
}
