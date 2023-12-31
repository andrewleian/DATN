package com.example.datnbe.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SerialCodeDTO {
    private Long id;
    private String serialCode;
    private Timestamp importDate;
    private Timestamp saleDate;
    private String status;
    private Long productDetailId;
}
