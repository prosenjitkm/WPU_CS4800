package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.exception.product.ProductNotFoundException;
import com.example.backend.model.Product;
import com.example.backend.model.ProductCategory;
import com.example.backend.response.SuccessResponse;
import com.example.backend.service.ProductCategoryService;
import com.example.backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.backend.response.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Product Management")
@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductController {

    private final ProductService productService;
    private final ProductCategoryService productCategoryService;

    @Operation(summary  = "Add a new product category")
    @PostMapping(value = UrlConstants.ADD_CATEGORY, consumes = "application/json")
    public ResponseEntity<Object> addProductCategory(
            @Parameter(description = "Product category", required = true)
            @RequestBody ProductCategory productCategory) {
        try {
            ProductCategory createdProductCategory = productCategoryService.createProductCategory(productCategory);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new SuccessResponse("Product category successfully created with ID: " + createdProductCategory.getProductCategoryId(), createdProductCategory)
            );
        } catch (Exception e) {
            log.error("Error while adding user category", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ErrorResponse("An unexpected error occurred while adding the product category.", e.getMessage())
            );
        }
    }


    @Operation(summary = "Add a new product")
    @PostMapping(value = UrlConstants.ADD_PRODUCT, consumes = "application/json")
    public ResponseEntity<Object> addProduct(
            @Parameter(description = "Product object to be added", required = true)
            @RequestBody Product product) {
        try {
            Product createdProduct = productService.create(product);
            log.info("Product with ID {} successfully created", createdProduct.getProductId());
            SuccessResponse successResponse = new SuccessResponse("Product successfully created with ID: " + createdProduct.getProductId());
            return new ResponseEntity<>(successResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while adding product", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while adding the product.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Update an existing product")
    @PutMapping(value = UrlConstants.UPDATE_PRODUCT, consumes = "application/json")
    public ResponseEntity<Object> updateProduct(
            @Parameter(description = "ID of the product to be updated", required = true)
            @PathVariable Long productId,
            @Parameter(description = "Updated product object", required = true)
            @RequestBody Product product) {
        try {
            Product updatedProduct = productService.update(productId, product);
            log.info("Product with ID {} successfully updated", productId);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error("Product with ID {} not found", productId, ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception e) {
            log.error("Error while updating product with ID {}", productId, e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while updating the product with ID " + productId), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Delete a product by ID")
    @DeleteMapping(value = UrlConstants.DELETE_PRODUCT, consumes = "application/json")
    public ResponseEntity<Object> deleteProduct(
            @Parameter(description = "ID of the product to be deleted", required = true)
            @PathVariable Long productId) {
        try {
            productService.delete(productId);
            log.info("Product with ID {} successfully deleted", productId);
            SuccessResponse successResponse = new SuccessResponse("Product with ID " + productId + " successfully deleted");
            return new ResponseEntity<>(successResponse, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error("Product with ID {} not found", productId, ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception ex) {
            log.error("Error during product deletion with ID {}", productId, ex);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while deleting the product with ID " + productId), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get all products for a given user")
    @GetMapping(value = UrlConstants.GET_ALL_PRODUCTS_FOR_A_USER, consumes = "application/json")
    public ResponseEntity<Object> getAllProductsForGivenUserId(
            @Parameter(description = "ID of the user to retrieve products for", required = true)
            @PathVariable Long userId) {
        try {
            List<Product> productsForUser = productService.getAllProductsForUser(userId);
            log.info("Fetched products for user with ID {}", userId);

            if (!productsForUser.isEmpty()) {
                return ResponseEntity.ok(productsForUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("No products found for the given user."));
            }
        } catch(Exception e) {
            log.error("Error fetching products for user ID {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Error fetching products."));
        }
    }
}
