package com.example.datnbe.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class ColorDTO {
    private String id;
    private String name;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String status;
}
