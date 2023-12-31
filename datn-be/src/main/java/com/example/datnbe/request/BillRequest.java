package com.example.datnbe.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillRequest {
    private Long idBill;
    private String customerName;
    private String phone;
    private String email;
    private String address;
    private String note;
    private String status;
    private String noteCancel;
}
