package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.exception.login.UserNotActiveException;
import com.example.backend.exception.login.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.response.ErrorResponse;
import com.example.backend.response.SuccessResponse;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Authentication", description = "Authentication operations")
@RestController
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    private final UserService userService;

    @Operation(summary = "Login a user")
    @PostMapping(value = UrlConstants.LOGIN_USER, consumes = "application/json")
    public ResponseEntity<Object> login(
            @Parameter(description = "Request body for login", required = true)
            @RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            User user = userService.authenticateWithExceptions(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
            return ResponseEntity.ok(new SuccessResponse("Login successful", user));
        } catch (UserNotFoundException | UserNotActiveException e) {
            log.error("Login failed for user: {}", loginRequestDTO.getUsername(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        } catch (IllegalArgumentException e) {
            log.error("Invalid password for user: {}", loginRequestDTO.getUsername(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid password"));
        } catch (Exception e) {
            log.error("Login error for user: {}", loginRequestDTO.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("An unexpected error occurred during login", e.getMessage()));
        }
    }
}
