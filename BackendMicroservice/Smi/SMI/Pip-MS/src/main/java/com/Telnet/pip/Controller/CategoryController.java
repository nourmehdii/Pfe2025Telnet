package com.Telnet.pip.Controller;

import com.Telnet.pip.Service.CategoryService;
import com.Telnet.pip.model.Category;

import com.Telnet.pip.model.Interaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Category> getCategoryList() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") Long categoryId)
            throws ResourceNotFoundException {
        Category category = categoryService.getCategoryById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + categoryId));
        return ResponseEntity.ok().body(category);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Category createCategory(@Valid @RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Category> updateCategory(
            @PathVariable(value = "id") Long categoryId,
            @Valid @RequestBody Category categoryDetails) throws ResourceNotFoundException {
        Category updatedCategory = categoryService.updateCategory(categoryId, categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Map<String, Boolean> deleteCategory(
            @PathVariable(value = "id") Long categoryId) throws ResourceNotFoundException {
        categoryService.deleteCategory(categoryId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Category successfully deleted", Boolean.TRUE);
        return response;
    }

    // En-tête pour filtrer par interaction
    @GetMapping("/by-interaction/{interaction}")
    public ResponseEntity<List<Category>> getCategoriesByInteraction(@PathVariable String interaction) {
        try {
            Interaction interactionEnum = Interaction.valueOf(interaction.toUpperCase());
            List<Category> categories = categoryService.getCategoriesByInteraction(interactionEnum);
            return ResponseEntity.ok(categories);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Gère les valeurs invalides
        }
    }
}
