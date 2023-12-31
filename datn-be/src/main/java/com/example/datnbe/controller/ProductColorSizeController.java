package com.example.datnbe.controller;

import com.example.datnbe.domain.PagedResponse;
import com.example.datnbe.dto.PDTransferDTO;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.dto.SizeProductDetailDTO;
import com.example.datnbe.request.ProductDetailSearchRequest;
import com.example.datnbe.service.ProductColorSizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin
public class ProductColorSizeController {

    private final ProductColorSizeService productColorSizeService;

    @GetMapping("/list-products")
    public ResponseEntity<PagedResponse<ProductDetailCustomerDTO>> getAllProductsForUser(
            @RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "tu_khoa", required = false) String tuKhoa,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "min_price", required = false) Double minPrice,
            @RequestParam(name = "max_price", required = false) Double maxPrice,
            @RequestParam(name = "size", required = false) String size,
            @RequestParam(name = "color", required = false) String color,
            @RequestParam(name = "manufacturer", required = false) String manufacturer,
            @RequestParam(name = "is_best_seller", required = false) Integer isBestSeller,
            @RequestParam(name = "is_new", required = false) Integer isNew,
            @RequestParam(name = "is_on_promotion", required = false) Integer isOnPromotion
    ) {
        Pageable pageable = PageRequest.of(0, 99999);
        ProductDetailSearchRequest request = new ProductDetailSearchRequest();
        request.setTuKhoa(tuKhoa);
        request.setCategory(category);
        request.setMinPrice(minPrice);
        request.setMaxPrice(maxPrice);
        request.setSize(size);
        request.setColor(color);
        request.setManufacturer(manufacturer);
        request.setStatus("Active");
        request.setIsBestSeller(isBestSeller);
        request.setIsNew(isNew);
        request.setIsOnPromotion(isOnPromotion);

        List<ProductDetailCustomerDTO> listProduct = productColorSizeService.getAllForStaff(pageable, request);

        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min(startIndex + pageSize, listProduct.size());

        List<ProductDetailCustomerDTO> pageContent = listProduct.subList(startIndex, endIndex);

        Pageable pageableStaff = PageRequest.of(pageNumber, pageSize);
        Page<ProductDetailCustomerDTO> productDTOs = new PageImpl<>(pageContent, pageableStaff, pageContent.size());
        PagedResponse<ProductDetailCustomerDTO> response = new PagedResponse<>(
                productDTOs.getContent(),
                productDTOs.getTotalPages(),
                listProduct.size(),
                productDTOs.getNumber(),
                productDTOs.getSize());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/staff/product-details")
    public ResponseEntity<PagedResponse<ProductDetailCustomerDTO>> getAllForStaff(
            @RequestParam(name = "page_number", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "page_size", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "tu_khoa", required = false) String tuKhoa,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "min_price", required = false) Double minPrice,
            @RequestParam(name = "max_price", required = false) Double maxPrice,
            @RequestParam(name = "size", required = false) String size,
            @RequestParam(name = "color", required = false) String color,
            @RequestParam(name = "manufacturer", required = false) String manufacturer
    ) {
        Pageable pageable = PageRequest.of(0, 99999);
        ProductDetailSearchRequest request = new ProductDetailSearchRequest();
        request.setTuKhoa(tuKhoa);
        request.setCategory(category);
        request.setMinPrice(minPrice);
        request.setMaxPrice(maxPrice);
        request.setSize(size);
        request.setColor(color);
        request.setManufacturer(manufacturer);


        List<ProductDetailCustomerDTO> listProduct = productColorSizeService.getAllForStaff(pageable, request);

        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min(startIndex + pageSize, listProduct.size());

        List<ProductDetailCustomerDTO> pageContent = listProduct.subList(startIndex, endIndex);

        Pageable pageableStaff = PageRequest.of(pageNumber, pageSize);
        Page<ProductDetailCustomerDTO> productDTOs = new PageImpl<>(pageContent, pageableStaff, pageContent.size());
        PagedResponse<ProductDetailCustomerDTO> response = new PagedResponse<>(
                productDTOs.getContent(),
                productDTOs.getTotalPages(),
                listProduct.size(),
                productDTOs.getNumber(),
                productDTOs.getSize());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/staff/product-details/{id_pcs}")
    public void changeStatus(@PathVariable(name = "id_pcs") Long idPcs) {
        productColorSizeService.changeStatus(idPcs);
    }

    @GetMapping("/staff/product-details/{id_pcs}")
    public ResponseEntity<ProductDetailCustomerDTO> getById(
            @RequestParam(name = "page_number", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "page_size", defaultValue = "1") Integer pageSize,
            @PathVariable(name = "id_pcs") Long idPcs
    ) {
        Pageable pageable = PageRequest.of(0, 99999);
        ProductDetailSearchRequest request = new ProductDetailSearchRequest();
        request.setIdPcs(idPcs);

        List<ProductDetailCustomerDTO> listProduct = productColorSizeService.getAllForStaff(pageable, request);

        return ResponseEntity.ok(listProduct.get(0));
    }

    @GetMapping("/list-products/sale-offline")
    public ResponseEntity<List<PDTransferDTO>> getAllProductsForSaleOffline(
            @RequestParam(name = "tu_khoa", required = false) String tuKhoa
    ) {
        Pageable pageable = PageRequest.of(0, 99999);
        ProductDetailSearchRequest request = new ProductDetailSearchRequest();
        request.setTuKhoa(tuKhoa);
        request.setStatus("Active");

        List<ProductDetailCustomerDTO> listProduct = productColorSizeService.getAllForStaff(pageable, request);

        List<PDTransferDTO> productDTO2List = new ArrayList<>();

        for (ProductDetailCustomerDTO productCusDTO : listProduct) {

            if (productCusDTO.getSizeProductDetailDTOS() != null && !productCusDTO.getSizeProductDetailDTOS().isEmpty()) {
                for (SizeProductDetailDTO sizeDTO :productCusDTO.getSizeProductDetailDTOS()){
                    PDTransferDTO productDTO2 = new PDTransferDTO();

                    productDTO2.setId(productCusDTO.getId());
                    productDTO2.setIdPcs(productCusDTO.getIdPcs());
                    productDTO2.setName(productCusDTO.getName());
                    productDTO2.setManufacturer(productCusDTO.getManufacturer());
                    productDTO2.setProductCode(productCusDTO.getProductCode());
                    productDTO2.setStatus(productCusDTO.getStatus());
                    productDTO2.setIsNew(productCusDTO.getIsNew());
                    productDTO2.setIsBestSeller(productCusDTO.getIsBestSeller());
                    productDTO2.setPrice(productCusDTO.getPrice());
                    productDTO2.setColorDTO(productCusDTO.getColorDTO());
                    productDTO2.setImages(productCusDTO.getImages());
                    productDTO2.setPromotionValue(productCusDTO.getPromotionValue());

                    productDTO2.setSizeDTO(sizeDTO);
                    productDTO2List.add(productDTO2);
                }
            }

        }
        return ResponseEntity.ok(productDTO2List);
    }
}
