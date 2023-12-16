// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product/product.service'; // Import ProductService
import { AuthorizationService } from "../../service/auth/authorization.service"
import {OrderService} from "../../service/order/order.service";

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
    private authService: AuthorizationService,
    private productService: ProductService, // Inject ProductService
    private toastr: ToastrService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadUserCart();
    this.calculateTotalAmount();
  }

  loadUserCart() {
    const userId= this.authService.getCurrentUserId(); // Update with the actual user's ID
    if(userId!=null)
      this.cartService.getUserCart(userId).subscribe(
      (cart: any) => {
        console.log(cart);
        console.log(cart[0]);
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
    if (this.userCart) {
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
    console.log("remove button clicked");
    const userId = this.authService.getCurrentUserId();
    if(userId!=null)
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
    if(userId!=null)
    this.cartService.getUserCart(userId).subscribe(
      (cart: any) => {
        const productQuantities=this.userCart.cartItems.map((item: any) => item.quantity);
        const productIds = this.userCart.cartItems.map((item: any) => item.productId);
        this.productService.getProductsByProductIds(productIds).subscribe(
          (products: any[]) => {
            this.totalAmount=0;
            for(let i=0;i<products.length;i++){
              console.log([products[i].productPrice,productQuantities[i]])
              this.totalAmount+=products[i].productPrice*productQuantities[i];
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
    // this.totalAmount=0;
  }

  checkout() {
    const userId = this.authService.getCurrentUserId();
    console.log('Checkout button clicked');
    console.log(this.userCart.cartItems);
    const cartItems=this.userCart.cartItems;
    const newOrder={
        userId,
        "orderedDate": "2023-11-01T00:00:00Z",
        "deliveredDate": "2023-11-01T00:00:00Z",
        "total": 100,
        "orderedItems": [
          {
            "id": 1,
            "productQuantity": 2
          },
          {
            "id": 3,
            "productQuantity": 1
          }
        ]
      }
    if(userId!=null)
      this.orderService.addOrder(userId, newOrder)
    for(let i=0;i<cartItems.length;i++){
      this.removeFromCart(cartItems[i].productId);
    }
    this.calculateTotalAmount();
  }
}
