package com.example.datnbe.dto.TraHangDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowBill {
    private Long id;
    private String billCode;
    private String customerNam;
    private String phone;
    private String email;
    private BigDecimal totalPayment;
    private String paymentDate;
    private String status;
    private String hanDoi;
}
