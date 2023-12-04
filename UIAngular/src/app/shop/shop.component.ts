/*shop.component.ts*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import {Product} from "../models/productModel";
import {ProductCategory} from "../models/productCategoryModel";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: ProductCategory[] = [];

  constructor(private authService: AuthService) {}

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
      this.categories = data;
    });
  }

  onCategorySelected(categoryId: number) {
    // Add your category filtering logic here
    if (categoryId === 0) {
      this.loadProducts();
    } else {
      // Replace with your actual data fetching logic
      this.authService.getProductsByCategory(categoryId).subscribe((data: Product[]) => {
        this.products = data;
      });
    }
  }
}
