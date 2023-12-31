package com.example.datnbe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {
    /**
     * Trong service hàm nào gọi đến( throws new MyCustomException ),
     * khi chạy vào ngoại lệ đó thì tự đẩy ra lỗi ( message, status)
     */
    @ExceptionHandler(MyCustomException.class)
    public ResponseEntity<Object> handleCustomException(MyCustomException excep) {
        return new ResponseEntity<>(excep.getMessage(), HttpStatus.BAD_REQUEST);
    }
}