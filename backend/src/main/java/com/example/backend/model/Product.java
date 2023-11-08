package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.util.Date;

@Schema(description = "Details about the product")
@Entity
@Table(name = "PRODUCTS")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    @Schema(description = "The unique ID of the product")
    private Long productId;

    @Column(name = "product_name")
    @Schema(description = "The name of the product")
    private String productName;

    @Column(name = "product_quantity")
    @Schema(description = "The quantity of the product in stock")
    private Long productQuantity;

    @Column(name = "product_price")
    @Schema(description = "The price of the product")
    private Double productPrice;

    @Column(name = "product_description")
    @Schema(description = "The description of the product")
    private String productDescription;

    @Column(name = "product_image_url")
    @Schema(description = "The URL of the product image")
    private String productImageUrl;

    @Column(name = "product_sale_price")
    @Schema(description = "The sale price of the product")
    private Double productSalePrice;

    @Column(name = "is_On_Sale")
    @Schema(description = "Indicates if the product is on sale")
    private Boolean isOnSale;

    @Column(name = "is_available")
    @Schema(description = "Indicates if the product is available")
    private Boolean isAvailable;

    @Column(name = "created_date", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdDate;

    @Column(name = "last_modified_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date lastModifiedDate;

    @JsonBackReference("userProduct")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @Schema(description = "The user who added the product")
    private User user;

    @JsonBackReference("categoryProduct")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id", referencedColumnName = "product_category_id")
    @Schema(description = "The category of the product")
    private ProductCategory productCategory;
}
