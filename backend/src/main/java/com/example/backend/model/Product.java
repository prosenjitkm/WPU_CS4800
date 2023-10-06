package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "user_id")
    private Long userId; // the user who added the product

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_category")
    private String productCategory;

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

    @Column(name = "posted_date")
    private Date postedDate;
}
