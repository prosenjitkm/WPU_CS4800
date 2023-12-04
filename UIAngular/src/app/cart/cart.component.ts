/*cart.component.ts*/
import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/productModel';
import { CartService } from "../service/cart/cart.service"; // Adjust the path as per your project structure

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  onRemoveItem(id: number) {
    this.cartService.removeItem(id);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.productPrice, 0);
  }

  onAddToCart(product: any) {
    
  }
}
