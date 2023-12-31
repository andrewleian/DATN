package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerChangePassDTO {
    @NotBlank(message = "Không được để trống username")
    private String username;
    @NotBlank(message = "Không để trống,mật khẩu phải từ 8 dến 50 ký tự")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",message = "Vui longf dung dinh dangj")
    private String password;
    @NotBlank(message = "Không được để trống confirmPassword")
    private String confirmPassword;
}