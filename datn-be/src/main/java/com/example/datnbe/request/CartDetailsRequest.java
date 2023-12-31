package com.example.datnbe.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CartDetailsRequest {
    private Long id;
    private Integer amount;
    private Long cartId;
    private  Long productDetailId;
    private String status;
    private Double price;
    private BigDecimal promotionalPrice; //giá khuyến mại nếu có
    private BigDecimal discount; // phần trăm khuyến mại nếu có
}
