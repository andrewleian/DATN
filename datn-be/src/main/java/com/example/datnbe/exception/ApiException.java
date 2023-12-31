package com.example.datnbe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ApiException {
//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ErrorResponse handleException(Exception ex) {
//        ErrorResponse errorResponse = new ErrorResponse(500, "Lỗi hệ thống");
//        return errorResponse;
//    }

    @ExceptionHandler(CustomerException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(CustomerException ex) {
        ErrorResponse errorResponse = new ErrorResponse(500, ex.getError());
        return errorResponse;
    }

    @ExceptionHandler(MessagingException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MessagingException ex) {
        ex.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse(500, "Gửi email thất bại!");
        return errorResponse;
    }
}
