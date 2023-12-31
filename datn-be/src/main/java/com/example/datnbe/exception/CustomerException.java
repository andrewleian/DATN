package com.example.datnbe.exception;

import lombok.Data;

@Data
public class CustomerException extends Exception {
    private String code;
    private String error;

    public CustomerException(String code, String error) {
        this.code = code;
        this.error = error;
    }

    public CustomerException(String error) {
        this.error = error;
    }
}
