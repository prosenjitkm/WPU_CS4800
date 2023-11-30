import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list-of-user',
  templateUrl: './product-list-of-user.component.html',
  styleUrl: './product-list-of-user.component.css'
})
export class ProductListOfUserComponent {
  productDataSource: any;
  displayedColumns: string[] = ['id', 'productName', 'productQuantity', 'productPrice', 'action'];

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      // Fetch products for this userId
      this.fetchProducts(userId);
    });
  }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const userId = +params['userId']; // Use '+' to convert string to number
            this.fetchProducts(userId);
        });
    }

    fetchProducts(userId: number) {
        this.authService.getProductsByUserId(userId).subscribe(products => {
            this.productDataSource = products;
        }, error => {
            console.error('Error fetching products:', error);
        });
    }

  onClickUpdateProduct(product: any) {

  }

  onClickDeleteProduct(product: any) {

  }

  onClickViewProductDetails(product: any) {

  }
}
