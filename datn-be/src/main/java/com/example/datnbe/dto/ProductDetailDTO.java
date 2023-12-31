package com.example.datnbe.dto;

import com.example.datnbe.domain.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailDTO {
    long id; //Theo product detail
    long productId; //Theo product
    String name; //Product name
    int price;
    int amount;
//    List<String> categories;
    List<SizeDTO> sizes;
    ColorDTO colorDTO; //mã màu hex
//    String manufacturer;
    List<Image> images; //-> List<Object>
    String status; //product detail
}
