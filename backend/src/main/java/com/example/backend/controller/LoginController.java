package com.example.backend.controller;

import com.example.backend.security.JwtTokenProvider;

import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.exception.login.InvalidRoleException;
import com.example.backend.exception.login.UserNotActiveException;
import com.example.backend.exception.login.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.response.ErrorResponse;
import com.example.backend.response.SuccessResponse;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Log4j2
public class LoginController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/api/auth/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        try {
            User user = userService.authenticateWithExceptions(loginRequest.getUsername(), loginRequest.getPassword());
            String token = jwtTokenProvider.createToken(user.getUserName(), user.getRole().name());
            SuccessResponse successResponse = new SuccessResponse("User " + loginRequest.getUsername() + " successfully authenticated.", token);
            return new ResponseEntity<>(successResponse, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            log.error("User not found", ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (UserNotActiveException ex) {
            log.error("User not active", ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (InvalidRoleException ex) {
            log.error("Invalid role", ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (IllegalArgumentException ex) {
            log.error("Password mismatch", ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception ex) {
            log.error("Error during authentication", ex);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred during login.", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}