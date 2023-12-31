package com.example.datnbe.controller;


import com.example.datnbe.domain.PagedResponse;
import com.example.datnbe.domain.Product;
import com.example.datnbe.domain.ResponseObject;
import com.example.datnbe.dto.ProductDTO;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.request.ProductCreateRequest;
import com.example.datnbe.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    private final ModelMapper modelMapper;

    @GetMapping("/staff/product")
    public ResponseEntity<PagedResponse<ProductDTO>> getAllProducts(@RequestParam(name = "tuKhoa",required = false) String tuKhoa, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<ProductDTO> productPage = productService.getAll(pageable, tuKhoa);
        PagedResponse<ProductDTO> response = new PagedResponse<>(productPage.getContent(), productPage.getTotalPages(),
                productPage.getTotalElements(), productPage.getNumber(), productPage.getSize());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/staff/product/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id) {
        ProductDTO product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/staff/product")
    public ResponseEntity<String> createProduct(@Valid @RequestBody ProductCreateRequest request,
                                                BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Product product = modelMapper.map(request, Product.class);
        if (productService.createProduct(product) != null) {
            return ResponseEntity.ok("Created successfully");
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/staff/product/{id}")
    public ResponseEntity<String> updateProduct(@Valid @RequestBody ProductCreateRequest request,
                                                BindingResult result,
                                                @PathVariable(name = "id") String id) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }
        Product product = modelMapper.map(request, Product.class);
        product.setId(Long.parseLong(id));
        if (productService.createProduct(product) != null) {
            return ResponseEntity.ok("Updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/staff/product/status/{id}")
    public ResponseEntity<ProductDTO> changeStatus(@PathVariable(name = "id") String id) {
        Long idProduct = Long.parseLong(id);
        ProductDTO productDTO = productService.changeStatusById(idProduct);
        return ResponseEntity.ok(productDTO);

    }

    @GetMapping("/manufacturer")
    public List<String> getAllManufacturer() {
        return productService.getAllManufacturer();
    }

    @GetMapping("/product-detail/{id}")
    public ResponseEntity<?> getProductDetailById(@PathVariable(name = "id")Long id){
        List<ProductDetailCustomerDTO> list = productService.getByIdProduct(id);
        return ResponseEntity.ok(list);
    }

}
