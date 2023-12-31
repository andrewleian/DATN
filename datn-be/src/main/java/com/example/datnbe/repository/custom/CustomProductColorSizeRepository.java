package com.example.datnbe.repository.custom;

import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.request.ProductDetailSearchRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomProductColorSizeRepository {
    List<ProductDetailCustomerDTO> getAll(Pageable pageable , ProductDetailSearchRequest request);

//    ProductColorSize
}
