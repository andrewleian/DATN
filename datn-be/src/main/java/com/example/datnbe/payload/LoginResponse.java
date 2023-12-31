package com.example.datnbe.payload;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Data

public class LoginResponse {
    private String accessToken;

    private String tokenType = "Bearer";

    private String role;

    public LoginResponse(String accessToken , UserDetails account) {
        this.accessToken=accessToken;
        for(GrantedAuthority au:account.getAuthorities()){
            this.role=au.getAuthority();
        }
    }
}
