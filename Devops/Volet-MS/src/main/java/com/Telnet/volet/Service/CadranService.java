package com.Telnet.volet.Service;

import com.Telnet.volet.model.Cadran;
import com.Telnet.volet.model.EType;
import com.Telnet.volet.model.Volet;
import com.Telnet.volet.repository.CadranRepository;
import com.Telnet.volet.repository.VoletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CadranService {

    @Autowired
    private CadranRepository cadranRepository;

    @Autowired
    private VoletRepository voletRepository;

    public Cadran createCadran(Long voletId, Cadran cadran) {
        Volet volet = voletRepository.findById(voletId)
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + voletId));
        cadran.setVolet(volet);
        return cadranRepository.save(cadran);
    }

    public List<Cadran> getAllCadrans() {
        return cadranRepository.findAll();
    }

    public Cadran getCadranById(Long cadranId) {
        return cadranRepository.findById(cadranId)
                .orElseThrow(() -> new ResourceNotFoundException("Cadran not found with id: " + cadranId));
    }

    public List<Cadran> getCadransByAxe(String axe) {
        return cadranRepository.findByAxe(axe);
    }

    public List<Cadran> getCadransByType(EType type) {
        switch (type) {
            case STRENGTH:
                return cadranRepository.findStrength();
            case WEAKNESS:
                return cadranRepository.findWeakness();
            case OPPORTUNITY:
                return cadranRepository.findOpportunity();
            case THREAT:
                return cadranRepository.findThreat();
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public Cadran updateCadran(Long cadranId, Cadran cadranDetails) {
        Cadran cadran = getCadranById(cadranId);
        cadran.setName(cadranDetails.getName());
        return cadranRepository.save(cadran);
    }

    public void deleteCadran(Long cadranId) {
        Cadran cadran = getCadranById(cadranId);
        cadranRepository.delete(cadran);
    }

    public List<Cadran> getCadransByVoletId(Long voletId) {
        return cadranRepository.findByVoletId(voletId);
    }

    public Long countByType(EType type) {
        return cadranRepository.countByType(type);
    }
}
