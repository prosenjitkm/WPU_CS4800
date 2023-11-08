package com.example.backend.repository;

import com.example.backend.model.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {
}
