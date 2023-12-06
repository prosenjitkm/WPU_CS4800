/*cart.component.ts*/
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../../service/auth/authorization.service";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/cartModel";
import { CartItem } from "../../models/cartItemModel";
import { CartService } from "../../service/cart/cart.service";
import { Product} from "../../models/productModel";
import { ProductService } from "../../service/product/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
/*export class CartComponent implements OnInit{*/
  /*cart!: Cart;
  total = 0;
  products: Product[] = [];

  constructor(
      private cartService: CartService,
      private authService: AuthorizationService,
      private productService: ProductService,
      private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.cartService.getCartByUserId(userId).subscribe(cart => {
        this.cart = cart;
        this.loadProducts();
      }, error => {
        console.error('Error loading cart:', error);
        this.toastr.error('Error loading cart');
      });
    }
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.calculateTotal();
    }, error => {
      console.error('Error loading products:', error);
      this.toastr.error('Error loading products');
    });
  }

  getProductById(productId: number): Product {
    return this.products.find(p => p.id === productId) || {} as Product;
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < 10) {
      item.quantity++;
      this.calculateTotal();
      this.updateCart();
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
      this.updateCart();
    }
  }

  private updateCart(): void {
    this.cartService.updateCart(this.cart).subscribe(() => {
      this.toastr.success('Cart updated');
    }, error => {
      console.error('Error updating cart:', error);
      this.toastr.error('Error updating cart');
    });
  }

  calculateTotal(): void {
    this.total = this.cart.cartItems.reduce((total: number, item: CartItem) => {
      const product = this.getProductById(item.productId);
      return total + (product.productPrice * item.quantity);
    }, 0);
  }*/
}
