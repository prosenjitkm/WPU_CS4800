package com.example.backend.service;

import com.example.backend.exception.product.ProductNotFoundException;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id " + id));
    }

    @Transactional
    public Product create(Product product) {
        log.info("Creating new product: {}", product.getProductId());
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            log.error("Error creating product: {}", product.getProductId(), e);
            throw new ProductNotFoundException("Failed to create product with id " + product.getProductId());
        }
    }

    @Transactional
    public Product update(Long id, Product product) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        product.setId(id); // Ensure the correct product is updated
        return productRepository.save(product);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }

    public List<Product> getAllProductsForUser(Long userId) {
        return productRepository.findByUserId(userId);
    }
}
