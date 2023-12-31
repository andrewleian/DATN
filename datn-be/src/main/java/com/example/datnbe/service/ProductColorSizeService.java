package com.example.datnbe.service;


import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.request.ProductDetailSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductColorSizeService {
    Page<ProductDetailCustomerDTO> getAll(Pageable pageable, ProductDetailSearchRequest request);

    List<ProductDetailCustomerDTO> getAllForStaff(Pageable pageable,ProductDetailSearchRequest request);

    Optional<ProductColorSize> findById(Long id);

    void changeStatus(Long id);

}
