package com.test;



import com.Telnet.pip.Controller.CategoryController;
import com.Telnet.pip.Service.CategoryService;
import com.Telnet.pip.model.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {

    @InjectMocks
    private CategoryController categoryController;

    @Mock
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCategoryList() {
        List<Category> categories = Arrays.asList(
                new Category(1L, "Category1"),
                new Category(2L, "Category2")
        );
        when(categoryService.getAllCategories()).thenReturn(categories);

        List<Category> result = categoryController.getCategoryList();
        assertEquals(2, result.size());
        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    void testGetCategoryById() {
        Long categoryId = 1L;
        Category category = new Category(categoryId, "Category1");
        when(categoryService.getCategoryById(categoryId)).thenReturn(Optional.of(category));

        ResponseEntity<Category> response = categoryController.getCategoryById(categoryId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(category, response.getBody());
    }

    @Test
    void testGetCategoryByIdNotFound() {
        Long categoryId = 1L;
        when(categoryService.getCategoryById(categoryId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            categoryController.getCategoryById(categoryId);
        });
    }

    @Test
    void testCreateCategory() {
        Category category = new Category(null, "Category1");
        Category savedCategory = new Category(1L, "Category1");
        when(categoryService.createCategory(category)).thenReturn(savedCategory);

        Category result = categoryController.createCategory(category);
        assertEquals(savedCategory, result);
    }

    @Test
    void testUpdateCategory() {
        Long categoryId = 1L;
        Category categoryDetails = new Category(null, "UpdatedCategory");
        Category updatedCategory = new Category(categoryId, "UpdatedCategory");

        when(categoryService.updateCategory(categoryId, categoryDetails)).thenReturn(updatedCategory);

        ResponseEntity<Category> response = categoryController.updateCategory(categoryId, categoryDetails);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedCategory, response.getBody());
    }

    @Test
    void testDeleteCategory() {
        Long categoryId = 1L;
        doNothing().when(categoryService).deleteCategory(categoryId);

        Map<String, Boolean> response = categoryController.deleteCategory(categoryId);
        assertEquals(Boolean.TRUE, response.get("Category successfully deleted"));
        verify(categoryService, times(1)).deleteCategory(categoryId);
    }
}
