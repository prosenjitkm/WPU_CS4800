package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;
@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // If you are using Postman for testing, you may want to disable CSRF protection
                .authorizeHttpRequests((authz) -> authz
                        .anyRequest().permitAll()  // This is for illustration; in production, you would secure your endpoints
                )
                .httpBasic(withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("jeffrey06")
                .password("password")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }
}

