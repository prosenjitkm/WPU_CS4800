/*product-list-for-shop.component.ts*/
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/productModel';
import { AuthorizationService } from "../../service/auth/authorization.service";
import { ToastrService } from "ngx-toastr";
import { CartService } from "../../service/cart/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-for-shop.component.html',
  styleUrls: ['./product-list-for-shop.component.css']
})
export class ProductListForShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService,
              private authService: AuthorizationService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    // Get your products here
  }

/*  onAddToCart(product: Product) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.cartService.addProductToCart(userId, product.id, 1).subscribe(() => {
        this.toastr.success('Product added to cart');
      }, error => {
        console.error('Error adding to cart:', error);
        this.toastr.error('Error adding product to cart');
      });
    } else {
      this.toastr.error('User not identified');
    }
  }*/
}
