package com.example.datnbe.dto;

import com.example.datnbe.domain.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerChangeInforDTO {
    private String customerName;
    private String phone;
    private String email;
    private LocalDate birthday;
    private String username;
    private Collection<Address> addresses;
}