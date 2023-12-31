package com.example.datnbe.exception;

import org.springframework.http.HttpStatus;

public class MyException extends RuntimeException {

    private HttpStatus status;
    private String message;
    public MyException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
