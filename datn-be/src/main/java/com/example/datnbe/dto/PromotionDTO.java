package com.example.datnbe.dto;

import com.example.datnbe.request.ProductColorSizeRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDTO {
    private Long id;
    private String title;
    private String content;
    private String discount;
    private String start_at;
    private String end_at;
    private String status;
    private List<ProductColorSizeRequest> id_product_color_size;
}
