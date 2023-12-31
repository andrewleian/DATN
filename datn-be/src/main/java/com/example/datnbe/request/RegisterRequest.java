package com.example.datnbe.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;
@Data
public class RegisterRequest {
    @NotBlank( message = "UserName từ 5 đến 30 ký tự không gồm ký tự đặc biệt")
    @Pattern(regexp = "[A-Za-z0-9]+", message = "UserName từ 5 đến 30 ký tự không gồm ký tự đặc biệt")
    @Size(min = 5, max = 30, message = "UserName từ 5 đến 30 ký tự không gồm ký tự đặc biệt")
    private String username;
    @NotBlank(message = "mật khẩu phải từ 8 dến 50 ký tự")
    @Size(min = 8,max = 50, message = "mật khẩu phải từ 8 dến 50 ký tự")
    private String password;
    private Date birthday;
//    @Pattern(regexp = "(0|\\+84)[1-9][0-9]{8}", message = "số điện thoại không hợp lệ")
    private String phone;
    @Size(max = 250, message = "Email không hợp lệ")
    @NotBlank(message = "Email không hợp lệ")
    @Email(message = "Email không hợp lệ")
    private String email;
    @Size(min = 2,max = 250, message = "Tên không hợp lệ")
    @NotBlank(message = "Tên không được để trống")
    private String customerName;
    private String address;
    private String gender;

}
