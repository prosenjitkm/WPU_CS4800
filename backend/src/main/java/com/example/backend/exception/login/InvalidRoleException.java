package com.example.backend.exception.login;

public class InvalidRoleException extends RuntimeException {

    public InvalidRoleException() {
        super();
    }

    public InvalidRoleException(String message) {
        super(message);
    }

    public InvalidRoleException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidRoleException(Throwable cause) {
        super(cause);
    }
}
