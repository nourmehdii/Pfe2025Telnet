package com.Telnet.pip.Service;

import com.Telnet.pip.model.Category;
import com.Telnet.pip.model.Pip;
import com.Telnet.pip.model.ResultsPip;
import com.Telnet.pip.repository.CategoryRepository;
import com.Telnet.pip.repository.PipRepository;
import com.Telnet.pip.repository.ResultsPipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PipService {

    private static final Logger logger = LoggerFactory.getLogger(PipService.class);

    @Autowired
    private PipRepository pipRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ResultsPipRepository resultsPipRepository;

    public List<Pip> getAllPips() {
        return pipRepository.findAll();
    }

    public Optional<Pip> getPipById(Long pipId) {
        return pipRepository.findById(pipId);
    }

    public Pip createPip(Long categoryId, @Valid Pip pip) throws ResourceNotFoundException {
        return categoryRepository.findById(categoryId).map(category -> {
            pip.setCategory(category);
            return pipRepository.save(pip);
        }).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    public List<Pip> getPipsByCategory(Long categoryId) {
        return pipRepository.findByCategoryId(categoryId);
    }

    public Pip updatePip(Long pipId, Long categoryId, @Valid Pip pipDetails) throws ResourceNotFoundException {
        Optional<Category> category = categoryRepository.findById(categoryId);

        Pip pip = pipRepository.findById(pipId)
                .orElseThrow(() -> new ResourceNotFoundException("Pip not found :: " + pipId));
        pip.setName(pipDetails.getName());
        pip.setType(pipDetails.getType());
        pip.setInteraction(pipDetails.getInteraction());
        pip.setCategory(category.orElseThrow(() -> new ResourceNotFoundException("Category not found")));

        return pipRepository.save(pip);
    }

    public Map<String, Boolean> deletePip(Long pipId) throws ResourceNotFoundException {
        Pip pip = pipRepository.findById(pipId)
                .orElseThrow(() -> new ResourceNotFoundException("Pip not found :: " + pipId));

        // Delete associated records in resultpips
        List<ResultsPip> resultPips = resultsPipRepository.findByPipId(pipId);
        for (ResultsPip resultPip : resultPips) {
            resultsPipRepository.delete(resultPip);
        }

        pipRepository.delete(pip);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Pip successfully deleted", Boolean.TRUE);
        return response;
    }
}
