/**
* Dự án tốt nghiệp Foly
*
* BillDetailDTO.java tientv34
*
*@author tientv34
*/
package com.example.datnbe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillDetailDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Double unitPrice;
    private Integer amount;
    private String note;
    private Long productDetailsId;
    private int billId;
}
