package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Schema(description = "Details about the user")
@Table(name = "USERS")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    @Schema(description = "The unique ID of the user")
    private Long userId;

    @Column(name = "user_name")
    @Schema(description = "The username used for login")
    private String userName;

    @Column(name = "password")
    @Schema(description = "The password for user account")
    private String password;

    @Column(name = "first_name")
    @Schema(description = "The first name of the user")
    private String firstName;

    @Column(name = "last_name")
    @Schema(description = "The last name of the user")
    private String lastName;

    @Column(name = "date_of_birth")
    @Schema(description = "The date of birth of the user")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    @Schema(description = "The gender of the user")
    private String gender;

    @Column(name = "email")
    @Schema(description = "The email address of the user")
    private String email;

    @Column(name = "phone")
    @Schema(description = "The phone number of the user")
    private String phone;

    @Column(name = "house_number")
    @Schema(description = "The house number of the user's address")
    private String houseNumber;

    @Column(name = "street_name")
    @Schema(description = "The street name of the user's address")
    private String streetName;

    @Column(name = "city")
    @Schema(description = "The city of the user's address")
    private String city;

    @Column(name = "state")
    @Schema(description = "The state of the user's address")
    private String state;

    @Column(name = "zip_code")
    @Schema(description = "The ZIP code of the user's address")
    private String zipCode;

    @Column(name = "country")
    @Schema(description = "The country of the user's address")
    private String country;

    @Column(name = "is_active")
    @Schema(description = "Whether the user is active or not")
    private boolean isActive;

    @Column(name = "created_date", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Schema(description = "The creation date of the user's record")
    private Date createdDate;

    @Column(name = "last_modified_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Schema(description = "The last modified date of the user's record")
    private Date lastModifiedDate;

    @JsonBackReference("userCategory")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_category_id")
    private UserCategory userCategory;

    // Relationship with Product
    @JsonManagedReference("userProduct")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Schema(description = "List of products associated with the user")
    private List<Product> products;
}
