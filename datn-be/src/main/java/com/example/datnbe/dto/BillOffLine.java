package com.example.datnbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class BillOffLine {
    private List<ProductInfo> productInfos;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp create_at;
    private String status;
    private String codeBill;
    private String payments;
    private String nameStart;
    private Long idStart;
}
