package com.example.backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuccessResponse {
    private String successMessage;
    private Object payload;

    public SuccessResponse(String successMessage) {
        this.successMessage = successMessage;
    }
}
