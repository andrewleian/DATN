package com.example.datnbe.service;


import com.example.datnbe.domain.Product;
import com.example.datnbe.dto.ProductDTO;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Page<ProductDTO> getAll(Pageable pageable, String tuKhoa);
    ProductDTO getProductById(long id);
    Product createProduct(Product product);
    List<String> getAllManufacturer(); //Show in customer role(filter when shoping)
    ProductDTO changeStatusById(Long id);
    List<ProductDetailCustomerDTO> getByIdProduct(long id);

}
