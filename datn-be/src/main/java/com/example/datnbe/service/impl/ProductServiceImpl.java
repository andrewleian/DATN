package com.example.datnbe.service.impl;


import com.example.datnbe.domain.Image;
import com.example.datnbe.domain.Product;
import com.example.datnbe.domain.ProductColorSize;
import com.example.datnbe.dto.ColorDTO;
import com.example.datnbe.dto.ProductDTO;
import com.example.datnbe.dto.ProductDetailCustomerDTO;
import com.example.datnbe.dto.SizeProductDetailDTO;
import com.example.datnbe.repository.ColorRepository;
import com.example.datnbe.repository.ProductColorSizeRepository;
import com.example.datnbe.repository.ProductRepository;
import com.example.datnbe.repository.PromotionRepository;
import com.example.datnbe.repository.custom.CustomProductDetailRepository;
import com.example.datnbe.repository.custom.CustomProductRepository;
import com.example.datnbe.service.ProductColorSizeService;
import com.example.datnbe.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final CustomProductRepository customProductRepository;
    private final ProductColorSizeRepository productColorSizeRepository;
    private final CustomProductDetailRepository customProductDetailRepository;
    private final PromotionRepository promotionRepository;
    private final ProductColorSizeService productColorSizeService;


    @Override
    public Page<ProductDTO> getAll(Pageable pageable, String tuKhoa) {

        return customProductRepository.getAll(pageable, tuKhoa);
    }

    @Override
    public ProductDTO getProductById(long id) {

        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            ProductDTO productDTO = modelMapper.map(optionalProduct.get(), ProductDTO.class);
            return productDTO;
        }
        return null;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }


    @Override
    public List<String> getAllManufacturer() {
        return productRepository.getAllManufacturer();
    }

    @Override
    public ProductDTO changeStatusById(Long id) {
        Product product = productRepository.findById(id).get();
        if (product.getStatus().equalsIgnoreCase("active")) {
            product.setStatus("inactive");

        } else {
            product.setStatus("active");
        }
        productRepository.save(product);
        return getProductById(product.getId());
    }

    @Override
    public List<ProductDetailCustomerDTO> getByIdProduct(long id) {

//        LocalDateTime currentDateTime = LocalDateTime.now();

        ProductDTO productDTO = getProductById(id);
        List<ProductColorSize> productColorSizes = productColorSizeRepository.getByIdProduct(id);
        List<ProductDetailCustomerDTO> productDetailCustomerDTOS = new ArrayList<>();

        for (ProductColorSize productColorSize: productColorSizes) {
            ProductDetailCustomerDTO pdcDTO = modelMapper.map(productDTO,ProductDetailCustomerDTO.class);
            if (productColorSize.getColor() != null){
                ColorDTO colorDTO = modelMapper.map(productColorSize.getColor(),ColorDTO.class);
                Integer promotionValue = promotionRepository.getByIdProDuctColorSize(productColorSize.getId());
                Integer promotionValueChecked = promotionValue == null ? 0 : promotionValue;

                List<SizeProductDetailDTO> sizeProductDetailDTOS = customProductDetailRepository.getAllSizePd(productColorSize.getId());
                pdcDTO.setSizeProductDetailDTOS(sizeProductDetailDTOS);
                pdcDTO.setColorDTO(colorDTO);
                pdcDTO.setImages((List<Image>) productColorSize.getImages());
                pdcDTO.setPrice(productColorSize.getPrice());
                pdcDTO.setPromotionValue((promotionValueChecked/100d));
                pdcDTO.setIdPcs(productColorSize.getId());
            }
            System.out.println("pdcDTO: "+pdcDTO);
            productDetailCustomerDTOS.add(pdcDTO);
        }
        return productDetailCustomerDTOS;
    }
}
