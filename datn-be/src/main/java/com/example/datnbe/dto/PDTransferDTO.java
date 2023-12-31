package com.example.datnbe.dto;

import com.example.datnbe.domain.Image;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PDTransferDTO {
    Long id;
    long idPcs;
    String name;
    String manufacturer;
    String productCode;
    String status;
    int isNew;
    int isBestSeller;
    int price;
    ColorDTO colorDTO;
    SizeProductDetailDTO sizeDTO;
    List<Image> images;
    Double promotionValue;
}
