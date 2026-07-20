package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with email: " + email));

    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}