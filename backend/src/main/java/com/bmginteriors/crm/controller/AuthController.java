package com.bmginteriors.crm.controller;

import com.bmginteriors.crm.config.JwtService;
import com.bmginteriors.crm.model.User;
import com.bmginteriors.crm.model.UserRole;
import com.bmginteriors.crm.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid username or password"));
        }
        
        User user = userOpt.get();
        String token = jwtService.generateToken(user.getUsername(), user.getRole());
        
        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getUsername(),
                user.getFullName(),
                user.getRole().name()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Username is already taken"));
        }

        try {
            UserRole role = UserRole.valueOf(request.getRole().toUpperCase());
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName());
            user.setRole(role);
            
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("User registered successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid role. Allowed roles are: ADMIN, CUSTOMER"));
        }
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getCustomers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .filter(u -> u.getRole() == UserRole.CUSTOMER)
                .map(u -> new CustomerResponse(u.getFullName(), u.getUsername()))
                .toList());
    }

    // DTOs
    @Data
    @AllArgsConstructor
    public static class CustomerResponse {
        private String fullName;
        private String username;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        private String username;
        private String password;
        private String fullName;
        private String role;
    }

    @Data
    @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private String username;
        private String fullName;
        private String role;
    }

    @Data
    @AllArgsConstructor
    public static class ErrorResponse {
        private String error;
    }

    @Data
    @AllArgsConstructor
    public static class MessageResponse {
        private String message;
    }
}
