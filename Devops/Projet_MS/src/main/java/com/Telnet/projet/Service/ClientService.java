package com.Telnet.projet.Service;

import com.Telnet.projet.models.Client;
import com.Telnet.projet.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    public Optional<Client> updateClient(Long id, Client updatedClient) {
        return clientRepository.findById(id).map(client -> {
            client.setName(updatedClient.getName());
            client.setEmail(updatedClient.getEmail());
            client.setPhone(updatedClient.getPhone());
            client.setStreetAddress(updatedClient.getStreetAddress());
            client.setCity(updatedClient.getCity());
            client.setState(updatedClient.getState());
            client.setPostalCode(updatedClient.getPostalCode());
            client.setCountry(updatedClient.getCountry());
            client.setActive(updatedClient.isActive());
            client.setNotes(updatedClient.getNotes());
            client.setClientType(updatedClient.getClientType());
            return clientRepository.save(client);
        });
    }
}
