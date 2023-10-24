package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Table(name = "PRODUCTS")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    // Relationship with User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;  // the user who added the product

    @Column(name = "product_name")
    private String productName;

    // Relationship with ProductCategory
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id", referencedColumnName = "product_category_id")
    private ProductCategory productCategory;

    @Column(name = "product_quantity")
    private Long productQuantity;

    @Column(name = "product_price")
    private Long productPrice;

    @Column(name = "product_description")
    private String productDescription;

    @Column(name = "product_sale_price")
    private Long productSalePrice;

    @Column(name = "is_On_Sale")
    private Boolean isOnSale;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "created_date", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdDate;

    @Column(name = "last_modified_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date lastModifiedDate;
}