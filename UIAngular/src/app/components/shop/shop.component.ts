/*shop.component.ts*/
import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../service/product/product.service";
import { AuthorizationService } from "../../service/auth/authorization.service";
import { Product } from "../../models/productModel";
import { ProductCategory } from "../../models/productCategoryModel";
import { ToastrService } from "ngx-toastr";
import { CartService } from "../../service/cart/cart.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  productCategories: ProductCategory[] = [];

  constructor(
      private productService: ProductService,
      private cartService: CartService,
      private authService: AuthorizationService,
      private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching products:', error);
      this.toastr.error('Error loading products');
    });
  }

  loadCategories() {
    this.productService.getAllProductCategories().subscribe((data: ProductCategory[]) => {
      this.productCategories = data;
    }, error => {
      console.error('Error fetching categories:', error);
      this.toastr.error('Error loading categories');
    });
  }

  /*addToCart(product: Product) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.cartService.addProductToCart(userId, product.id, 1).subscribe(() => {
        this.toastr.success('Product added to cart');
      }, error => {
        console.error('Error adding product to cart:', error);
        this.toastr.error('Error adding product to cart');
      });
    } else {
      this.toastr.error('User not identified');
    }
  }*/

  onCategorySelected(productCategoryId: number) {
    if (productCategoryId === 0) {
      this.loadProducts();
    } else {
      this.productService.getProductsByProductCategory(productCategoryId).subscribe((data: Product[]) => {
        this.products = data;
      }, error => {
        console.error('Error filtering products:', error);
        this.toastr.error('Error filtering products');
      });
    }
  }
}
