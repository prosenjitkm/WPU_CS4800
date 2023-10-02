package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.model.User;
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

    @PostMapping(UrlConstants.ADD_USER)
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User newUser = userService.create(user); // Changed from createUser to create
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(UrlConstants.DELETE_USER)
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        try {
            userService.delete(id); // Changed from deleteUser to delete
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(UrlConstants.UPDATE_USER)
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.update(id, user); // Changed from updateUser to update
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(UrlConstants.GET_USER_BY_USERNAME)
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        try {
            User user = userService.getByUsername(username); // Changed from getUserByUsername to getByUsername
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = UrlConstants.LIST_ALL_USERS)
    public ResponseEntity<List<User>> getAllUsers() {
        log.info("Fetching all users...");
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
