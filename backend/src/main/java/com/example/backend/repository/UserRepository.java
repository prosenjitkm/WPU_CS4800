package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserName(String username);  // Changed method to match the new field name

    boolean existsByUserId(Long userId);

    Optional<User> findTopByOrderByUserIdDesc();
}
