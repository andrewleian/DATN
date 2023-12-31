package com.example.datnbe.exception;


import lombok.Data;

import java.util.List;
@Data
public class MyCustomException extends RuntimeException {
    private final String message;
    private final List<String> messages;

    public MyCustomException(String message) {
        super(message);
        this.message = message;
        this.messages = null; // or initialize to an empty list if needed
    }

    public String getMessage() {
        if (message != null) {
            return message;
        } else if (messages != null) {
            return messages.toString();
        } else {
            return null;
        }
    }

    public MyCustomException(List<String> messages) {
        super(messages.toString());
        this.message = null; // or set to an empty string
        this.messages = messages;
    }
}
