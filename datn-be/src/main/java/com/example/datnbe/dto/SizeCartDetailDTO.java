package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SizeCartDetailDTO {
    String name;
    Integer amount;
    Long idProductDetail;

}
