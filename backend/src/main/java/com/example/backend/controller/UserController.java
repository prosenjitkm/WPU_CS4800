package com.example.backend.controller;

import com.example.backend.config.JwtConfig;
import com.example.backend.constants.UrlConstants;
import com.example.backend.dto.ProfileDTO;
import com.example.backend.model.User;
import com.example.backend.response.ErrorResponse;
import com.example.backend.response.SuccessResponse;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider; // Injection
    private final JwtConfig jwtConfig;

    @PostMapping(UrlConstants.ADD_USER)
    public ResponseEntity<Object> addUser(@RequestBody User user) {
        try {
            User createdUser = userService.create(user);
            SuccessResponse successResponse = new SuccessResponse("User successfully created with ID: " + createdUser.getUserId());
            return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while adding user", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while adding the user.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(UrlConstants.DELETE_USER)
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long userId) {
        try {
            userService.delete(userId); // Changed from deleteUser to delete
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(UrlConstants.UPDATE_USER)
    public ResponseEntity<Object> updateUser(@PathVariable Long userId, @RequestBody User user) {
        try {
            User updatedUser = userService.update(userId, user); // Changed from updateUser to update
            SuccessResponse successResponse = new SuccessResponse("User with ID: " + updatedUser.getUserId() + " successfully updated.");
            return new ResponseEntity<>(successResponse, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error while updating user with ID: {}", userId, e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while updating the user.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(UrlConstants.GET_USER_BY_USERNAME)
    public ResponseEntity<Object> getUserByUsername(@PathVariable String username) {
        try {
            User user = userService.getByUsername(username); // Changed from getUserByUsername to getByUsername
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("User with username: " + username + " not found."));
            }
        } catch (Exception e) {
            log.error("Error while fetching user with username: {}", username, e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while fetching the user.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = UrlConstants.LIST_ALL_USERS)
    public ResponseEntity<Object> getAllUsers() {
        try {
            log.info("Fetching all users...");
            List<User> users = userService.getAllUsers();
            if (users != null && !users.isEmpty()) {
                return ResponseEntity.ok(users);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("No users found."));
            }
        } catch (Exception e) {
            log.error("Error while fetching all users", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while fetching all users.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/details")
    public ResponseEntity<ProfileDTO> getUserDetails(@RequestHeader("Authorization") String token) {
        try {
            // Extracting token and removing the prefix
            if (token != null && token.startsWith(jwtConfig.getPrefix())) {
                token = token.replace(jwtConfig.getPrefix(), "");
            }
            String username = jwtTokenProvider.getUsername(token);
            User user = userService.getByUsername(username);
            ProfileDTO profileDTO = userService.convertToProfileDTO(user);
            return new ResponseEntity<>(profileDTO, HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error fetching user details", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
