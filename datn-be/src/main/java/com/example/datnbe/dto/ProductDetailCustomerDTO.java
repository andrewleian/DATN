package com.example.datnbe.dto;

import com.example.datnbe.domain.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailCustomerDTO {
    Long id;//id product
    long idPcs; //Theo product color size
    String name; //Product name
    String manufacturer;
    String productCode;
    String status;
    int isNew;
    int isBestSeller;
    int price;
    ColorDTO colorDTO; //mã màu hex
    List<SizeProductDetailDTO> sizeProductDetailDTOS;// chứa id productDetail,size và số lượng
    List<Image> images; //-> List<Object>
    Double promotionValue;
}
