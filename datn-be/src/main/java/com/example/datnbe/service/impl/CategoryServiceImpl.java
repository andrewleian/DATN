/**
 * Dự án tốt nghiệp Foly
 * <p>
 * CategoryServiceImpl.java tientv34
 * <p>
 * Tháng 6 năm 2023
 */
package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.Category;
import com.example.datnbe.domain.CategoryDetail;
import com.example.datnbe.domain.Product;
import com.example.datnbe.dto.CategoryDTO;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.repository.CategoryDetailRepository;
import com.example.datnbe.repository.CategoryRepository;
import com.example.datnbe.repository.ProductRepository;
import com.example.datnbe.service.CategoryService;
import com.example.datnbe.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author tientv34
 */
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryDetailRepository categoryDetailRepository;

    /**
     * create a new category
     * @param categoryDTO tham số truyền vào là 1 category
     * @return
     */
    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            throw new MyCustomException("Invalid category");
        }
        /**
         * check xem category có bị trùng tên hay không?
         */
        Boolean result = categoryRepository.findAll().stream().anyMatch(
                category -> category.equals(categoryDTO.getName()));
        if (result) {
            throw new MyCustomException("category name already exists");
        }
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setCreateAt(Utils.getCurrentTimestamp());
        category.setUpdateAt(Utils.getCurrentTimestamp());
        category.setStatus(CommonString.Status.ACTIVATED.getValue());
        return categoryRepository.save(category);
    }

    /**
     * update category
     * @param categoryDTO Tham số truyền vào
     * @return
     */
    @Override
    public Category updateCategory(CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(categoryDTO.getId()).get();
        /**
         * check xem category có bị trùng tên hay không?
         */
        Boolean result = categoryRepository.findAll().stream().anyMatch(
                category1 -> category1.equals(categoryDTO.getName()));
        if (result) {
            throw new MyCustomException("category name already exists");
        }
        category.setName(categoryDTO.getName());
        category.setUpdateAt(Utils.getCurrentTimestamp());
        category.setStatus(categoryDTO.getStatus());
        return categoryRepository.save(category);
    }

    /**
     * delete category theo trạng thái
     * @param id category cần xoá.
     * @return
     */
    @Override
    public Boolean deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).get();
        if (category == null) {
            throw new MyCustomException("Category does not exist");
        }
        category.setStatus(CommonString.Status.INACTIVATED.getValue());
        Category categorySave = categoryRepository.save(category);
        if (categorySave != null) {
            return true;
        }
        return false;
    }

    /**
     * Lấy tất cả danh sách category
     * @return
     */
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * create a new category details
     * @param idCategory
     * @param idProduct
     * @return
     */
    @Override
    public CategoryDetail createCategoryDetail(Long idCategory, Long idProduct) {
        Category category = categoryRepository.findById(idCategory).get();
        Product product = productRepository.findById(idProduct).get();
        if (category == null || product == null) {
            throw new MyCustomException("Invalid category or invalid product");
        }
        CategoryDetail categoryDetail = new CategoryDetail();
        categoryDetail.setCategory(category);
        categoryDetail.setProduct(product);
        CategoryDetail categoryDetailSave = categoryDetailRepository.save(categoryDetail);
        if (categoryDetailSave != null) {
            return categoryDetailSave;
        }
        return null;
    }

    /**
     * Xoá caterogyDetails
     * @param id
     * @return
     */
    @Override
    public Boolean deleteCategoryDetails(Long id) {
        CategoryDetail categoryDetail = categoryDetailRepository.findById(id).get();
        if (categoryDetail == null){
            throw new MyCustomException("categoryDetails does not exits");
        }
        categoryDetailRepository.delete(categoryDetail);
        return true;
    }
}
