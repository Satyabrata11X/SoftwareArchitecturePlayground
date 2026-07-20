package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }

}