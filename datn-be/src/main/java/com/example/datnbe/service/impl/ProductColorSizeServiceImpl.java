package com.example.datnbe.service.impl;

import com.example.datnbe.common.CommonString;
import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.ProductDetail;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.repository.ProductColorSizeRepository;
import com.example.datnbe.repository.ProductDetailRepository;
import com.example.datnbe.repository.custom.CustomProductColorSizeRepository;
import com.example.datnbe.request.ProductDetailSearchRequest;
import com.example.datnbe.service.ProductColorSizeService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductColorSizeServiceImpl implements ProductColorSizeService {
    private final CustomProductColorSizeRepository customProductColorSizeRepository;
    private final ProductColorSizeRepository productColorSizeRepository;
    private final ProductDetailRepository productDetailRepository;

    @Override
    public Page<ProductDetailCustomerDTO> getAll(Pageable pageable, ProductDetailSearchRequest request) {
         List<ProductDetailCustomerDTO> listProduct = customProductColorSizeRepository.getAll(pageable,request);
        return new PageImpl<>(listProduct,pageable,listProduct.size());
    }

    @Override
    public  List<ProductDetailCustomerDTO> getAllForStaff(Pageable pageable,ProductDetailSearchRequest request) {
        List<ProductDetailCustomerDTO> listProduct = customProductColorSizeRepository.getAll(pageable,request);
        return listProduct;
    }

    @Override
    public Optional<ProductColorSize> findById(Long id) {
        return productColorSizeRepository.findById(id);
    }

    @Override
    public void changeStatus(Long id) {
        ProductColorSize productColorSize = findById(id).orElseThrow(() -> new ServiceException("Không tìm thấy pcs!"));

        if (productColorSize.getStatus().equalsIgnoreCase(CommonString.Status.ACTIVATED.getValue())){
            productColorSize.setStatus(CommonString.Status.INACTIVATED.getValue());
            List<ProductDetail> productDetails = productDetailRepository.getByProductColorSize(id);
//            for (ProductDetail pd :productDetails) {
//                pd.setStatus(CommonString.Status.INACTIVATED.getValue());
//            }
            productDetailRepository.saveAll(productDetails);
        }else {
            productColorSize.setStatus(CommonString.Status.ACTIVATED.getValue());
        }
        productColorSizeRepository.save(productColorSize);
    }

}
