/**
* Dự án tốt nghiệp Foly
*
* CategoryController.java tientv34
*
* Tháng 6 năm 2023
*/
package com.example.datnbe.controller.admin;

import com.example.datnbe.domain.Category;
import com.example.datnbe.domain.CategoryDetail;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.CategoryDTO;
import com.example.datnbe.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/**
 * @author tientv34
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/director/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    /**
     * api get all category
     * @return
     */
    @GetMapping("/getAllCategory")
    public ResponseEntity<ResponseObject> getAllCategories(){
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK","Successfully", categoryService.getAllCategories())
        );
    }

    /**
     * api create Category
     * @param categoryDTO tham số truyền vào
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createCategory(@RequestBody CategoryDTO categoryDTO){
        Category category = categoryService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK","Create Successfully", category)
        );
    }

    /**
     * api update Category
     * @param categoryDTO tham số truyền vào
     * @param id
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateCategory(@RequestBody CategoryDTO categoryDTO, @RequestParam(name = "id") Long id){
        categoryDTO.setId(id);
        Category category = categoryService.updateCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK","Update Successfully", category)
        );
    }

    /**
     * api delete Category
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteCategory(@PathVariable Long id){
        Boolean result = categoryService.deleteCategory(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK","Delete Successfully", "")
        );
    }

    /**
     * api create CategoryDetails
     * @param idCategory
     * @param idProduct
     * @return
     */
    @PostMapping("/createCategoryDetail")
    public ResponseEntity<ResponseObject> createCategoryDetails(@RequestParam(name = "idCategory") Long idCategory,
                                                                @RequestParam(name = "idProduct") Long idProduct){
        CategoryDetail categoryDetail = categoryService.createCategoryDetail(idCategory,idProduct);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Create Successfully", categoryDetail)
        );
    }
    /**
     * api delete Categorydetails
     * @param id
     * @return
     */
    @DeleteMapping("/categoryDetails/{id}")
    public ResponseEntity<ResponseObject> deleteCategoryDetails(@PathVariable Long id){
        Boolean result = categoryService.deleteCategoryDetails(id);
        if (result){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK","Delete Successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("False","Delete failed", "")
        );
    }
}
