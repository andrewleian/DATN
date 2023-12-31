package com.example.datnbe.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDetailsRequest {
    private long idBill;
    private ProductRequest productRequest; // sản phẩm muốn add vào giỏ hàng.
}
