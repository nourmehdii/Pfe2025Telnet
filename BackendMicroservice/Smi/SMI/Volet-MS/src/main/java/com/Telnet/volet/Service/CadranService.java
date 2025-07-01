package com.Telnet.volet.Service;

import com.Telnet.volet.dto.CadranDto;
import com.Telnet.volet.model.Cadran;
import com.Telnet.volet.model.EType;
import com.Telnet.volet.model.Volet;
import com.Telnet.volet.repository.CadranRepository;
import com.Telnet.volet.repository.VoletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class CadranService {

    @Autowired
    private CadranRepository cadranRepository;

    @Autowired
    private VoletRepository voletRepository;

    // ✅ Nouvelles méthodes create et update avec DTO

    public Cadran createCadran(CadranDto cadranDto) {
        Volet volet = voletRepository.findById(cadranDto.getVoletId())
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + cadranDto.getVoletId()));

        Cadran cadran = mapDtoToEntity(cadranDto);
        cadran.setVolet(volet); // Lien entre Cadran et Volet

        return cadranRepository.save(cadran);
    }

    public Cadran updateCadran(Long id, CadranDto cadranDto) {
        Cadran existing = cadranRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cadran not found with id: " + id));

        existing.setName(cadranDto.getName());

        try {
            existing.setType(EType.valueOf(cadranDto.getType().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid type: " + cadranDto.getType());
        }

        existing.setSecteur(cadranDto.getSecteur());
        existing.setContexte(cadranDto.getContexte());
        existing.setProcessus(cadranDto.getProcessus());
        existing.setOrigineInfo(cadranDto.getOrigineInfo());
        existing.setCreePar(cadranDto.getCreePar());

        // 💡 Ajout important : mise à jour du volet
        Volet volet = voletRepository.findById(cadranDto.getVoletId())
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + cadranDto.getVoletId()));
        existing.setVolet(volet);

        return cadranRepository.save(existing);
    }


    private Cadran mapDtoToEntity(CadranDto dto) {
        Cadran cadran = new Cadran();
        cadran.setName(dto.getName());

        try {
            cadran.setType(EType.valueOf(dto.getType().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid type: " + dto.getType());
        }

        cadran.setSecteur(dto.getSecteur());
        cadran.setContexte(dto.getContexte());
        cadran.setProcessus(dto.getProcessus());
        cadran.setOrigineInfo(dto.getOrigineInfo());
        cadran.setCreePar(dto.getCreePar());


        return cadran;
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

// ⚠️ Ancienne méthode create à remplacer (sans DTO)
    /*
    public Cadran createCadran(Long voletId, Cadran cadran) {
        Volet volet = voletRepository.findById(voletId)
                .orElseThrow(() -> new ResourceNotFoundException("Volet not found with id: " + voletId));
        cadran.setVolet(volet);
        return cadranRepository.save(cadran);
    }
    */
// ⚠️ Ancienne méthode update à remplacer (sans DTO)
    /*
    public Cadran updateCadran(Long cadranId, Cadran cadranDetails) {
        Cadran cadran = getCadranById(cadranId);
        cadran.setName(cadranDetails.getName());
        return cadranRepository.save(cadran);
    }
    */