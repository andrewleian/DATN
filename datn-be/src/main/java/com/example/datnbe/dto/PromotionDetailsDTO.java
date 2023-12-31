package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDetailsDTO {
    private List<ProductColorSizeDTO> idProductDetails;
    private Long idPromotion;
}
