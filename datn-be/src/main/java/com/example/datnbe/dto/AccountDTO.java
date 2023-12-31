package com.example.datnbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long id;
    private String staffName;
    private String phone;
    private String email;
    private String birthday;
    private String username;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String status;
    private String gender;

    private String roleName;
}
