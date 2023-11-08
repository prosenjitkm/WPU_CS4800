package com.example.backend.controller;

import com.example.backend.dto.ProfileDTO;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    @Autowired
    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProfileDTO> getProfile() {
        // Retrieve the current authentication object from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the username from the authentication object

        ProfileDTO profile = userService.getProfileByUsername(username);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
