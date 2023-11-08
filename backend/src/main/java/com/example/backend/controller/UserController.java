package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.exception.login.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.model.UserCategory;
import com.example.backend.response.ErrorResponse;
import com.example.backend.response.SuccessResponse;
import com.example.backend.service.UserCategoryService;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "User Management")
@RestController
@RequiredArgsConstructor
@Log4j2
public class UserController {

    private final UserService userService;
    private final UserCategoryService userCategoryService;

    @Operation(summary = "Add a new user category")
    @PostMapping(value = UrlConstants.ADD_USER_CATEGORY, consumes = "application/json")
    public ResponseEntity<Object> addUserCategory(
            @Parameter(description = "User category", required = true)
            @RequestBody UserCategory userCategory) {
        try {
            UserCategory createdUserCategory = userCategoryService.createUserCategory(userCategory);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new SuccessResponse("User category successfully created with ID: " + createdUserCategory.getUserCategoryId(), createdUserCategory)
            );
        } catch (Exception e) {
            log.error("Error while adding user category", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ErrorResponse("An unexpected error occurred while adding the user category.", e.getMessage())
            );
        }
    }

    @Operation(summary = "Add a new user")
    @PostMapping(value = UrlConstants.ADD_USER, consumes = "application/json")
    public ResponseEntity<Object> addUser(
            @Parameter(description = "User object to be added", required = true)
            @RequestBody User user) {
        try {
            User createdUser = userService.create(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("User successfully created with ID: " + createdUser.getUserId(), createdUser));
        }catch (DataIntegrityViolationException e) {
            log.error("User creation failed due to constraint violation: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("User creation failed. A user with the same username or email might already exist.", e.getMessage()));
        }
        catch (Exception e) {
            log.error("Error while adding user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("An unexpected error occurred while adding the user.", e.getMessage()));
        }
    }

    @Operation(summary = "Delete a user by ID")
    @DeleteMapping(value = UrlConstants.DELETE_USER)
    public ResponseEntity<Object> deleteUser(
            @Parameter(description = "ID of the user to be deleted", required = true)
            @PathVariable Long userId) {
        try {
            userService.delete(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            log.error("Error while deleting user with ID: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("An unexpected error occurred while deleting the user.", e.getMessage()));
        }
    }

    @Operation(summary = "Update a user by ID")
    @PutMapping(value = UrlConstants.UPDATE_USER)
    public ResponseEntity<Object> updateUser(
            @Parameter(description = "ID of the user to be updated", required = true)
            @PathVariable Long userId,
            @Parameter(description = "Updated user object", required = true)
            @RequestBody User user) {
        try {
            User updatedUser = userService.update(userId, user);
            return ResponseEntity.ok(new SuccessResponse("User with ID: " + updatedUser.getUserId() + " successfully updated.", updatedUser));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            log.error("Error while updating user with ID: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("An unexpected error occurred while updating the user.", e.getMessage()));
        }
    }

    @Operation(summary = "Get a user by username")
    @GetMapping(value = UrlConstants.GET_USER_BY_USERNAME)
    public ResponseEntity<Object> getUserByUsername(
            @Parameter(description = "Username of the user to be retrieved", required = true)
            @PathVariable String username) {
        try {
            User user = userService.getByUsername(username);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("User with username: " + username + " not found."));
            }
        } catch (Exception e) {
            log.error("Error while fetching user with username: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("An unexpected error occurred while fetching the user.", e.getMessage()));
        }
    }

    @Operation(summary = "Get a list of all users")
    @GetMapping(value = UrlConstants.LIST_ALL_USERS)
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            if (!users.isEmpty()) {
                return ResponseEntity.ok(users);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("No users found."));
            }
        } catch (Exception e) {
            log.error("Error while fetching all users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("An unexpected error occurred while fetching all users.", e.getMessage()));
        }
    }
}
