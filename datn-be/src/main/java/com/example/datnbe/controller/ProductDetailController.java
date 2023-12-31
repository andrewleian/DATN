package com.example.datnbe.controller;

import com.example.datnbe.request.ProductDetailCreateRequest;
import com.example.datnbe.service.ProductDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin
public class ProductDetailController {

    private final ProductDetailService productDetailService;

    @PostMapping("/staff/product-detail")
    public ResponseEntity<String> createNewProductDetailForStaff(@Valid @RequestBody(required = true) ProductDetailCreateRequest request,
                                                                 List<MultipartFile> files,
                                                                 BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }
        productDetailService.createProductDetail(request, files);
        return ResponseEntity.ok("Created successfully");
    }

    @PutMapping("/staff/product-detail/update")
    public ResponseEntity<String> updateProductDetail(@RequestParam(name = "id_pd") long idPd,
                                                      @RequestParam(name = "id_pcs") long idPcs,
                                                      @RequestParam(name = "color_name") String colorName,
                                                      @RequestParam(name = "status") String status,
                                                      @RequestParam(name = "price") int price) {
        String message = productDetailService.updateProductDetail(idPd, idPcs, colorName, price, status);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/staff/product-detail/delete-size/{idProductDetail}")
    public void deleteSize(@PathVariable(name = "idProductDetail") long idProductDetail) {
        productDetailService.deleteSize(idProductDetail);
    }

    @GetMapping("/staff/product-detail/add-size")
    public ResponseEntity<String> addNewSize(@RequestParam(name = "id_pcs") long idPcs,
                                             @RequestParam(name = "amount") int amount,
                                             @RequestParam(name = "size_name") String sizeName) {
        String message = productDetailService.addNewSize(idPcs, amount, sizeName);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/staff/product-detail/upload-image")
    public ResponseEntity<String> saveImages(@RequestParam(name = "id_pcs") long idPcs,
                                             @RequestParam("main_image") MultipartFile mainImage,
                                             @RequestParam("secondary_image") MultipartFile secondaryImage
    ) {
        String message = productDetailService.saveImages(mainImage, secondaryImage, idPcs);
        return ResponseEntity.ok(message);
    }

}
