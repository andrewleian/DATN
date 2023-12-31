package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDetailsOffLineDTO {
    private ProductInfo productInfo;
    private Integer totalProduct;
}
