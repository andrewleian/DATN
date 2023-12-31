package com.example.datnbe.dto.TraHangDTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BillDetaiInfor { // dùng rồi
    private Long idBillDetail;
    private Long idBill;
    private Long idProductDetail;
    private Long idCustomer;
    private Double unitPrice;
    private Integer amount;
    private String nameSize;
    private String nameColor;
    private String productName;

    public BillDetaiInfor(Long idBillDetail, Long idBill, Long idProductDetail, Double unitPrice, Integer amount, String nameSize, String nameColor, String productName) {
        this.idBillDetail = idBillDetail;
        this.idBill = idBill;
        this.idProductDetail = idProductDetail;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.nameSize = nameSize;
        this.nameColor = nameColor;
        this.productName = productName;
    }
}





