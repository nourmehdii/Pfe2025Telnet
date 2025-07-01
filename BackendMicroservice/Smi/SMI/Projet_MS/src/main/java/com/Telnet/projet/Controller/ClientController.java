package com.Telnet.projet.Controller;

import com.Telnet.projet.Service.ClientServiceimp;
import com.Telnet.projet.models.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/clients")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class ClientController {

    @Autowired
    private ClientServiceimp clientServiceimp;

    @GetMapping("/allclients")
    public List<Client> getAllClients() {
        return clientServiceimp.getAllClients();
    }

    @GetMapping("getby/{id}")
    public Client getClientById(@PathVariable Long id) {
        Optional<Client> client = clientServiceimp.getClientById(id);
        return client.orElse(null);
    }

    @PostMapping("/addclient")
    public Client createClient(@RequestBody Client client) {
        return clientServiceimp.createClient(client);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteClient(@PathVariable Long id) {
       clientServiceimp.deleteClient(id);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        Optional<Client> updated = clientServiceimp.updateClient(id, updatedClient);
        return updated.orElse(null);
    }
}
