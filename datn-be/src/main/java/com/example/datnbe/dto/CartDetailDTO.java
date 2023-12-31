package com.example.datnbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDTO {
    private Long id;
    @NotNull
    @Positive(message = "Amount must be greater than 0")
    private Integer amount;
    private Long cartId;
    @NotNull(message = "Vui lòng gửi idProducDetail cho tôi")
    private  Long productDetailId;
    private String status;
    private Double price; //Giá của 1 sản phẩm.

}
