package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

/*    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // All endpoints in the application
                .allowedOrigins("http://localhost:4200") // Source origin allowed to access the end points
                .allowedMethods("*") // Allowed methods (GET, POST, PUT, etc.)
                .maxAge(3600); // Cache duration for CORS preflight responses.
    }*/
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "http://127.0.0.1:4200", "http://localhost:63342")
                .allowedMethods("*")
                .maxAge(3600);
    }
}
