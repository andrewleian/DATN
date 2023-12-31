package com.example.datnbe.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
@Getter
@Setter
public class confimOtpConfig {
    private LocalDateTime currentDateTime;
    @Value("${optCode:}")
    private String optCode;
    private String email;
    private String userName;
    private String passWord;

}