package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.exception.product.ProductNotFoundException;
import com.example.backend.model.Product;
import com.example.backend.response.SuccessResponse;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.backend.response.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductController {

    private final ProductService productService;

    @PostMapping(UrlConstants.ADD_PRODUCT)
    public ResponseEntity<Object> addProduct(@RequestBody Product product) {
        try {
            Product createdProduct = productService.create(product);
            log.info("Product with ID {} successfully deleted", createdProduct.getProductId());
            SuccessResponse successResponse = new SuccessResponse("Product successfully created with ID: " + createdProduct.getProductId());
            return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while adding product", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while adding the product.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = UrlConstants.UPDATE_PRODUCT)
    public ResponseEntity<Object> updateProduct(@PathVariable Long productId,
                                                @RequestBody Product product) {
        try {
            Product updatedProduct = productService.update(productId, product);
            log.info("Product with ID {} successfully updated: {}", productId, updatedProduct);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error("Product with ID {} not found: {}", productId, ex.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception e) {
            log.error("Error while updating product with ID {}", productId, e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while updating the product with ID " + productId), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping(UrlConstants.DELETE_PRODUCT)
    public ResponseEntity<Object> deleteProduct(@PathVariable Long productId) {
        try {
            productService.delete(productId);
            log.info("Product with ID {} successfully deleted", productId);
            SuccessResponse successResponse = new SuccessResponse("Product with ID " + productId + " successfully deleted");
            return new ResponseEntity<>(successResponse, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error("Product with ID {} not found: {}", productId, ex.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception ex) {
            log.error("Error during product deletion with ID {}", productId, ex);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while deleting the product with ID " + productId), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = UrlConstants.GET_ALL_PRODUCTS_FOR_A_USER)
    public ResponseEntity<Object> getAllProductsForGivenUserId(@PathVariable Long userId){
        try {
            log.info("Fetching all products for the user: " + userId);
            List<Product> productsForUser = productService.getAllProductsForUser(userId);

            if (!productsForUser.isEmpty()) {
                return ResponseEntity.ok(productsForUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("No product found for the given user."));
            }
        } catch(Exception e) {
            log.error("Error fetching products for user: " + userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Error fetching products."));
        }
    }
}
