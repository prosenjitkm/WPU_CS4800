package com.example.backend.service;

import com.example.backend.dto.ProfileDTO;
import com.example.backend.exception.login.InvalidRoleException;
import com.example.backend.exception.login.UserNotActiveException;
import com.example.backend.exception.login.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.model.UserCategory;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Log4j2
public class UserService{

    private final UserRepository userRepository;
    private static final Set<String> VALID_USER_CATEGORIES = Set.of("ADMIN", "BUYER", "SELLER");

    public User authenticateWithExceptions(String username, String password) throws UserNotActiveException, InvalidRoleException, UserNotFoundException {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new UserNotFoundException("The provided username does not exist. Login unsuccessful."));

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Password does not match. Login unsuccessful.");
        }

        if (!user.isActive()) {
            throw new UserNotActiveException("User is not active. Login unsuccessful.");
        }

        // Check if the user has a valid category set
        UserCategory userCategory = user.getUserCategory();
        if (userCategory == null || !VALID_USER_CATEGORIES.contains(userCategory.getCategoryName())) {
            throw new InvalidRoleException("User does not have a valid category set. Login unsuccessful.");
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

    @Transactional(readOnly = true)
    public ProfileDTO getProfileByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUserName(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            ProfileDTO profileDTO = new ProfileDTO();
            // Assuming your User entity has getters for these fields
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
            // ... any other fields you wish to add to the profile
            return profileDTO;
        } else {
            // User not found, throw an exception or handle it accordingly
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    public User getByUsername(String username) {
        return userRepository.findByUserName(username).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUserName(username).orElse(null);
    }
}
