package com.example.datnbe.service;

import com.example.datnbe.domain.Category;
import com.example.datnbe.domain.CategoryDetail;
import com.example.datnbe.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryDTO categoryDTO);
    Category updateCategory(CategoryDTO categoryDTO);
    Boolean deleteCategory(Long id);
    List<Category> getAllCategories();
    CategoryDetail createCategoryDetail(Long idCategory, Long idProduct);
    Boolean deleteCategoryDetails(Long id);
}
