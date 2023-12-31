package com.example.datnbe.request;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ProductRequest {
    private Integer amount;
    private Long productDetailId;
    private Double price;
    private BigDecimal promotionalPrice; //giá khuyến mại nếu có
    private BigDecimal discount; // phần trăm khuyến mại nếu có
}
