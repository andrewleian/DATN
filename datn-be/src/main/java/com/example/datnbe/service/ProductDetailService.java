package com.example.datnbe.service;

import com.example.datnbe.domain.Product;
import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.domain.ProductDetail;
import com.example.datnbe.dto.ProductDetailDTO;
import com.example.datnbe.request.ProductDetailCreateRequest;
import com.example.datnbe.request.ProductDetailSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductDetailService {
    ProductColorSize createProductDetail(ProductDetailCreateRequest request, List<MultipartFile> files);
    void addOneImage(MultipartFile file, Long idPcs);
    void deleteSize(long idPd);
    String addNewSize(long idPcs,int amount,String sizeName);

    String updateProductDetail(long idPd,long idPcs,String colorName,int price,String status);

    String saveImages(MultipartFile mainImg, MultipartFile secondImg,long idPcs);

}
