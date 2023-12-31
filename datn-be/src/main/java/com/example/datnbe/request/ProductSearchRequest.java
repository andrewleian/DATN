package com.example.datnbe.request;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class ProductSearchRequest {
    String tuKhoa;
    Timestamp createAt;
    Timestamp updateAt;
}
