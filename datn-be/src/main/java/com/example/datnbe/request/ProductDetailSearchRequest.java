package com.example.datnbe.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDetailSearchRequest {
    Long id;
    Long idPcs;
    String tuKhoa;
    String category;
    Double  minPrice;
    Double maxPrice;
    String size;
    String color;
    Double promotionValue;
    String manufacturer;
    String status;
    Integer isBestSeller;
    Integer isNew;
    Integer isOnPromotion;
}
