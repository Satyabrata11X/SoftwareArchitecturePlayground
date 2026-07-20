package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }

}