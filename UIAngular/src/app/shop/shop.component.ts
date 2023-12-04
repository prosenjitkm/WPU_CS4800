/*shop.component.ts*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth/auth.service";
import { Product } from "../models/productModel";
import { ProductCategory } from "../models/productCategoryModel";
import { CartService } from "../service/cart/cart.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  productCategories: ProductCategory[] = [];

  constructor(private authService: AuthService,
              private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    // Replace with your actual data fetching logic
    this.authService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  loadCategories() {
    // Replace with your actual data fetching logic
    this.authService.getAllProductCategories().subscribe((data: ProductCategory[]) => {
      this.productCategories = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // Optionally show a message to the user
  }

  onCategorySelected(productCategoryId: number) {
    // Add your category filtering logic here
    if (productCategoryId === 0) {
      this.loadProducts();
    } else {
      // Replace with your actual data fetching logic
      this.authService.getProductsByProductCategory(productCategoryId).subscribe((data: Product[]) => {
        this.products = data;
      });
    }
  }
}
