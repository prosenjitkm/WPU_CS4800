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

@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductController {

    private final ProductService productService;

    @PostMapping(UrlConstants.ADD_PRODUCT)
    public ResponseEntity<Object> addProduct(@RequestBody Product product) {
        try {
            Product createdProduct = productService.create(product);
            log.info("Product with ID {} successfully deleted", createdProduct.getId());
            SuccessResponse successResponse = new SuccessResponse("Product successfully created with ID: " + createdProduct.getId());
            return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while adding product", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while adding the product.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = UrlConstants.UPDATE_PRODUCT)
    public ResponseEntity<Object> updateProduct(@PathVariable Long id,
                                                @RequestBody Product product) {
        try {
            Product updatedProduct = productService.update(id, product);
            log.info("Product with ID {} successfully updated: {}", id, updatedProduct);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error("Product with ID {} not found: {}", id, ex.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception e) {
            log.error("Error while updating product with ID {}", id, e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while updating the product with ID " + id), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping(UrlConstants.DELETE_PRODUCT)
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        try {
            productService.delete(id);
            log.info("Product with ID {} successfully deleted", id);
            SuccessResponse successResponse = new SuccessResponse("Product with ID " + id + " successfully deleted");
            return new ResponseEntity<>(successResponse, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error("Product with ID {} not found: {}", id, ex.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception ex) {
            log.error("Error during product deletion with ID {}", id, ex);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while deleting the product with ID " + id), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
