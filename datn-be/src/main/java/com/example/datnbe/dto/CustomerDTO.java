/**
* Dự án tốt nghiệp Foly
*
* CustomerDTO.java tientv34
*
*@author tientv34
*/
package com.example.datnbe.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerDTO {
    private String customerName;
    private String phone;
    private String email;
    private String birthday;
    private String username;
    private String password;
    private String status;
    private String gender;
}
