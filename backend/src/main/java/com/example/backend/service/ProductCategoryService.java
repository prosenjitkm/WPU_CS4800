package com.example.backend.service;

import com.example.backend.dto.ProductCategoryRequestDTO;
import com.example.backend.model.ProductCategory;
import com.example.backend.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    public void createProductCategory(ProductCategoryRequestDTO request) {
        ProductCategory category = new ProductCategory();
        category.setCategoryName(request.getCategoryName());
        productCategoryRepository.save(category);
    }
}
