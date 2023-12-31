package com.example.datnbe.repository.custom;

import com.example.datnbe.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomProductRepository {
    Page<ProductDTO> getAll(Pageable pageable, String tuKhoa);
}
