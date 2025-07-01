package com.Telnet.pip.Service;

import com.Telnet.pip.model.Category;
import com.Telnet.pip.model.Interaction;
import com.Telnet.pip.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Category createCategory(Category category) {
        if (category.getInteraction() == null) {
            category.setInteraction(Interaction.FAR); // Défaut : Faible
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long categoryId, Category categoryDetails) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + categoryId));
        category.setName(categoryDetails.getName());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + categoryId));
        categoryRepository.delete(category);
    }

    public List<Category> getCategoriesByInteraction(Interaction interaction) {
        return categoryRepository.findAll().stream()
                .filter(category -> category.getInteraction() == interaction)
                .collect(Collectors.toList());
    }
}
