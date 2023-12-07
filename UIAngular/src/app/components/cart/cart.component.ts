// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product/product.service'; // Import ProductService
import { AuthorizationServicehService } from "../../service/auth/authorization.service"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userCart: any;
  cartItemsWithDetails: any[] = []; // Array to store cart items with product details
  totalAmount: number=0;
  constructor(
    private cartService: CartService,
    private authService: AuthorizationServicehService,
    private productService: ProductService, // Inject ProductService
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUserCart();
    this.calculateTotalAmount();
  }

  loadUserCart() {
    const userId = this.authService.getCurrentUserId(); // Update with the actual user's ID
    this.cartService.getUserCart(userId).subscribe(
      (cart: any) => {
        this.userCart = cart.length > 0 ? cart[0] : null;

        // Load product details for each cart item
        this.loadProductDetails();
      },
      error => {
        console.error('Error loading user cart:', error);
        this.toastr.error('Error loading user cart');
      }
    );
  }

  loadProductDetails() {
    if (this.userCart && this.userCart.cartItems.length > 0) {
      const productIds = this.userCart.cartItems.map((item: any) => item.productId);

      this.productService.getProductsByProductIds(productIds).subscribe(
        (products: any[]) => {
          // Merge product details with cart items
          this.cartItemsWithDetails = this.userCart.cartItems.map((item: any) => {
            const productDetail = products.find((product: any) => product.id === item.productId);
            return { ...item, productDetail };
          });
        },
        error => {
          console.error('Error loading product details:', error);
          this.toastr.error('Error loading product details');
        }
      );
    }
  }

  removeFromCart(productId: number) {
    const userId = this.authService.getCurrentUserId();
    this.cartService.removeFromCart(userId, productId).subscribe(
      () => {
        this.toastr.success('Product removed from cart');
        // Refresh the user's cart after removal
        this.loadUserCart();
      },
      error => {
        console.error('Error removing product from cart:', error);
        this.toastr.error('Error removing product from cart');
      }
    );
    this.calculateTotalAmount(); // Recalculate total after removing an item
  }

  calculateTotalAmount() {
    const userId = this.authService.getCurrentUserId();
    this.cartService.getUserCart(userId).subscribe(
      (cart: any) => {
        const productIds = this.userCart.cartItems.map((item: any) => item.productId);
        this.productService.getProductsByProductIds(productIds).subscribe(
          (products: any[]) => {
            this.totalAmount=0;
            for(let i=0;i<products.length;i++){
              this.totalAmount+=products[i].productPrice;
            }
            return this.totalAmount;
          },
          error => {
            console.error('Error loading product details:', error);
            this.toastr.error('Error loading product details');
          }
        );
      },
      error => {
        console.error('Error loading user cart:', error);
        this.toastr.error('Error loading user cart');
      }
    );
  }

  checkout() {
    // Implement your checkout logic here
    console.log('Checkout button clicked');
    // You might want to navigate to a checkout page or show a modal for the checkout process.
  }
}
