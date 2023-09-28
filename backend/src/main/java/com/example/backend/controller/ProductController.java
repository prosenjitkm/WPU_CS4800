package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.exception.product.ProductNotFoundException;
import com.example.backend.model.Product;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.example.backend.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(UrlConstants.BASE_PRODUCT_URL)
@RequiredArgsConstructor
@Log4j2
public class ProductController {

    private static final String PRODUCT_NOT_FOUND_MESSAGE = "Product not found";


    private final ProductService productService;

    @PostMapping(value = UrlConstants.ADD_PRODUCT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> addProduct(@RequestPart("product") Product product,
                                             @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                product.setProductImage(imageBytes);
            }
            Product newProduct = productService.create(product);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while adding product", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while adding the product."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = UrlConstants.UPDATE_PRODUCT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> updateProduct(@PathVariable Long id,
                                                @RequestPart("product") Product product,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                product.setProductImage(imageBytes);
            }
            Product updatedProduct = productService.update(id, product);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            log.error(PRODUCT_NOT_FOUND_MESSAGE, ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception e) {
            log.error("Error while updating product", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while updating the product."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(UrlConstants.GET_PRODUCT_IMAGE)
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        try {
            Product product = productService.findById(id);
            byte[] image = product.getProductImage();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
        } catch (ProductNotFoundException ex) {
            log.error(PRODUCT_NOT_FOUND_MESSAGE, ex);
            return ResponseEntity.badRequest().body(null);
        } catch (Exception ex) {
            log.error("Error retrieving product image", ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(UrlConstants.DELETE_PRODUCT)
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ProductNotFoundException ex) {
            log.error(PRODUCT_NOT_FOUND_MESSAGE, ex);
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        } catch (Exception ex) {
            log.error("Error during product deletion", ex);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while deleting the product."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
