package com.example.datnbe.dto.TraHangDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowBIllDetailDoiDTO { // dùng rồi
    private Long id;
    private Double unitPrice;
    private Integer amount;
    private Long billId;
    private String billCode;
    private Long productDetailId;
    private Long productDetailDoiId;
    private String nameProductDetailOrigin;
    private String nameProductDetailDoi;
    private String note;

}
