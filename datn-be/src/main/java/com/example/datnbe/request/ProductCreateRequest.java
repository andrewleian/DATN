package com.example.datnbe.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Getter
@Setter
public class ProductCreateRequest {
    @NotBlank(message = "Tên sản phẩm đang để trống")
    @Size(max = 100)
    String name;

    @NotBlank(message = "Product code đang để trống")
    String productCode;

    @NotBlank(message = "Nhà sản xuất đang để trống")
    String manufacturer;

    @Pattern(regexp = "^(active|inactive)$", message = "Status must be either 'active' or 'inactive'")
    String status;

    @Min(0)
    @Max(1)
    int isNew;

    @Min(0)
    @Max(1)
    int isBestSeller;

    Timestamp createAt;
    Timestamp updateAt;

}
