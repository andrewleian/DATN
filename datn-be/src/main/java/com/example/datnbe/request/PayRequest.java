package com.example.datnbe.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PayRequest {
    private Long idBill;
    private BigDecimal totalPayment;
    private String note;
    private String noteCancel;
    private Long idCustomer;
}
