package com.example.datnbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
@Data
public class ListBillDTO {
    private Long id;
    private String customerName;
    private String phone;
    private String email;
    private String address;
    private BigDecimal totalPayment;
    private String note;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp createAt;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp updateAt;
    private String status;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp paymentDate;
    private String payments;
    private String billCode;
    private String noteCancel;
    private ProductInfo productInfo;
}
