/*product-list-of-all-users.component.ts*/

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../service/product/product.service";

@Component({
  selector: 'app-product-list-of-user',
  templateUrl: './product-list-of-all-users.component.html',
  styleUrl: './product-list-of-all-users.component.css'
})
export class ProductListOfAllUsersComponent {
  productDataSource: any;
  displayedColumns: string[] = ['id', 'productName', 'productQuantity', 'productPrice', 'action'];

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
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
        this.productService.getProductsByUserId(userId).subscribe(products => {
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
