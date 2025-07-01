package com;


import com.Telnet.projet.Controller.ClientController;
import com.Telnet.projet.Service.ClientService;
import com.Telnet.projet.models.Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClientControllerTest {

    @Mock
    private ClientService clientService;

    @InjectMocks
    private ClientController clientController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllClients_Success() {
        List<Client> clients = Collections.singletonList(new Client());
        when(clientService.getAllClients()).thenReturn(clients);

        List<Client> response = clientController.getAllClients();

        assertNotNull(response);
        assertEquals(1, response.size());
    }

    @Test
    void getClientById_Success() {
        Long clientId = 1L;
        Client client = new Client();
        when(clientService.getClientById(clientId)).thenReturn(Optional.of(client));

        Client response = clientController.getClientById(clientId);

        assertNotNull(response);
        assertEquals(client, response);
    }

    @Test
    void getClientById_NotFound() {
        Long clientId = 1L;
        when(clientService.getClientById(clientId)).thenReturn(Optional.empty());

        Client response = clientController.getClientById(clientId);

        assertNull(response);
    }

    @Test
    void createClient_Success() {
        Client client = new Client();
        when(clientService.createClient(client)).thenReturn(client);

        Client response = clientController.createClient(client);

        assertNotNull(response);
        assertEquals(client, response);
    }

    @Test
    void deleteClient_Success() {
        Long clientId = 1L;
        doNothing().when(clientService).deleteClient(clientId);

        clientController.deleteClient(clientId);

        verify(clientService, times(1)).deleteClient(clientId);
    }

    @Test
    void updateClient_Success() {
        Long clientId = 1L;
        Client updatedClient = new Client();
        when(clientService.updateClient(clientId, updatedClient)).thenReturn(Optional.of(updatedClient));

        Client response = clientController.updateClient(clientId, updatedClient);

        assertNotNull(response);
        assertEquals(updatedClient, response);
    }

    @Test
    void updateClient_NotFound() {
        Long clientId = 1L;
        Client updatedClient = new Client();
        when(clientService.updateClient(clientId, updatedClient)).thenReturn(Optional.empty());

        Client response = clientController.updateClient(clientId, updatedClient);

        assertNull(response);
    }
}
