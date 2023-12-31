package com.example.datnbe.dto;

import com.example.datnbe.domain.Image;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductCustomerDTO {
    long idProduct;
    long idPcs; //Theo product color size
    String name; //Product name
    String manufacturer;
    String productCode;
    int price;
    ColorDTO colorDTO; //mã màu hex
    List<SizeProductDetailDTO> sizeProductDetailDTOS;// chứa id productDetail,size và số lượng
    List<Image> images; //-> List<Object>
    Integer isNew;
    Integer isBestSeller;
}
