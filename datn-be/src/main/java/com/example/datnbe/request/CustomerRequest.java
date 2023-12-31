package com.example.datnbe.request;

import lombok.Data;

@Data
public class CustomerRequest {
    private String customerName;
    private String phoneNumber;
    private String email;
    private String gender;
    private String username;
}
