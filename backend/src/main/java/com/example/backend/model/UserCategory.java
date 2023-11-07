package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Schema(description = "Details about the user category")
@Entity
@Table(name = "USER_CATEGORIES")
@Getter
@Setter
@NoArgsConstructor
public class UserCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_id")
    @Schema(description = "The unique ID of the user category")
    private Long userCategoryId;

    @Column(name = "category_name", nullable = false, unique = true)
    @Schema(description = "The name of the user category")
    private String categoryName;

    @JsonManagedReference("userCategory")
    @OneToMany(mappedBy = "userCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    @Schema(description = "The users associated with this category")
    private List<User> users;
}
