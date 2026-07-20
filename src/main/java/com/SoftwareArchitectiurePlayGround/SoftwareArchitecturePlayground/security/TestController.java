package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test(Authentication authentication) {

        if (authentication == null) {
            return "Authentication is NULL";
        }

        return """
                ==============================
                JWT Authentication Successful
                ==============================
                Username : %s
                Authorities : %s
                Authenticated : %s
                """.formatted(
                authentication.getName(),
                authentication.getAuthorities(),
                authentication.isAuthenticated()
        );
    }
}