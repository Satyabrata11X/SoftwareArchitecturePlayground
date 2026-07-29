package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security.dto.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/users/me")
    public UserProfileResponse getCurrentUser(Authentication authentication) {

        User user = userService.findByEmail(authentication.getName());

        return UserProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .initials(user.getInitials())
                .build();
    }
}