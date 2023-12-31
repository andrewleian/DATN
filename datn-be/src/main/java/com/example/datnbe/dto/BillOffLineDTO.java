package com.example.datnbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillOffLineDTO {
    private Long idBill;
    private String customerName;
    private String phone;
    private String email;
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
    private Long idStaff;
    private String nameStaff;
}
