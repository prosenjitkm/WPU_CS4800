package com.example.backend.service;

import com.example.backend.exception.product.ProductNotFoundException;
import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Product not found with id: {}", id);
                    return new ProductNotFoundException("Product not found with id " + id);
                });
    }

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

    @Transactional
    public Product update(Long id, Product product) {
        if(productRepository.existsById(id)) {
            product.setId(id); // Setting the product ID to ensure the correct product is updated
            return productRepository.save(product);
        } else {
            log.error("Product not found with id: {}", id);
            throw new ProductNotFoundException("Product not found with id " + id);
        }
    }

    @Transactional
    public void delete(Long id) {
        if(productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            log.error("Product not found with id: {}", id);
            throw new ProductNotFoundException("Product not found with id " + id);
        }
    }
}
