/*orders.component.ts*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from "../../service/order/order.service";
import { ProductService } from "../../service/product/product.service";
import { AuthorizationService } from "../../service/auth/authorization.service";
import { Order } from "../../models/orderModel";
import { ToastrService } from "ngx-toastr";
import { Product } from "../../models/productModel";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  productDetailsMap = new Map<number, Product>();
  displayedColumns: string[] = ['id', 'orderedDate', 'deliveredDate', 'productNames', 'productQuantity', 'total'];
  dataSource = new MatTableDataSource<Order>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService,
              private authService: AuthorizationService,
              private productService: ProductService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadOrders() {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      this.orderService.getOrdersByUserId(userId).subscribe(orders => {
        this.orders = orders;
        this.updateProductDetailsInOrders();
        this.dataSource.data = this.orders;
        this.toastr.success('Orders loaded successfully');
      }, error => {
        this.toastr.error('Failed to load orders');
      });
    } else {
      this.toastr.error('User not identified, please login');
    }
  }

  loadProductDetails(productId: number) {
    if (!this.productDetailsMap.has(productId)) {
      this.productService.getProductByProductId(productId).subscribe(product => {
        this.productDetailsMap.set(productId, product);
      });
    }
  }

  updateProductDetailsInOrders() {
    this.orders.forEach(order => {
      order.orderedItems.forEach(item => {
        this.loadProductDetails(item.id);
      });
    });
  }
}
