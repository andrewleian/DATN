/**
* Dự án tốt nghiệp Foly
*
* BillDTO.java tientv34
*
*@author tientv34
*/
package com.example.datnbe.dto;

import com.example.datnbe.request.CartDetailsRequest;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillDTO {
    private Long id;
    @NotEmpty(message = "Số điện thoại không được rỗng")
    @Pattern(regexp = "^\\d{10,11}$", message = "Số điện thoại sai định dạng")
    private String phone;
    @NotEmpty(message = "Số điện thoại không được rỗng")
    private String name;
    @NotEmpty(message = "Email không thể rỗng")
    @Email(message = "Email chưa đúng định dạng")
    private String email;
    @NotEmpty(message = "Địa chỉ không được để trống")
    private String address;
    private BigDecimal totalPayment;
    private String note;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp createAt;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp updateAt;
    private String status;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Timestamp paymentDate;
    private String payments;
    private int customerId;
    private int staffId;
    private List<CartDetailsRequest> lstCartDetails;
}
