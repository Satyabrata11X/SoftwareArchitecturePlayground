package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Security;

public record AuthResponse(

        String token,
        String fullName,
        String email,
        Role role,
        String message

) {
}