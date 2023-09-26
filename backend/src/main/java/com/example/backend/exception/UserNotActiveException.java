package com.example.backend.exception;

public class UserNotActiveException extends RuntimeException {

    public UserNotActiveException() {
        super();
    }

    public UserNotActiveException(String message) {
        super(message);
    }

    public UserNotActiveException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotActiveException(Throwable cause) {
        super(cause);
    }
}
