package com.example.backend.controller;

import com.example.backend.constants.UrlConstants;
import com.example.backend.dto.ProductCategoryRequestDTO;
import com.example.backend.response.ErrorResponse;
import com.example.backend.service.ProductCategoryService;
import com.example.backend.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @PostMapping(UrlConstants.ADD_CATEGORY)
    public ResponseEntity<Object> addProductCategory(@RequestBody ProductCategoryRequestDTO request) {
        try {
            productCategoryService.createProductCategory(request);
            return new ResponseEntity<>(new SuccessResponse("Product category successfully created!"), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error while adding product category", e);
            return new ResponseEntity<>(new ErrorResponse("An unexpected error occurred while adding the product category.", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
