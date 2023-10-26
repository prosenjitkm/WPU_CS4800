package com.example.backend.service;

import com.example.backend.dto.ProfileDTO;
import com.example.backend.enums.Roles;
import com.example.backend.exception.login.InvalidRoleException;
import com.example.backend.exception.login.UserNotActiveException;
import com.example.backend.exception.login.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User authenticateWithExceptions(String username, String password) throws UserNotActiveException, InvalidRoleException, UserNotFoundException {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new UserNotFoundException("The provided username does not exist. Login unsuccessful."));

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Password does not match. Login unsuccessful.");
        }

        if (!user.isActive()) {
            throw new UserNotActiveException("User is not active. Login unsuccessful.");
        }

        if (user.getRole() != Roles.ADMIN && user.getRole() != Roles.BUYER && user.getRole() != Roles.SELLER) {
            throw new InvalidRoleException("User does not have a role set. Login unsuccessful.");
        }

        return user;
    }

    @Transactional
    public User create(User user) {
        log.info("Creating new user: {}", user.getUserName());
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            log.error("Error creating user: {}", user.getUserName(), e);
            throw e;
        }
    }

    @Transactional
    public void delete(Long userId) {
        if(userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            log.error("User not found with id: {}", userId);
            throw new UserNotFoundException("User not found with id " + userId);
        }
    }

    @Transactional
    public User update(Long userId, User updatedUser) {
        if(userRepository.existsByUserId(userId)) {
            updatedUser.setUserId(userId);
            return userRepository.save(updatedUser);
        } else {
            log.error("User not found with id: {}", userId);
            throw new UserNotFoundException("User not found with id " + userId);
        }
    }

    public ProfileDTO convertToProfileDTO(User user) {
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setFirstName(user.getFirstName());
        profileDTO.setLastName(user.getLastName());
        profileDTO.setDateOfBirth(user.getDateOfBirth());
        profileDTO.setGender(user.getGender());
        profileDTO.setEmail(user.getEmail());
        profileDTO.setPhone(user.getPhone());
        profileDTO.setHouseNumber(user.getHouseNumber());
        profileDTO.setStreetName(user.getStreetName());
        profileDTO.setCity(user.getCity());
        profileDTO.setState(user.getState());
        profileDTO.setZipCode(user.getZipCode());
        profileDTO.setCountry(user.getCountry());
        return profileDTO;
    }

    public User getByUsername(String username) {
        return userRepository.findByUserName(username).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
