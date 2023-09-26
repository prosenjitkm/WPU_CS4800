package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public Product create(Product product) {
        log.info("Creating new product: {}", product.getProductName());
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            log.error("Error creating product: {}", product.getProductName(), e);
            throw e;
        }
    }
}
