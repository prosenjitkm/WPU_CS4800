package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Date;

@Entity
@Table(name = "products")  // renamed to users
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long UserId; // the user who added the product

    @Column(name = "product_id")
    private Long productId;

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

    @Lob
    @Column(name = "product_image")
    private byte[] productImage;
}
