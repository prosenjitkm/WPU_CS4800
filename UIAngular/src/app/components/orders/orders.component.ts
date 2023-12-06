/*orders.component.ts*/
import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../service/order/order.service";
import { ProductService } from "../../service/product/product.service";
import { AuthorizationService } from "../../service/auth/authorization.service";
import { Order } from "../../models/orderModel";
import { ToastrService } from "ngx-toastr";
import {Product} from "../../models/productModel";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  productDetailsMap = new Map<number, Product>(); // Map to store product details

  constructor(private orderService: OrderService,
              private authService: AuthorizationService,
              private productService: ProductService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      this.orderService.getOrdersByUserId(userId).subscribe(orders => {
        this.orders = orders;
        this.updateProductDetailsInOrders();
        this.calculateTotalCosts();
        this.toastr.success('Orders loaded successfully');
      }, error => {
        this.toastr.error('Failed to load orders');
      });
    } else {
      this.toastr.error('User not identified, please login');
    }
  }

  calculateTotalCosts() {
    this.orders.forEach(order => {
      let total = 0;
      order.orderedItems.forEach(item => {
        const product = this.productDetailsMap.get(item.productId);
        if (product) {
          total += product.productPrice * item.quantity;
        }
      });
      order.total = total; // Assuming 'total' is a property of the Order model
    });
  }

  loadProductDetails(productId: number) {
    if (!this.productDetailsMap.has(productId)) { // Check if product details are already loaded
      this.productService.getProductByProductId(productId).subscribe(product => {
        this.productDetailsMap.set(productId, product);
      });
    }
  }

  updateProductDetailsInOrders() {
    this.orders.forEach(order => {
      order.orderedItems.forEach(item => {
        this.loadProductDetails(item.productId);
      });
    });
  }
}
