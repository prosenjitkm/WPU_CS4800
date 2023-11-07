package com.example.backend.service;

import com.example.backend.model.UserCategory;
import com.example.backend.repository.UserCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class UserCategoryService {

    private final UserCategoryRepository userCategoryRepository;

    @Transactional
    public UserCategory createUserCategory(UserCategory userCategory) {
        return userCategoryRepository.save(userCategory);
    }
}
