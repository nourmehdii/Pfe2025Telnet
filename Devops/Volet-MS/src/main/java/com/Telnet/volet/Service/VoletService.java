package com.Telnet.volet.Service;
import com.Telnet.volet.model.Cadran;
import com.Telnet.volet.model.EAxe;
import com.Telnet.volet.model.Volet;
import com.Telnet.volet.repository.CadranRepository;
import com.Telnet.volet.repository.VoletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoletService {

    @Autowired
    private VoletRepository voletRepository;

    @Autowired
    private CadranRepository cadranRepository;

    public long countByAxe(EAxe axe) {
        return voletRepository.countByAxe(axe);
    }

    public List<Volet> getAllVolets() {
        return voletRepository.findAll();
    }

    public Volet getVoletById(Long voletId) {
        return voletRepository.findById(voletId)
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + voletId));
    }

    public List<Volet> getVoletsByAxe(EAxe axe) {
        return voletRepository.findByAxe(axe);
    }

    public Volet createVolet(Volet volet) {
        return voletRepository.save(volet);
    }

    public Volet updateVolet(Long voletId, Volet voletDetails) {
        Volet volet = voletRepository.findById(voletId)
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + voletId));

        volet.setName(voletDetails.getName());
        volet.setAxe(voletDetails.getAxe());

        return voletRepository.save(volet);
    }

    public String getVoletNameByCadranName(String cadranName) {
        Cadran cadran = cadranRepository.findByName(cadranName);

        if (cadran != null && cadran.getVolet() != null) {
            return cadran.getVolet().getName();
        } else {
            return null;
        }
    }

    public void deleteVolet(Long voletId) {
        Volet volet = voletRepository.findById(voletId)
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + voletId));
        voletRepository.delete(volet);
    }
}
