package com.example.datnbe.service;

import com.example.datnbe.domain.Customer;
import com.example.datnbe.exception.CustomerException;
import com.example.datnbe.payload.LoginRequest;
import com.example.datnbe.payload.LoginResponse;
import com.example.datnbe.request.ForgotPasswordRequest;
import com.example.datnbe.request.RegisterRequest;

import javax.mail.MessagingException;


public interface AuthenticateService {

    public LoginResponse authenticate(LoginRequest req);
    Customer register(RegisterRequest req) throws MessagingException, CustomerException;
    public LoginRequest forgotPassword(ForgotPasswordRequest req) throws Exception;
    public Boolean confimOtp(String otp);
    public String resendPassword()throws  Exception;
    String address(String address) throws MessagingException;
    String editAddress(Long addressId, String address) throws MessagingException;
    String deleteAddress(Long addressId) throws MessagingException;
}
