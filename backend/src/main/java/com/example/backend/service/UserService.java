package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User createUser(User user) {
        log.info("Creating new user");
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            log.error("Error creating user", e);
            throw e;
        }
    }

    public User authenticate(String username, String password) {
        return userRepository.findByUserName(username)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    @Transactional
    public void deleteUser(Long id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

    @Transactional
    public User updateUser(Long id, User updatedUser) {
        if(userRepository.existsById(id)) {
            // Ensure the user's ID remains unchanged
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }
}
