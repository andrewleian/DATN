package com.example.datnbe.dto.TraHangDTOs;

import com.example.datnbe.domain.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BIllDetailDoiDTO {
    private Double unitPrice;
    private Integer amount;
    private Long idBill;
    private Long idProductDetail;
    private Long idProductDetailDoi;

}
