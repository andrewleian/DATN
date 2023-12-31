package com.example.datnbe.dto.TraHangDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuyAddProductDTO {
    private Double unitPrice;
    private Integer amount;
    private String note;
    private Long idProductDetail;
    private Long billId;
}
