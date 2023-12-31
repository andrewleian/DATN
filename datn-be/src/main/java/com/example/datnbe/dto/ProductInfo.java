package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductInfo {
    private Double unitPrice;
    private Integer amount;
    private String nameSize;
    private String nameColor;
    private String productName;
    private String nameImage;
    private BigDecimal promotionalPrice;
    private BigDecimal discount;
    private Long idBillDetail;
    private Long idProduct;

    public ProductInfo(Double unitPrice, Integer amount, String nameSize, String nameColor, String productName, String nameImage, BigDecimal promotionalPrice, BigDecimal discount) {
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.nameSize = nameSize;
        this.nameColor = nameColor;
        this.productName = productName;
        this.nameImage = nameImage;
        this.promotionalPrice = promotionalPrice;
        this.discount = discount;
    }

    public ProductInfo(Double unitPrice, Integer amount, String nameSize, String nameColor, String productName, String nameImage, BigDecimal promotionalPrice, BigDecimal discount, Long idBillDetail) {
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.nameSize = nameSize;
        this.nameColor = nameColor;
        this.productName = productName;
        this.nameImage = nameImage;
        this.promotionalPrice = promotionalPrice;
        this.discount = discount;
        this.idBillDetail = idBillDetail;
    }

    public ProductInfo(Double unitPrice, Integer amount, String nameSize, String nameColor, String productName, String nameImage, BigDecimal promotionalPrice, BigDecimal discount, Long idBillDetail, Long idProduct) {
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.nameSize = nameSize;
        this.nameColor = nameColor;
        this.productName = productName;
        this.nameImage = nameImage;
        this.promotionalPrice = promotionalPrice;
        this.discount = discount;
        this.idBillDetail = idBillDetail;
        this.idProduct = idProduct;
    }
}
