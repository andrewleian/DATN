package com.example.datnbe.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String status;
    private Long customerId;
    private List<CartDetailDTO> cartDetails;
}
