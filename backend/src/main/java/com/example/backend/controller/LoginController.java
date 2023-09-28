package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.exception.login.InvalidRoleException;
import com.example.backend.exception.login.UserNotActiveException;
import com.example.backend.exception.login.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Log4j2
public class LoginController {

    private final UserService userService;

    @PostMapping(value = UrlConstants.LOGIN_USER)
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        try {
            User user = userService.authenticateWithExceptions(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            log.error("User not found", ex);
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (UserNotActiveException ex) {
            log.error("User not active", ex);
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (InvalidRoleException ex) {
            log.error("Invalid role", ex);
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (IllegalArgumentException ex) {  // catching the password mismatch exception
            log.error("Password mismatch", ex);
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            log.error("Error during authentication", ex);
            return ResponseEntity.badRequest().body("An unexpected error occurred during login.");
        }
    }

}
