package com.example.datnbe.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class ProductDTO {
    Long id;
    String name;
    String productCode;
    String manufacturer;
    Timestamp createAt;
    Timestamp updateAt;
    String status;
    int isNew;
    int isBestSeller;
}
