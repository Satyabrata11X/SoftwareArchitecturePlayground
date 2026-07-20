package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    // Register User

    public AuthResponse register(RegisterRequest request) {

        if (userService.existsByEmail(request.email())) {
            throw new UserAlreadyExistsException(
                    "An account with this email already exists."
            );
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .build();

        user = userService.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                "User registered successfully.",
                token
        );
    }


    // Login User

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userService.findByEmail(request.email());

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                "Login successful.",
                token
        );
    }
}