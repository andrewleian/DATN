package com.example.datnbe.dto;

import com.example.datnbe.domain.Bill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class StaffDTO {
    private Long id;
    @NotBlank(message = "Vui lòng nhập Họ Tên")
    @Pattern(regexp = "^[a-zA-ZÀ-Ỹà-ỹ]+(\\s[a-zA-ZÀ-Ỹà-ỹ]+)*$")
    private String staffName;
    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Size(min = 10)
    @Pattern(regexp = "^(?:\\+?84|0)(?:\\d{9}|\\d{10})$",message = "Vui lòng nhập đúng định dạng")
    private String phone;
    @NotBlank(message = "Vui lòng nhập Email")
    @Email(message = "Email của bạn sai định dạng")
    private String email;
    @NotBlank(message = "Vui lòng chọn ngày sinh")
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")
    private String birthday;
    @NotBlank(message = "Vui lòng nhập usename")
    @Pattern(regexp = "^[a-zA-Z0-9_-]{3,16}$")
    private String username;
    @NotBlank
    @Size(min = 8, message = "Pass phải từ 8 ký tự trở lên")
    private String password;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String status;
    @NotBlank(message = "Không được để trống giới tính")
    private String gender;
    private Collection<Bill> bills;
    @NotNull(message = "Vi lòng chọn chức vụ")
    private Long roleId;

}
