package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter  // Generates getter methods for all fields
@Setter  // Generates setter methods for all fields
@AllArgsConstructor  // Generates a constructor with all fields as parameters
@NoArgsConstructor   // Generates a no-args constructor
public class ErrorResponse {
    private String errorMessage;
}
