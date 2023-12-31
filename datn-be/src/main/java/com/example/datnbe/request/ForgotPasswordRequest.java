package com.example.datnbe.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ForgotPasswordRequest {
    @Size(max = 250, message = "email không hợp lệ")
    @NotBlank(message = "email không hợp lệ")
    @Email(message = "email không hợp lệ")
    private String email;
    @NotBlank(message = "mật khẩu phải từ 8 dến 50 ký tự")
    @Size(min = 8,max = 50, message = "mật khẩu phải từ 8 dến 50 ký tự")
    private String password;
    @NotBlank(message = "Không được để trống confirmPassword")
    private String confirmPassword;
}
