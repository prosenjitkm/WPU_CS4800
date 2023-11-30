import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list-of-user',
  templateUrl: './product-list-of-user.component.html',
  styleUrl: './product-list-of-user.component.css'
})
export class ProductListOfUserComponent {
  productDataSource: any;
  displayedColumns: string[] = ['productId', 'productName', 'productQuantity', 'productPrice', 'action'];

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      // Fetch products for this userId
      this.fetchProducts(userId);
    });
  }

  fetchProducts(userId: number) {
    this.authService.getProductsByUserId(userId).subscribe(products => {
      this.productDataSource = products;
    });
  }

  onClickUpdateProduct(product: any) {

  }

  onClickDeleteProduct(product: any) {

  }

  onClickViewProductDetails(product: any) {
    
  }
}
