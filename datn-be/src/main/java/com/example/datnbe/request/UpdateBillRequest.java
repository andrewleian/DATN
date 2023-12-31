package com.example.datnbe.request;

import lombok.Data;

@Data
public class UpdateBillRequest {
    private Long idBill;
    private String customerName;
    private String phone;
    private String address;
    private String email;
    private String note;
}
