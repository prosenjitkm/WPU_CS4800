/*product-list.component.ts*/
import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/productModel';
import { CartService } from "../service/cart/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Get your products here
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
