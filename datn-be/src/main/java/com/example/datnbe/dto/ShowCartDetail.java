package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowCartDetail {
    private Long id;
    private  Long cartId;
    private Long idProductDetail;

    private Long idProducCls;
    private String productName;
    private Integer amount;
    private Integer price;
    private Integer maxAmount;
    private String sizeName;
    private String colorName;
    private String images;
    private String messages;
    private Float promotionValue;
    private List<SizeCartDetailDTO> sizes;





}
