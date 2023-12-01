import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { Product } from "../productModel";
import { ProductCategory } from "../productCategoryModel";

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
    this.authService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  loadCategories() {
    this.authService.getAllProductCategories().subscribe((data: ProductCategory[]) => {
      this.categories = data;
    });
  }

  onCategorySelected(categoryId: number) {
    // Implement filtering logic here
    if (categoryId === 0) {
      this.loadProducts();
    } else {
      this.authService.getAllProducts().subscribe((data: Product[]) => {
        this.products = data.filter(product => product.productCategory.productCategoryId === categoryId);
      });
    }
  }
}
