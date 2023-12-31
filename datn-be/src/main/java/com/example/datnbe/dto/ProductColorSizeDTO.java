package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductColorSizeDTO {
    private Long id;
    private String name;
    private String color;
    private Long idPromotionDetails;
}
