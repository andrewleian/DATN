package com.example.datnbe.service;

import com.example.datnbe.dto.CustomerChangeInforDTO;
import com.example.datnbe.dto.CustomerDTO;
import com.example.datnbe.payload.LoginRequest;
import com.example.datnbe.request.ForgotPasswordRequest;

public interface CustomerChangePass {

    CustomerChangeInforDTO inforCustomer();

    CustomerDTO changeInforCustomer(CustomerDTO dto);

    LoginRequest changePass(ForgotPasswordRequest dto) throws Exception;

    Boolean confimOtp(String otp);
}
