package com.example.datnbe.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class SizeDTO {
    private Integer id;
    private String name;
    private Integer amount;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String status;
}
