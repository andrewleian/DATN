package com.example.datnbe.dto.TraHangDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductGhn {
    private String name;
    private String code;
    private int quantity;
    private int price;
}
