package com.example.datnbe.service;

import javax.servlet.http.HttpServletRequest;

public interface VnPayService {

    String getOTP(int len);
    String Sha256(String message);
    String hmacSHA512(final String key,final String data);
    String getIpAddress(HttpServletRequest request);
}
