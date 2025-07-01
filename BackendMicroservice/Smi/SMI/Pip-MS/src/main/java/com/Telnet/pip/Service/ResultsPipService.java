package com.Telnet.pip.Service;

import com.Telnet.pip.model.ResultsPip;
import com.Telnet.pip.model.Pip;
import com.Telnet.pip.repository.ResultsPipRepository;
import com.Telnet.pip.repository.PipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class ResultsPipService {

    @Autowired
    private ResultsPipRepository resultsPipRepository;

    @Autowired
    private PipRepository pipRepository;

    public List<ResultsPip> getAllResultsPip() {
        return resultsPipRepository.findAll();
    }

    public Optional<ResultsPip> getResultsPipById(Long resultspipId) {
        return resultsPipRepository.findById(resultspipId);
    }

    public ResultsPip createResultsPip(ResultsPip resultspip) {
        return resultsPipRepository.save(resultspip);
    }

    public ResultsPip updateResultsPip(Long resultspipId, Long pipId, ResultsPip resultspipDetails) throws ResourceNotFoundException {
        ResultsPip resultspip = resultsPipRepository.findById(resultspipId)
                .orElseThrow(() -> new ResourceNotFoundException("Results PIP not found: " + resultspipId));

        Optional<Pip> pip = pipRepository.findById(pipId);
        pip.ifPresent(resultspip::setPip);

        resultspip.setExpectation(resultspipDetails.getExpectation());
        resultspip.setRisk(resultspipDetails.getRisk());
        resultspip.setExistantMonitoring(resultspipDetails.getExistantMonitoring());
        resultspip.setSetupMonitoring(resultspipDetails.getSetupMonitoring());
        resultspip.setProcessus(resultspipDetails.getProcessus());

        return resultsPipRepository.save(resultspip);
    }

    public void deleteResultsPip(Long resultspipId) throws ResourceNotFoundException {
        ResultsPip resultspip = resultsPipRepository.findById(resultspipId)
                .orElseThrow(() -> new ResourceNotFoundException("Results PIP not found: " + resultspipId));
        resultsPipRepository.delete(resultspip);
    }
}
