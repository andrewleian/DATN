/**
 * Dự án tốt nghiệp Foly
 * <p>
 * PromotionController.java tientv34
 * <p>
 * Tháng 6 năm 2023
 */
package com.example.datnbe.controller.admin;

import com.example.datnbe.domain.Promotion;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.PromotionDTO;
import com.example.datnbe.dto.PromotionDetailsDTO;
import com.example.datnbe.dto.ResponsePagination;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.exception.MyCustomException;
import com.example.datnbe.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author tientv34
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/director/promotions")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    /**
     * Phương thức getall, search, hiện tại đang search theo title, content, discount and status.
     *
     * @param page
     * @param pageSize
     * @param input    Gồm có title, content, discount
     * @param status   là status
     * @return
     * @throws CustomerException
     */
    @GetMapping("/getAll")
    public ResponsePagination getAllPromotion(@RequestParam(name = "page", defaultValue = "1") int page,
                                              @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                              @RequestParam(name = "input", required = false) String input,
                                              @RequestParam(name = "status", required = false) String status)
            throws CustomerException {
        return promotionService.getAllPromotion(input, status, page, pageSize);
    }

    /**
     * get promotion theo id
     *
     * @param id của promotion
     * @return
     * @throws MyCustomException
     */
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getPromotionById(@PathVariable Long id) throws CustomerException {
        Promotion promotion = promotionService.getPromotionById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "successfully", promotion)
        );
    }

    /**
     * Tạo ra promotion
     *
     * @param promotionDTO thông tin của promotion
     * @return
     * @throws CustomerException
     */
    @PostMapping("/createPromotion")
    public ResponseEntity<ResponseObject> createPromotion(@RequestBody PromotionDTO promotionDTO) throws CustomerException {
        Promotion promotion = promotionService.createPromotion(promotionDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Create Successfully", promotion.getId())
        );
    }

    //Update thông tin promotion
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updatePromotion(@RequestBody PromotionDTO promotionDTO, @PathVariable Long id)
            throws CustomerException {
        promotionDTO.setId(id);
        Promotion promotion = promotionService.updatePromotion(promotionDTO);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Update Successfully", promotion.getId())
        );
    }

    /**
     * Xoá promotion trong bảng promotion.
     *
     * @param id của promotion
     * @return
     * @throws CustomerException
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deletePromotion(@PathVariable Long id) throws CustomerException {
        Boolean result = promotionService.deletePromotion(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", " Delete Successfully", "")
        );
    }

    /**
     * Xo product color size trong bảng promotion details (xoá giảm giá cho 1 product color size)
     *
     * @param id          của product color Size muốn xoá trong bảng product details
     * @param idPromotion là id của promotion trong bảng promotion.
     * @return
     * @throws CustomerException
     */
    @DeleteMapping("/delete/{id}/{idPromotion}")
    public ResponseEntity<ResponseObject> deleteProductInPromotionDetail(@PathVariable Long id,
                                                                         @PathVariable Long idPromotion)
            throws CustomerException {
        Boolean result = promotionService.deletePromotionDetails(id, idPromotion);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", " Delete Successfully", "")
        );
    }

    /**
     * Lấy thông tin của tất cả product color size được khuyến mại theo id promotion
     * @param id là id của promotion
     * @return
     * @throws CustomerException
     */
    @GetMapping("/promotion/{id}")
    public ResponseEntity<ResponseObject> getAllPromotionDetailsByIdPromotion(@PathVariable Long id)
            throws CustomerException {
        PromotionDetailsDTO output = promotionService.getAllByIdPromotion(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Successfully", output)
        );
    }

}
