package com.example.datnbe.repository.custom;

import com.example.datnbe.dto.ProductDetailDTO;
import com.example.datnbe.dto.SizeProductDetailDTO;
import com.example.datnbe.request.ProductDetailSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomProductDetailRepository {

    List<SizeProductDetailDTO> getAllSizePd(Long idPcs);
// TODO
    Page<ProductDetailDTO> getAllForStaff(Pageable pageable, ProductDetailSearchRequest request);
}
