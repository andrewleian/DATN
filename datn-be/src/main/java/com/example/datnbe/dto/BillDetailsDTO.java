package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillDetailsDTO {
    private List<ProductInfo> productInfo;
    private LocalDate pay_date;
    private BigDecimal totalPrice;
    private String payments;
    private Integer totalProduct;
}
